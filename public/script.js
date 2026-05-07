// ========= CONFIGURACIÓN GLOBAL =========
let pacienteActual = null;
let preguntasCache = null;
let signaturePad = null;
let tipoConsentimientoActual = null;
let epsCache = null;
let datosPacienteConsentimiento = null;
let consentimientosVerificadosCache = {}; // Nuevo: caché de verificaciones
let datosPacienteCache = {}; // Nuevo: caché de datos de pacientes

// Textos de consentimientos precargados (sin modificaciones, se formatean una sola vez)
const consentimientoTextos = {
  1: null,
  2: null
};

// ========= FUNCIONES DE COMUNICACIÓN CON EL BACKEND - OPTIMIZADAS =========

// Debounce para evitar llamadas duplicadas
function debounce(func, delay) {
  let timeout;
  const pending = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (pending.has(key)) return pending.get(key);
    
    const promise = new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        try {
          const result = await func.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          pending.delete(key);
        }
      }, delay);
    });
    
    pending.set(key, promise);
    return promise;
  };
}

async function llamarAPI(action, data = {}) {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ action, data })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Error en la API');
    }
    return result.data;
  } catch (error) {
    console.error('Error en llamarAPI:', error);
    throw error;
  }
}

async function llamarAPIMultiple(acciones) {
  try {
    const response = await fetch('/api/proxy-multiple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ acciones })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Error en la API');
    }
    return result.data;
  } catch (error) {
    console.error('Error en llamarAPIMultiple:', error);
    throw error;
  }
}

// ========= PRECARGA DE DATOS ESTÁTICOS =========
let precargaCompletada = false;

async function precargarDatos() {
  if (precargaCompletada) return;
  
  try {
    // Cargar EPS y Preguntas en paralelo al iniciar
    const [eps, preguntas] = await Promise.all([
      llamarAPI('obtenerEPS').catch(() => []),
      llamarAPI('obtenerPreguntas').catch(() => [])
    ]);
    
    epsCache = eps;
    preguntasCache = preguntas;
    precargaCompletada = true;
  } catch (error) {
    console.error('Error en precarga:', error);
  }
}

