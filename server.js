import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// ========= CACHÉ EN MEMORIA =========
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ========= COMPRESIÓN MANUAL SIMPLE =========
function compressText(text) {
  // Eliminar espacios múltiples y comentarios para archivos de texto
  if (typeof text === 'string') {
    return text.replace(/\s+/g, ' ').trim();
  }
  return text;
}

// ========= MIDDLEWARE OPTIMIZADO =========
app.use(express.json({ limit: '10mb' }));

// Servir archivos estáticos con cabeceras de caché agresivas
app.use(express.static('public', {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    // HTML y JS no cachear agresivamente
    if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// ========= URL DE APPS SCRIPT =========
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyBOQVgVtaP3toykgQpZUurDtI1-48g897CGzSc5wuGAXeCFTlR_y7ojvrrmlA0pZYMQw/exec';

// ========= TIMEOUT PARA FETCH =========
const fetchWithTimeout = async (url, options, timeout = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

// Ruta principal con HTML minificado
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy para una sola acción (optimizado)
app.post('/api/proxy', async (req, res) => {
  const { action, data } = req.body;
  
  // Datos de solo lectura pueden cachearse
  const cacheableActions = ['obtenerPreguntas', 'obtenerEPS'];
  
  if (cacheableActions.includes(action)) {
    const cacheKey = `${action}_${JSON.stringify(data || {})}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
  }
  
  try {
    const response = await fetchWithTimeout(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data })
    });
    
    const result = await response.json();
    
    // Cachear resultados de solo lectura
    if (cacheableActions.includes(action) && result.success) {
      const cacheKey = `${action}_${JSON.stringify(data || {})}`;
      setCache(cacheKey, result);
    }
    
    res.json(result);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Timeout en la llamada a GAS');
      res.status(504).json({ success: false, error: 'Tiempo de espera agotado' });
    } else {
      console.error('Error al llamar a la API de GAS:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

// Proxy para múltiples acciones (optimizado con caché)
app.post('/api/proxy-multiple', async (req, res) => {
  const { acciones } = req.body;
  
  // Verificar si todas las acciones son cacheables
  const allCacheable = acciones.every(a => 
    ['obtenerPreguntas', 'obtenerEPS', 'cedulaExiste', 'encuestaYaExiste', 
     'verificarConsentimientoFirmado', 'obtenerDatosConsentimiento', 'obtenerDatosPaciente'].includes(a.action)
  );
  
  if (allCacheable) {
    const cacheKey = `multiple_${JSON.stringify(acciones)}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
  }
  
  try {
    const response = await fetchWithTimeout(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'multiple', acciones })
    });
    
    const result = await response.json();
    
    if (allCacheable && result.success) {
      const cacheKey = `multiple_${JSON.stringify(acciones)}`;
      setCache(cacheKey, result);
    }
    
    res.json(result);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      res.status(504).json({ success: false, error: 'Tiempo de espera agotado' });
    } else {
      console.error('Error al llamar a la API de GAS:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

// Health check rápido
app.get('/api/health', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.json({ status: 'OK', timestamp: Date.now() });
});

// Limpieza periódica de caché
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }
}, 60000); // Cada minuto

app.listen(port, () => {
  console.log(`✅ Servidor rápido corriendo en http://localhost:${port}`);
});
