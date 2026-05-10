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

// ========= URL DE APPS SCRIPT =========
// Asegúrate de que esta URL sea la de la implementación (deployment)
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycby2RRoC12xII2ctxqMlpy4KnGP_sRZ6pUeoKMZ3IZEGuXECNvh3qWTQOAPHvV-bhkRCVw/exec';

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy para una sola acción
app.post('/api/proxy', async (req, res) => {
  const { action, data } = req.body;
  
  console.log(`[Proxy] Recibida solicitud - Action: ${action}`);
  console.log(`[Proxy] Data:`, JSON.stringify(data));
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, data })
    });
    
    // Verificar si la respuesta es válida
    const contentType = response.headers.get('content-type');
    console.log(`[Proxy] Status: ${response.status}, Content-Type: ${contentType}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`[Proxy] Error GAS (${response.status}):`, text.substring(0, 200));
      return res.status(response.status).json({ 
        success: false, 
        error: `Error del servidor de Google (${response.status})` 
      });
    }
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('[Proxy] Respuesta no JSON:', text.substring(0, 200));
      return res.status(500).json({ 
        success: false, 
        error: 'El servidor de Google no devolvió JSON. Verifica que el Apps Script esté desplegado como aplicación web.' 
      });
    }
    
    const result = await response.json();
    console.log(`[Proxy] Respuesta GAS:`, JSON.stringify(result));
    res.json(result);
    
  } catch (error) {
    console.error('[Proxy] Error al llamar a la API de GAS:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Proxy para múltiples acciones
app.post('/api/proxy-multiple', async (req, res) => {
  const { acciones } = req.body;
  
  console.log(`[Proxy-Multiple] Recibidas ${acciones.length} acciones`);
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: 'multiple', acciones })
    });
    
    const contentType = response.headers.get('content-type');
    console.log(`[Proxy-Multiple] Status: ${response.status}, Content-Type: ${contentType}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`[Proxy-Multiple] Error GAS (${response.status}):`, text.substring(0, 200));
      return res.status(response.status).json({ 
        success: false, 
        error: `Error del servidor de Google (${response.status})` 
      });
    }
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('[Proxy-Multiple] Respuesta no JSON:', text.substring(0, 200));
      return res.status(500).json({ 
        success: false, 
        error: 'El servidor de Google no devolvió JSON.' 
      });
    }
    
    const result = await response.json();
    console.log(`[Proxy-Multiple] Respuesta GAS:`, JSON.stringify(result));
    res.json(result);
    
  } catch (error) {
    console.error('[Proxy-Multiple] Error al llamar a la API de GAS:', error);
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