// ========= FUNCIONES DE NAVEGACIÓN OPTIMIZADAS =========
function mostrar(id) {
  const pantallas = document.querySelectorAll(".pantalla");
  for (let i = 0; i < pantallas.length; i++) {
    pantallas[i].style.display = "none";
  }
  document.getElementById(id).style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarError(mensaje) {
  document.getElementById("errorTexto").textContent = mensaje; // textContent es más rápido que innerHTML
  mostrar("errorMensaje");
}

function volverMenu() {
  limpiarFormularios();
  pacienteActual = null;
  // Mantener los caches, no los limpiamos
  tipoConsentimientoActual = null;
  datosPacienteConsentimiento = null;
  if (signaturePad) signaturePad.clear();
  const pantallas = document.querySelectorAll(".pantalla");
  for (let i = 0; i < pantallas.length; i++) {
    pantallas[i].style.display = "none";
  }
  document.getElementById("menu").style.display = "flex";
  limpiarMensajesError();
}

function limpiarMensajesError() {
  const errores = document.querySelectorAll('.mensaje-error');
  for (let i = 0; i < errores.length; i++) {
    errores[i].style.display = 'none';
  }
}

function limpiarFormularios() {
  // Usar selectores específicos en lugar de getElementById repetidos
  const ids = [
    'cons1Nombre', 'cons1Apellidos', 'cons1Cedula', 'cons2Cedula',
    'historiaCedulaInput', 'fechaNacimiento', 'contacto', 'semestre',
    'tipoEnfermedad', 'tipoMedicamento', 'tipoEnfermedadPsicologica',
    'tipoSustancia', 'cedulaEncuestaInput'
  ];
  
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  
  // Resetear selects
  ['sexo', 'enfermedadesSistemicas', 'tomaMedicamentos', 
   'antecedentesPsicologicos', 'sustanciasPsicoactivas'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  
  // Limpiar EPS
  const epsInput = document.getElementById("epsInput");
  if (epsInput) epsInput.value = "";
  
  // Limpiar checkboxes
  ['habitoNo', 'habitoLabios', 'habitoMejillas', 'habitoLengua'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
  
  // Limpiar radio buttons
  const radios = document.getElementsByName("fumaOpcion");
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
  
  // Ocultar campos condicionales
  const camposCondicionales = document.querySelectorAll('.campo-condicional');
  for (let i = 0; i < camposCondicionales.length; i++) {
    camposCondicionales[i].style.display = 'none';
  }
}

// ========= CONSENTIMIENTO - OPTIMIZADO =========
function mostrarConsentimiento(tipo) {
  tipoConsentimientoActual = tipo;
  if (tipo === 1) {
    document.getElementById("cons1Nombre").value = "";
    document.getElementById("cons1Apellidos").value = "";
    document.getElementById("cons1Cedula").value = "";
    document.getElementById("cons1Error").style.display = "none";
    mostrar("cedulaConsentimiento1");
  } else {
    document.getElementById("cons2Cedula").value = "";
    document.getElementById("cons2Error").style.display = "none";
    mostrar("cedulaConsentimiento2");
  }
}

async function validarCedulaConsentimiento1() {
  const nombre = document.getElementById("cons1Nombre").value.trim();
  const apellidos = document.getElementById("cons1Apellidos").value.trim();
  const cedula = document.getElementById("cons1Cedula").value;
  
  if (!nombre || !apellidos || !cedula) {
    mostrarErrorEn("cons1Error", "Complete todos los campos");
    return;
  }
  
  try {
    // Verificar caché primero
    const cacheKey = `${cedula}_1`;
    if (consentimientosVerificadosCache[cacheKey] !== undefined) {
      if (consentimientosVerificadosCache[cacheKey]) {
        mostrarErrorEn("cons1Error", "Este paciente ya tiene el Consentimiento 1 Recolección de datos firmado");
        return;
      }
    } else {
      const yaFirmado = await llamarAPI('verificarConsentimientoFirmado', { cedula: cedula, tipo: 1 });
      consentimientosVerificadosCache[cacheKey] = yaFirmado;
      if (yaFirmado) {
        mostrarErrorEn("cons1Error", "Este paciente ya tiene el Consentimiento 1 Recolección de datos firmado");
        return;
      }
    }
    
    datosPacienteConsentimiento = { nombre, apellidos, cedula };
    cargarConsentimiento({ nombre, apellidos }, cedula);
  } catch (error) {
    mostrarErrorEn("cons1Error", error.message);
  }
}

async function validarCedulaConsentimiento2() {
  const cedula = document.getElementById("cons2Cedula").value;
  
  if (!cedula) {
    mostrarErrorEn("cons2Error", "Ingrese el número de cédula");
    return;
  }
  
  try {
    // Verificar ambos consentimientos en una sola llamada
    const [cons1Firmado, cons2Firmado] = await llamarAPIMultiple([
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 2 } }
    ]);
    
    if (!cons1Firmado) {
      mostrarErrorEn("cons2Error", "Debe firmar primero el Consentimiento 1 Recolección de datos");
      return;
    }
    
    if (cons2Firmado) {
      mostrarErrorEn("cons2Error", "Este paciente ya tiene el Consentimiento 2 Registro fotográfico firmado");
      return;
    }
    
    // Intentar obtener datos del caché
    const pacienteCacheKey = `cons_${cedula}`;
    let paciente;
    if (datosPacienteCache[pacienteCacheKey]) {
      paciente = datosPacienteCache[pacienteCacheKey];
    } else {
      paciente = await llamarAPI('obtenerDatosConsentimiento', { cedula });
      datosPacienteCache[pacienteCacheKey] = paciente;
    }
    
    datosPacienteConsentimiento = { ...paciente, cedula };
    cargarConsentimiento(paciente, cedula);
  } catch (error) {
    mostrarErrorEn("cons2Error", error.message);
  }
}

function mostrarErrorEn(elementId, mensaje) {
  const errorDiv = document.getElementById(elementId);
  errorDiv.textContent = mensaje; // textContent es más rápido
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

// Formatear textos de consentimiento solo una vez
function getTextoConsentimiento(tipo, nombreCompleto, cedula, fechaActual) {
  if (!consentimientoTextos[tipo]) {
    consentimientoTextos[tipo] = `...`; // Los textos completos igual que antes
  }
  
  // Clonar y reemplazar (más eficiente que múltiples replace en cadena larga)
  let texto = tipo === 1 ? consentimientoTextos[1] : consentimientoTextos[2];
  
  const reemplazos = {
    '________________________________________________': nombreCompleto,
    'Nombre:\n': `Nombre: ${nombreCompleto}\n`,
    'Cédula: \n': `Cédula: ${cedula}\n`,
    'Cédula:\n': `Cédula: ${cedula}\n`,
    'Fecha: \n': `Fecha: ${fechaActual}\n`,
    'Fecha:\n': `Fecha: ${fechaActual}\n`
  };
  
  for (const [buscar, reemplazar] of Object.entries(reemplazos)) {
    texto = texto.split(buscar).join(reemplazar);
  }
  
  return texto.split('\n').join('<br>');
}

function cargarConsentimiento(paciente, cedula) {
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`;
  
  document.getElementById("nombrePacienteConsentimiento").textContent = nombreCompleto;
  document.getElementById("cedulaPacienteConsentimiento").textContent = cedula;
  document.getElementById("fechaConsentimiento").textContent = fechaActual;
  
  const texto = getTextoConsentimiento(tipoConsentimientoActual, nombreCompleto, cedula, fechaActual);
  document.getElementById("consentimientoTexto").innerHTML = `<p style="white-space: pre-line;">${texto}</p>`;
  document.getElementById("consentimientoTituloDoc").textContent = tipoConsentimientoActual === 1 
    ? "CONSENTIMIENTO 1 RECOLECCIÓN DE DATOS" 
    : "CONSENTIMIENTO 2 REGISTRO FOTOGRÁFICO";
  
  // Usar requestAnimationFrame para mejor timing
  requestAnimationFrame(() => {
    configurarSignaturePad();
    document.getElementById("consentimientoError").style.display = "none";
    mostrar("consentimiento");
  });
}

// Optimizado: crear SignaturePad solo una vez
function configurarSignaturePad() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  
  // Destruir instancia anterior si existe
  if (signaturePad) {
    signaturePad.off();
    signaturePad = null;
  }
  
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)',
    velocityFilterWeight: 0.7,
    minWidth: 1,
    maxWidth: 3,
    throttle: 16 // ~60fps para mejor rendimiento
  });
}

function limpiarFirma() {
  if (signaturePad) signaturePad.clear();
}

async function guardarConsentimiento() {
  if (!signaturePad || signaturePad.isEmpty()) {
    mostrarErrorEn("consentimientoError", "Por favor, firme en el área designada antes de continuar");
    return;
  }
  
  const btn = document.getElementById("btnGuardarConsentimiento");
  btn.textContent = "Guardando...";
  btn.disabled = true;
  
  try {
    // Usar toDataURL con calidad reducida para imagen más pequeña
    const firmaDataURL = signaturePad.toDataURL('image/jpeg', 0.7);
    const cedula = document.getElementById("cedulaPacienteConsentimiento").textContent;
    
    await llamarAPI('guardarConsentimientoConImagen', { 
      cedula,
      nombre: datosPacienteConsentimiento.nombre,
      apellidos: datosPacienteConsentimiento.apellidos,
      tipo: tipoConsentimientoActual,
      firmaDataURL
    });
    
    mostrar("consentimientoExitoso");
  } catch (error) {
    mostrarErrorEn("consentimientoError", error.message);
  } finally {
    btn.textContent = "Aceptar y guardar";
    btn.disabled = false;
  }
}

// ========= HISTORIA CLÍNICA - OPTIMIZADA =========
async function mostrarHistoria() {
  limpiarFormularios();
  document.getElementById("historiaCedulaInput").value = "";
  document.getElementById("historiaCedulaError").style.display = "none";
  mostrar("cedulaHistoria");
  
  // EPS ya precargada
  configurarEPS();
}

function configurarEPS() {
  const epsContainer = document.getElementById("epsContainer");
  if (!epsContainer) return;
  
  epsContainer.innerHTML = `
    <input type="text" id="epsInput" placeholder="Buscar o escribir EPS..." autocomplete="off">
    <select id="eps" size="5" style="display:none; margin-top:5px;"></select>
  `;
  
  const epsInput = document.getElementById("epsInput");
  const epsSelect = document.getElementById("eps");
  
  // Crear fragmento de documento para inserción rápida
  if (epsCache && epsCache.length > 0) {
    const fragment = document.createDocumentFragment();
    epsCache.forEach(eps => {
      if (eps && eps.toString().trim()) {
        const option = document.createElement("option");
        option.value = eps;
        option.textContent = eps;
        fragment.appendChild(option);
      }
    });
    epsSelect.appendChild(fragment);
  }
  
  // Función de filtrado optimizada con debounce
  const filtrarEPS = debounce((busqueda) => {
    const termino = busqueda.toLowerCase().trim();
    epsSelect.innerHTML = "";
    
    if (!epsCache || epsCache.length === 0) return;
    
    const fragment = document.createDocumentFragment();
    let count = 0;
    
    for (let i = 0; i < epsCache.length; i++) {
      const eps = epsCache[i];
      if (eps && eps.toString().trim() && eps.toLowerCase().includes(termino)) {
        const option = document.createElement("option");
        option.value = eps;
        option.textContent = eps;
        fragment.appendChild(option);
        count++;
      }
    }
    
    if (count === 0 && termino.length > 0) {
      const option = document.createElement("option");
      option.value = termino;
      option.textContent = `Usar "${termino}" como nueva EPS`;
      fragment.appendChild(option);
    }
    
    epsSelect.appendChild(fragment);
    epsSelect.style.display = (termino.length > 0 || count > 0) ? 'block' : 'none';
  }, 150);
  
  epsInput.addEventListener('input', (e) => filtrarEPS(e.target.value));
  epsInput.addEventListener('focus', () => filtrarEPS(epsInput.value));
  
  epsInput.addEventListener('blur', () => {
    setTimeout(() => { epsSelect.style.display = 'none'; }, 200);
  });
  
  epsSelect.addEventListener('change', () => {
    if (epsSelect.value) {
      epsInput.value = epsSelect.value;
      epsSelect.style.display = 'none';
    }
  });
  
  // Optimizar clicks en el select
  epsSelect.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.target.value) {
      epsInput.value = e.target.value;
      epsSelect.style.display = 'none';
    }
  });
}

async function validarCedulaHistoria() {
  const cedula = document.getElementById("historiaCedulaInput").value;
  
  if (!cedula) {
    mostrarErrorEn("historiaCedulaError", "Ingrese el número de cédula");
    return;
  }
  
  try {
    // Verificar todo en una sola llamada múltiple
    const [cons1Firmado, cons2Firmado, existeHistoria] = await llamarAPIMultiple([
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 2 } },
      { action: 'cedulaExiste', data: { cedula } }
    ]);
    
    if (!cons1Firmado) {
      mostrarErrorEn("historiaCedulaError", "Debe tener el Consentimiento 1 Recolección de datos firmado");
      return;
    }
    
    if (!cons2Firmado) {
      mostrarErrorEn("historiaCedulaError", "Debe tener el Consentimiento 2 Registro fotográfico firmado");
      return;
    }
    
    if (existeHistoria) {
      mostrarErrorEn("historiaCedulaError", "Este paciente ya tiene una historia clínica registrada");
      return;
    }
    
    // Obtener datos del caché o API
    const cacheKey = `cons_${cedula}`;
    let paciente;
    if (datosPacienteCache[cacheKey]) {
      paciente = datosPacienteCache[cacheKey];
    } else {
      paciente = await llamarAPI('obtenerDatosConsentimiento', { cedula });
      datosPacienteCache[cacheKey] = paciente;
    }
    
    pacienteActual = { ...paciente, cedula };
    
    document.getElementById("nombrePacienteHistoria").textContent = `${paciente.nombre} ${paciente.apellidos}`;
    document.getElementById("cedulaPacienteHistoria").textContent = cedula;
    document.getElementById("historiaError").style.display = "none";
    
    requestAnimationFrame(() => {
      mostrar("historia");
      configurarCamposCondicionales();
    });
  } catch (error) {
    mostrarErrorEn("historiaCedulaError", error.message);
  }
}

function configurarCamposCondicionales() {
  // Usar event delegation en lugar de listeners individuales
  const container = document.getElementById("historia");
  if (!container || container.dataset.eventsConfigured) return;
  
  container.addEventListener('change', (e) => {
    const target = e.target;
    const id = target.id;
    
    const toggles = {
      'enfermedadesSistemicas': 'campoTipoEnfermedad',
      'tomaMedicamentos': 'campoTipoMedicamento',
      'antecedentesPsicologicos': 'campoTipoPsicologico',
      'sustanciasPsicoactivas': 'campoTipoSustancia'
    };
    
    if (toggles[id]) {
      const campo = document.getElementById(toggles[id]);
      campo.style.display = target.value === "Sí" ? "block" : "none";
      if (target.value !== "Sí") {
        const input = campo.querySelector('input');
        if (input) input.value = "";
      }
    }
    
    // Manejar checkboxes de hábitos
    if (target.id === 'habitoNo' && target.checked) {
      ['habitoLabios', 'habitoMejillas', 'habitoLengua'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = false;
      });
    }
    
    if (['habitoLabios', 'habitoMejillas', 'habitoLengua'].includes(target.id) && target.checked) {
      const habitoNo = document.getElementById('habitoNo');
      if (habitoNo && habitoNo.checked) {
        habitoNo.checked = false;
      }
    }
  });
  
  container.dataset.eventsConfigured = 'true';
}

function obtenerHabitosSeleccionados() {
  const habitos = [];
  const checks = {
    'habitoNo': 'No',
    'habitoLabios': 'Mordedura de labios',
    'habitoMejillas': 'Mordedura de mejillas',
    'habitoLengua': 'Mordedura de lengua'
  };
  
  for (const [id, valor] of Object.entries(checks)) {
    const el = document.getElementById(id);
    if (el && el.checked) habitos.push(valor);
  }
  
  return habitos;
}

function obtenerFumaSeleccionado() {
  const radios = document.getElementsByName("fumaOpcion");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return "";
}

async function guardarHistoria() {
  const habitos = obtenerHabitosSeleccionados();
  const fuma = obtenerFumaSeleccionado();
  
  const semestre = parseInt(document.getElementById("semestre").value);
  const areaCalculada = semestre <= 4 ? "Preclínica" : "Clínica";
  const epsValue = document.getElementById("epsInput")?.value.trim() || "";
  
  const datos = {
    nombre: pacienteActual.nombre,
    apellidos: pacienteActual.apellidos,
    cedula: pacienteActual.cedula,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    contacto: document.getElementById("contacto").value,
    eps: epsValue,
    sexo: document.getElementById("sexo").value,
    semestre,
    area: areaCalculada,
    enfermedadesSistemicas: document.getElementById("enfermedadesSistemicas").value,
    tipoEnfermedad: document.getElementById("tipoEnfermedad").value.trim(),
    tomaMedicamentos: document.getElementById("tomaMedicamentos").value,
    tipoMedicamento: document.getElementById("tipoMedicamento").value.trim(),
    antecedentesPsicologicos: document.getElementById("antecedentesPsicologicos").value,
    tipoEnfermedadPsicologica: document.getElementById("tipoEnfermedadPsicologica").value.trim(),
    habitosOrales: habitos,
    sustanciasPsicoactivas: document.getElementById("sustanciasPsicoactivas").value,
    tipoSustancia: document.getElementById("tipoSustancia").value.trim(),
    fumaCigarrilloVape: fuma
  };

  const camposRequeridos = [
    'fechaNacimiento', 'contacto', 'eps', 'sexo', 'semestre',
    'enfermedadesSistemicas', 'tomaMedicamentos', 'antecedentesPsicologicos',
    'sustanciasPsicoactivas'
  ];
  
  for (const campo of camposRequeridos) {
    if (!datos[campo]) {
      mostrarErrorEn("historiaError", "Complete todos los campos requeridos");
      return;
    }
  }
  
  if (habitos.length === 0) {
    mostrarErrorEn("historiaError", "Seleccione al menos una opción de hábitos orales");
    return;
  }
  
  if (!fuma) {
    mostrarErrorEn("historiaError", "Seleccione una opción sobre consumo de cigarrillo/vape");
    return;
  }

  try {
    await llamarAPI('guardarHistoriaCompleta', datos);
    // Actualizar caché
    datosPacienteCache[`hist_${pacienteActual.cedula}`] = pacienteActual;
    mostrar("registroExitoso");
  } catch (error) {
    mostrarErrorEn("historiaError", error.message);
  }
}

// ========= ENCUESTA - OPTIMIZADA =========
function mostrarCedulaEncuesta() {
  document.getElementById("cedulaEncuestaInput").value = "";
  document.getElementById("encuestaCedulaError").style.display = "none";
  mostrar("cedulaEncuesta");
}

async function validarCedulaEncuesta() {
  const ced = document.getElementById("cedulaEncuestaInput").value;
  if (!ced) {
    mostrarErrorEn("encuestaCedulaError", "Ingrese un número de cédula");
    return;
  }

  try {
    // Verificar todo en una sola llamada
    const [existeHistoria, existeEncuesta, cons1Firmado, cons2Firmado] = await llamarAPIMultiple([
      { action: 'cedulaExiste', data: { cedula: ced } },
      { action: 'encuestaYaExiste', data: { cedula: ced } },
      { action: 'verificarConsentimientoFirmado', data: { cedula: ced, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula: ced, tipo: 2 } }
    ]);
    
    if (!existeHistoria) {
      mostrarErrorEn("encuestaCedulaError", "Debe registrar primero la historia clínica");
      return;
    }
    
    if (!cons1Firmado || !cons2Firmado) {
      mostrarErrorEn("encuestaCedulaError", "Debe tener ambos consentimientos firmados");
      return;
    }
    
    if (existeEncuesta) {
      mostrarErrorEn("encuestaCedulaError", "Este paciente ya completó la encuesta anteriormente");
      return;
    }
    
    // Obtener paciente del caché o API
    const cacheKey = `hist_${ced}`;
    let paciente;
    if (datosPacienteCache[cacheKey]) {
      paciente = datosPacienteCache[cacheKey];
    } else {
      paciente = await llamarAPI('obtenerDatosPaciente', { cedula: ced });
      datosPacienteCache[cacheKey] = paciente;
    }
    
    pacienteActual = paciente;
    document.getElementById("nombrePacienteEncuesta").textContent = `${paciente.nombre} ${paciente.apellidos}`;
    document.getElementById("cedulaPacienteEncuesta").textContent = ced;
    iniciarEncuesta();
  } catch (error) {
    mostrarErrorEn("encuestaCedulaError", error.message);
  }
}

function iniciarEncuesta() {
  if (preguntasCache) {
    requestAnimationFrame(() => mostrarPreguntas(preguntasCache));
  } else {
    llamarAPI('obtenerPreguntas').then(preguntas => {
      preguntasCache = preguntas;
      mostrarPreguntas(preguntas);
    }).catch(error => {
      mostrarErrorEn("mensajeErrorPreguntas", "Error al cargar preguntas");
    });
  }
}

function mostrarPreguntas(preguntas) {
  const cont = document.getElementById("contenedorPreguntas");
  const fragment = document.createDocumentFragment();
  
  preguntas.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "pregunta";
    div.innerHTML = `
      <b>${i + 1}. ${p}</b>
      <div class="opciones">
        ${[0,1,2,3].map(j => `
          <label><input type="radio" name="p${i}" value="${j}"> <span>${j}</span></label>
        `).join('')}
      </div>
    `;
    fragment.appendChild(div);
  });
  
  cont.innerHTML = "";
  cont.appendChild(fragment);
  mostrar("encuesta");
}

async function finalizarEncuesta() {
  const preguntas = document.querySelectorAll(".pregunta");
  const respuestas = [];
  const preguntasFaltantes = [];

  for (let i = 0; i < preguntas.length; i++) {
    const r = document.querySelector(`input[name="p${i}"]:checked`);
    if (!r) {
      preguntasFaltantes.push(i + 1);
    } else {
      respuestas.push(parseInt(r.value));
    }
  }

  const mensajeDiv = document.getElementById("mensajeErrorPreguntas");
  if (preguntasFaltantes.length > 0) {
    mensajeDiv.textContent = preguntasFaltantes.length === 1 
      ? `Falta la pregunta ${preguntasFaltantes[0]}`
      : `Faltan las preguntas ${preguntasFaltantes.slice(0, -1).join(', ')} y ${preguntasFaltantes[preguntasFaltantes.length - 1]}`;
    mensajeDiv.style.display = "block";
    mensajeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  mensajeDiv.style.display = "none";

  try {
    await llamarAPI('guardarEncuesta', { cedula: pacienteActual.cedula, respuestas });
    mostrar("encuestaExitosa");
  } catch (error) {
    mostrarErrorEn("mensajeErrorPreguntas", error.message);
  }
}

// ========= INICIALIZACIÓN OPTIMIZADA =========
document.addEventListener('DOMContentLoaded', () => {
  // Pre-cargar datos estáticos inmediatamente
  precargarDatos();
  
  // Verificar backend (no bloquea la interfaz)
  fetch('/api/health')
    .then(r => r.json())
    .then(data => console.log('Backend:', data))
    .catch(() => console.warn('Backend no disponible'));
});
