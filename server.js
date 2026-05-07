import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '5mb' })); // Reducir límite
app.use(express.static('public', {
  maxAge: '1h', // Caché de archivos estáticos
  etag: true,
  lastModified: true
}));

// ========= URL DE APPS SCRIPT =========
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyBOQVgVtaP3toykgQpZUurDtI1-48g897CGzSc5wuGAXeCFTlR_y7ojvrrmlA0pZYMQw/exec';

// Pool de conexiones reutilizable
const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json',
    'Connection': 'keep-alive'
  },
  timeout: 8000
};

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy para una sola acción
app.post('/api/proxy', async (req, res) => {
  const { action, data } = req.body;
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify({ action, data })
    });
    
    const result = await response.json();
    res.json(result);
    
  } catch (error) {
    console.error('Error GAS:', error.message);
    res.status(500).json({ success: false, error: 'Error de conexión' });
  }
});

// Proxy para múltiples acciones
app.post('/api/proxy-multiple', async (req, res) => {
  const { acciones } = req.body;
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify({ type: 'multiple', acciones })
    });
    
    const result = await response.json();
    res.json(result);
    
  } catch (error) {
    console.error('Error GAS:', error.message);
    res.status(500).json({ success: false, error: 'Error de conexión' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
