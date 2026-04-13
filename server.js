import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// ========= TU URL DE APPS SCRIPT =========
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbycWLIA-2OuopBHEpT-98rG8WS0jr2xAwGj3CPsZ6kI312AvM6E82uY9N7qo4jJeetg5Q/exec';

// Ruta principal - SIRVE EL HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy para una sola acción
app.post('/api/proxy', async (req, res) => {
  const { action, data } = req.body;
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data })
    });
    
    const result = await response.json();
    res.json(result);
    
  } catch (error) {
    console.error('Error al llamar a la API de GAS:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Proxy para múltiples acciones (optimizado)
app.post('/api/proxy-multiple', async (req, res) => {
  const { acciones } = req.body;
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'multiple', acciones })
    });
    
    const result = await response.json();
    res.json(result);
    
  } catch (error) {
    console.error('Error al llamar a la API de GAS:', error);
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