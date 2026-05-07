import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware de compresión - Reduce el tamaño de las respuestas
app.use(compression());

// Middleware
app.use(express.json({ limit: '1mb' })); // Reducimos límite, solo necesitamos 1mb
app.use(express.static('public', {
  maxAge: '1y', // Cachear archivos estáticos por 1 año
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// ========= URL DE APPS SCRIPT =========
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbycWLIA-2OuopBHEpT-98rG8WS0jr2xAwGj3CPsZ6kI312AvM6E82uY9N7qo4jJeetg5Q/exec';

// Pool de conexiones reutilizables
const httpsAgent = new (await import('https')).Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 10,
  maxFreeSockets: 5,
  timeout: 20000
});

// Ruta principal
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy para una sola acción - Optimizado
app.post('/api/proxy', async (req, res) => {
  const { action, data } = req.body;
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000); // 25 segundos timeout
    
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      },
      body: JSON.stringify({ action, data }),
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
    const result = await response.json();
    res.json(result);
    
  } catch (error) {
    console.error('Error al llamar a la API de GAS:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Proxy para múltiples acciones - Optimizado para ejecutar en paralelo cuando sea posible
app.post('/api/proxy-multiple', async (req, res) => {
  const { acciones } = req.body;
  
  try {
    // Si todas las acciones son independientes (lectura), ejecutarlas en paralelo
    const todasLectura = acciones.every(a => 
      ['obtenerPreguntas', 'obtenerEPS', 'cedulaExiste', 'encuestaYaExiste', 
       'verificarConsentimientoFirmado', 'obtenerDatosConsentimiento', 
       'obtenerDatosPaciente'].includes(a.action)
    );
    
    if (todasLectura && acciones.length > 1) {
      // Ejecutar en paralelo - mucho más rápido
      const promesas = acciones.map(accion => 
        fetch(GAS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: accion.action, data: accion.data })
        }).then(r => r.json()).then(r => r.success ? r.data : null)
         .catch(() => null)
      );
      
      const resultados = await Promise.all(promesas);
      res.json({ success: true, data: resultados });
    } else {
      // Ejecutar secuencialmente si hay escrituras
      const response = await fetch(GAS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'multiple', acciones })
      });
      
      const result = await response.json();
      res.json(result);
    }
    
  } catch (error) {
    console.error('Error al llamar a la API de GAS:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`API de GAS configurada en: ${GAS_API_URL}`);
});
