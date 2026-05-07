// ========= CONFIGURACIÓN GLOBAL =========
let pacienteActual = null;
let preguntasCache = null;
let signaturePad = null;
let tipoConsentimientoActual = null;
let epsCache = null;
let datosPacienteConsentimiento = null;

// Cache en memoria para el frontend
const frontendCache = new Map();
const FRONTEND_CACHE_TTL = 30000; // 30 segundos

function getFrontendCached(key) {
  const item = frontendCache.get(key);
  if (!item || Date.now() - item.timestamp > FRONTEND_CACHE_TTL) {
    frontendCache.delete(key);
    return null;
  }
  return item.data;
}

function setFrontendCache(key, data) {
  frontendCache.set(key, { data, timestamp: Date.now() });
}

// Textos de consentimientos
const consentimientoTextos = {
  1: `CONSENTIMIENTO INFORMADO PARA LA PARTICIPACIÓN EN UN ESTUDIO DE INVESTIGACIÓN TRABAJO DE GRADO

Título del proyecto: Relación entre factores emocionales y hábitos parafuncionales en estudiantes de odontología de la Universidad Antonio Nariño, Sede Neiva.

Ciudad: Neiva – Huila

En el marco del desarrollo del presente proyecto de investigación, se le invita a participar de manera voluntaria en este estudio, cuyo propósito es analizar la relación entre los factores emocionales (estrés, ansiedad y depresión) y los hábitos parafuncionales orales en estudiantes de odontología de la Universidad Antonio Nariño, sede Neiva, durante el periodo académico 2026-1 y 2026-2.

Yo, ________________________________________________, identificado(a) con el número de cédula que aparece al pie de mi firma, actuando en nombre propio, manifiesto que he sido informado(a) de manera clara, suficiente y comprensible, y que acepto participar de manera libre y voluntaria en el estudio de investigación anteriormente mencionado, desarrollado por los estudiantes investigadores Diana Carolina Cortés, Luisa María Sandoval y Christopher Vargas, bajo la asesoría científica de la Dra. Alejandra Bobadilla Henao.

1. INFORMACIÓN DEL ESTUDIO
He sido informado(a) de manera clara y suficiente sobre el objetivo del estudio, el cual busca analizar la relación entre los hábitos parafuncionales orales y los factores emocionales, así como su posible impacto en la salud oral.

2. PROCEDIMIENTOS
Entiendo que mi participación incluye:
- Responder un cuestionario estructurado que incluye información sobre datos personales generales, antecedentes médicos y hábitos parafuncionales orales.
- Responder una encuesta validada para la evaluación de aspectos emocionales (estrés, ansiedad y depresión).
- Someterme a un examen clínico intraoral no invasivo.
- Permitir la toma de registros fotográficos intraorales, cuando sea necesario (previa autorización específica).

3. RIESGOS
Se me ha informado que esta investigación es de riesgo mínimo, ya que no implica procedimientos invasivos ni intervenciones que afecten mi integridad física o psicológica. En concordancia con la Resolución 8430 de 1993 del Ministerio de Salud de Colombia, este estudio se clasifica como investigación con riesgo mínimo.

4. BENEFICIOS
Comprendo que no recibiré beneficios económicos por mi participación; sin embargo, esta contribuirá al fortalecimiento del conocimiento científico en el área de la salud oral.

5. CONFIDENCIALIDAD Y PRIVACIDAD
Se garantiza que la información suministrada será tratada con estricta confidencialidad y utilizada únicamente con fines académicos e investigativos. Mi identidad no será revelada en publicaciones o presentaciones, salvo autorización expresa.

6. USO DE INFORMACIÓN
Autorizo el uso de la información recolectada para análisis académico, presentación de resultados y publicaciones derivadas de la investigación.

7. PARTICIPACIÓN VOLUNTARIA Y RETIRO
Entiendo que mi participación es totalmente voluntaria y que puedo retirarme en cualquier momento, sin que esto genere ningún tipo de perjuicio.

8. ACLARACIÓN DE DUDAS
He tenido la oportunidad de realizar preguntas sobre el estudio y he recibido respuestas claras y satisfactorias por parte de los investigadores.

Nombre:
Cédula: 
Fecha:

Diana Carolina Cortés (20572211983) - Estudiante de odontología
Luisa María Sandoval (20572212013) - Estudiante de odontología
Christopher Vargas (20572211040) - Estudiante de odontología
Alejandra Bobadilla Henao - Docente de odontología - Asesora científica

En constancia de lo anterior, se firma el presente consentimiento informado.`,

  2: `CONSENTIMIENTO INFORMADO PARA LA TOMA Y USO DE REGISTROS FOTOGRÁFICOS EN INVESTIGACIÓN

TRABAJO DE GRADO

Título del proyecto: Relación entre factores emocionales y hábitos parafuncionales en estudiantes de odontología de la Universidad Antonio Nariño, Sede Neiva.

Ciudad: Neiva – Huila

En el marco del desarrollo del presente proyecto de investigación, se solicita su autorización para la toma de registros fotográficos intraorales, los cuales serán utilizados exclusivamente con fines académicos y científicos. Estas imágenes permitirán apoyar el análisis clínico y la comprensión de los hábitos parafuncionales en los participantes del estudio.

Yo, ________________________________________________, identificado(a) con el número de cédula que aparece al pie de mi firma, actuando en nombre propio, manifiesto que he sido informado(a) de manera clara, suficiente y comprensible, y que autorizo de forma libre, previa y voluntaria la toma y uso de registros fotográficos intraorales dentro del proyecto de investigación mencionado, desarrollado por los estudiantes investigadores Diana Carolina Cortés, Luisa María Sandoval y Christopher Vargas, bajo la asesoría científica de la Dra. Alejandra Bobadilla Henao.

1. FINALIDAD DE LOS REGISTROS FOTOGRÁFICOS
He sido informado(a) de manera clara de que las imágenes serán utilizadas exclusivamente con fines académicos, científicos e investigativos en el desarrollo del trabajo de grado.

2. PROCEDIMIENTO
Entiendo que la toma de fotografías se realizará únicamente en la cavidad oral, mediante procedimientos no invasivos y cumpliendo con las normas de bioseguridad establecidas.

3. RIESGOS
Se me ha informado que este procedimiento es de riesgo mínimo, ya que no representa daño físico ni psicológico para mi integridad.

4. CONFIDENCIALIDAD Y PRIVACIDAD
Se garantiza que las imágenes serán tratadas con estricta confidencialidad, evitando cualquier información que permita mi identificación. En caso de que se requiera incluir elementos que puedan facilitar mi identificación, se solicitará una autorización adicional.

5. USO DE LAS IMÁGENES
Autorizo que los registros fotográficos puedan ser utilizados en análisis clínico, presentaciones académicas o científicas y publicaciones derivadas de la investigación.

6. PARTICIPACIÓN VOLUNTARIA Y RETIRO
Comprendo que mi participación es totalmente voluntaria y que puedo retirar mi autorización en cualquier momento, sin que esto genere ningún tipo de perjuicio.

7. ACLARACIÓN DE DUDAS
Declaro que he recibido información suficiente sobre el propósito, alcance y uso de los registros fotográficos, y que he tenido la oportunidad de realizar preguntas, las cuales han sido respondidas satisfactoriamente.

Nombre:
Cédula: 
Fecha:

Diana Carolina Cortés (20572211983) - Estudiante de odontología
Luisa María Sandoval (20572212013) - Estudiante de odontología
Christopher Vargas (20572211040) - Estudiante de odontología
Alejandra Bobadilla Henao - Docente de odontología - Asesora científica

En constancia de lo anterior, se firma el presente consentimiento informado.`
};

// ========= FUNCIONES DE COMUNICACIÓN CON EL BACKEND (OPTIMIZADAS) =========
async function llamarAPI(action, data = {}) {
  const cacheKey = `${action}_${JSON.stringify(data)}`;
  const cached = getFrontendCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Error en la API');
    }
    
    // Cachear solo lecturas
    if (['obtenerPreguntas', 'obtenerEPS', 'cedulaExiste', 'verificarConsentimientoFirmado'].includes(action)) {
      setFrontendCache(cacheKey, result.data);
    }
    
    return result.data;
  } catch (error) {
    console.error('Error en llamarAPI:', error);
    throw error;
  }
}

async function llamarAPIMultiple(acciones) {
  const cacheKey = `multiple_${JSON.stringify(acciones)}`;
  const cached = getFrontendCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch('/api/proxy-multiple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acciones })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Error en la API');
    }
    setFrontendCache(cacheKey, result.data);
    return result.data;
  } catch (error) {
    console.error('Error en llamarAPIMultiple:', error);
    throw error;
  }
}

// ========= FUNCIONES DE NAVEGACIÓN (OPTIMIZADAS) =========
function $(id) { return document.getElementById(id); }
function $$(selector) { return document.querySelectorAll(selector); }

function mostrar(id) {
  $$(".pantalla").forEach(p => p.style.display = "none");
  $(id).style.display = "block";
}

function mostrarError(mensaje) {
  $("errorTexto").innerHTML = mensaje;
  mostrar("errorMensaje");
}

function volverMenu() {
  limpiarFormularios();
  pacienteActual = null;
  preguntasCache = null;
  tipoConsentimientoActual = null;
  datosPacienteConsentimiento = null;
  if (signaturePad) signaturePad.clear();
  $$(".pantalla").forEach(p => p.style.display = "none");
  $("menu").style.display = "flex";
  limpiarMensajesError();
}

function limpiarMensajesError() {
  $$('.mensaje-error').forEach(e => e.style.display = 'none');
}

function limpiarFormularios() {
  // Limpiar consentimiento 1
  $("cons1Nombre").value = "";
  $("cons1Apellidos").value = "";
  $("cons1Cedula").value = "";
  
  // Limpiar consentimiento 2
  $("cons2Cedula").value = "";
  
  // Limpiar historia
  $("historiaCedulaInput").value = "";
  $("fechaNacimiento").value = "";
  $("contacto").value = "";
  $("sexo").value = "";
  $("semestre").value = "";
  $("enfermedadesSistemicas").value = "";
  $("tipoEnfermedad").value = "";
  $("tomaMedicamentos").value = "";
  $("tipoMedicamento").value = "";
  $("antecedentesPsicologicos").value = "";
  $("tipoEnfermedadPsicologica").value = "";
  $("habitoNo").checked = false;
  $("habitoLabios").checked = false;
  $("habitoMejillas").checked = false;
  $("habitoLengua").checked = false;
  $("sustanciasPsicoactivas").value = "";
  $("tipoSustancia").value = "";
  
  const epsInput = $("epsInput");
  if (epsInput) epsInput.value = "";
  
  document.getElementsByName("fumaOpcion").forEach(r => r.checked = false);
  $("cedulaEncuestaInput").value = "";
  
  $$('.campo-condicional').forEach(c => c.style.display = 'none');
}

// ========= CONSENTIMIENTOS =========
function mostrarConsentimiento(tipo) {
  tipoConsentimientoActual = tipo;
  if (tipo === 1) {
    $("cons1Nombre").value = "";
    $("cons1Apellidos").value = "";
    $("cons1Cedula").value = "";
    $("cons1Error").style.display = "none";
    mostrar("cedulaConsentimiento1");
  } else {
    $("cons2Cedula").value = "";
    $("cons2Error").style.display = "none";
    mostrar("cedulaConsentimiento2");
  }
}

async function validarCedulaConsentimiento1() {
  const nombre = $("cons1Nombre").value.trim();
  const apellidos = $("cons1Apellidos").value.trim();
  const cedula = $("cons1Cedula").value;
  
  if (!nombre || !apellidos || !cedula) {
    mostrarErrorEn("cons1Error", "Complete todos los campos");
    return;
  }
  
  try {
    const yaFirmado = await llamarAPI('verificarConsentimientoFirmado', { cedula, tipo: 1 });
    if (yaFirmado) {
      mostrarErrorEn("cons1Error", "Este paciente ya tiene el Consentimiento 1 firmado");
      return;
    }
    datosPacienteConsentimiento = { nombre, apellidos, cedula };
    cargarConsentimiento({ nombre, apellidos }, cedula);
  } catch (error) {
    mostrarErrorEn("cons1Error", error.message);
  }
}

async function validarCedulaConsentimiento2() {
  const cedula = $("cons2Cedula").value;
  if (!cedula) { mostrarErrorEn("cons2Error", "Ingrese el número de cédula"); return; }
  
  try {
    const [cons1Firmado, cons2Firmado] = await llamarAPIMultiple([
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 2 } }
    ]);
    
    if (!cons1Firmado) { mostrarErrorEn("cons2Error", "Debe firmar primero el Consentimiento 1"); return; }
    if (cons2Firmado) { mostrarErrorEn("cons2Error", "Este paciente ya tiene el Consentimiento 2 firmado"); return; }
    
    const paciente = await llamarAPI('obtenerDatosConsentimiento', { cedula });
    datosPacienteConsentimiento = { ...paciente, cedula };
    cargarConsentimiento(paciente, cedula);
  } catch (error) {
    mostrarErrorEn("cons2Error", error.message);
  }
}

function mostrarErrorEn(elementId, mensaje) {
  const errorDiv = $(elementId);
  errorDiv.innerHTML = mensaje;
  errorDiv.style.display = "block";
  setTimeout(() => { errorDiv.style.display = "none"; }, 5000);
}

function cargarConsentimiento(paciente, cedula) {
  const fechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`;
  
  $("nombrePacienteConsentimiento").innerHTML = nombreCompleto;
  $("cedulaPacienteConsentimiento").innerHTML = cedula;
  $("fechaConsentimiento").innerHTML = fechaActual;
  
  let texto = consentimientoTextos[tipoConsentimientoActual];
  texto = texto.replace(/________________________________________________/g, nombreCompleto);
  texto = texto.replace(/Nombre:\s*\n/g, `Nombre: ${nombreCompleto}\n`);
  texto = texto.replace(/Cédula:\s*\n/g, `Cédula: ${cedula}\n`);
  texto = texto.replace(/Fecha:\s*\n/g, `Fecha: ${fechaActual}\n`);
  texto = texto.replace(/\n/g, '<br>');
  
  $("consentimientoTexto").innerHTML = `<p style="white-space: pre-line;">${texto}</p>`;
  $("consentimientoTituloDoc").innerHTML = tipoConsentimientoActual === 1 ? "CONSENTIMIENTO 1 RECOLECCIÓN DE DATOS" : "CONSENTIMIENTO 2 REGISTRO FOTOGRÁFICO";
  
  setTimeout(() => configurarSignaturePad(), 100);
  $("consentimientoError").style.display = "none";
  mostrar("consentimiento");
}

function configurarSignaturePad() {
  const canvas = $('signatureCanvas');
  if (canvas) {
    canvas.width = canvas.clientWidth || 500;
    canvas.height = canvas.clientHeight || 200;
    signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)',
      velocityFilterWeight: 0.7,
      minWidth: 1,
      maxWidth: 3
    });
  }
}

function limpiarFirma() { if (signaturePad) signaturePad.clear(); }

async function guardarConsentimiento() {
  if (!signaturePad || signaturePad.isEmpty()) {
    mostrarErrorEn("consentimientoError", "Por favor, firme antes de continuar");
    return;
  }
  
  const btn = $("btnGuardarConsentimiento");
  btn.innerText = "Guardando...";
  btn.disabled = true;
  
  try {
    await llamarAPI('guardarConsentimientoConImagen', {
      cedula: $("cedulaPacienteConsentimiento").innerHTML,
      nombre: datosPacienteConsentimiento.nombre,
      apellidos: datosPacienteConsentimiento.apellidos,
      tipo: tipoConsentimientoActual,
      firmaDataURL: signaturePad.toDataURL()
    });
    mostrar("consentimientoExitoso");
  } catch (error) {
    mostrarErrorEn("consentimientoError", error.message);
  } finally {
    btn.innerText = "Aceptar y guardar";
    btn.disabled = false;
  }
}

// ========= HISTORIA CLÍNICA =========
async function mostrarHistoria() {
  limpiarFormularios();
  $("historiaCedulaError").style.display = "none";
  mostrar("cedulaHistoria");
  
  if (!epsCache) {
    try { epsCache = await llamarAPI('obtenerEPS'); } catch (e) {}
  }
  configurarEPS();
}

function configurarEPS() {
  const container = $("epsContainer");
  if (!container) return;
  
  container.innerHTML = `
    <input type="text" id="epsInput" placeholder="Buscar o escribir EPS..." autocomplete="off">
    <select id="eps" size="5" style="display:none;"></select>
  `;
  
  const input = $("epsInput");
  const select = $("eps");
  
  if (epsCache) {
    epsCache.forEach(eps => {
      if (eps?.trim()) {
        select.appendChild(new Option(eps, eps));
      }
    });
  }
  
  const filtrar = (texto) => {
    const t = texto.toLowerCase().trim();
    select.innerHTML = "";
    let count = 0;
    epsCache?.forEach(eps => {
      if (eps?.trim() && eps.toLowerCase().includes(t)) {
        select.appendChild(new Option(eps, eps));
        count++;
      }
    });
    if (!count && t) select.appendChild(new Option(`Usar "${t}" como nueva EPS`, t));
    select.style.display = (t || select.options.length > 0) ? 'block' : 'none';
  };
  
  input.oninput = e => filtrar(e.target.value);
  input.onfocus = () => filtrar(input.value);
  input.onblur = () => setTimeout(() => select.style.display = 'none', 200);
  select.onmousedown = e => { e.preventDefault(); input.value = e.target.value; select.style.display = 'none'; };
}

async function validarCedulaHistoria() {
  const cedula = $("historiaCedulaInput").value;
  if (!cedula) { mostrarErrorEn("historiaCedulaError", "Ingrese el número de cédula"); return; }
  
  try {
    const [cons1, cons2, existe] = await llamarAPIMultiple([
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula, tipo: 2 } },
      { action: 'cedulaExiste', data: { cedula } }
    ]);
    
    if (!cons1) { mostrarErrorEn("historiaCedulaError", "Debe firmar el Consentimiento 1 primero"); return; }
    if (!cons2) { mostrarErrorEn("historiaCedulaError", "Debe firmar el Consentimiento 2 primero"); return; }
    if (existe) { mostrarErrorEn("historiaCedulaError", "Este paciente ya tiene historia clínica"); return; }
    
    const paciente = await llamarAPI('obtenerDatosConsentimiento', { cedula });
    pacienteActual = { ...paciente, cedula };
    
    $("nombrePacienteHistoria").innerHTML = `${paciente.nombre} ${paciente.apellidos}`;
    $("cedulaPacienteHistoria").innerHTML = cedula;
    $("historiaError").style.display = "none";
    mostrar("historia");
    setTimeout(configurarCamposCondicionales, 100);
  } catch (error) {
    mostrarErrorEn("historiaCedulaError", error.message);
  }
}

function configurarCamposCondicionales() {
  const pares = [
    ["enfermedadesSistemicas", "campoTipoEnfermedad", "tipoEnfermedad"],
    ["tomaMedicamentos", "campoTipoMedicamento", "tipoMedicamento"],
    ["antecedentesPsicologicos", "campoTipoPsicologico", "tipoEnfermedadPsicologica"],
    ["sustanciasPsicoactivas", "campoTipoSustancia", "tipoSustancia"]
  ];
  
  pares.forEach(([selectId, campoId, inputId]) => {
    const select = $(selectId);
    const campo = $(campoId);
    const input = $(inputId);
    if (select && campo) {
      select.onchange = () => {
        campo.style.display = select.value === "Sí" ? "block" : "none";
        if (select.value !== "Sí" && input) input.value = "";
      };
    }
  });
  
  const no = $("habitoNo"), labios = $("habitoLabios"), mejillas = $("habitoMejillas"), lengua = $("habitoLengua");
  if (no) no.onchange = function() { if (this.checked) { labios.checked = mejillas.checked = lengua.checked = false; } };
  [labios, mejillas, lengua].forEach(chk => {
    if (chk) chk.onchange = function() { if (this.checked && no?.checked) no.checked = false; };
  });
}

function obtenerHabitosSeleccionados() {
  const h = [];
  if ($("habitoNo")?.checked) h.push("No");
  if ($("habitoLabios")?.checked) h.push("Mordedura de labios");
  if ($("habitoMejillas")?.checked) h.push("Mordedura de mejillas");
  if ($("habitoLengua")?.checked) h.push("Mordedura de lengua");
  return h;
}

function obtenerFumaSeleccionado() {
  return [...document.getElementsByName("fumaOpcion")].find(r => r.checked)?.value || "";
}

async function guardarHistoria() {
  const habitos = obtenerHabitosSeleccionados();
  const fuma = obtenerFumaSeleccionado();
  const semestre = parseInt($("semestre").value);
  const epsValue = $("epsInput")?.value.trim() || "";
  
  const datos = {
    nombre: pacienteActual.nombre,
    apellidos: pacienteActual.apellidos,
    cedula: pacienteActual.cedula,
    fechaNacimiento: $("fechaNacimiento").value,
    contacto: $("contacto").value,
    eps: epsValue,
    sexo: $("sexo").value,
    semestre,
    area: semestre <= 4 ? "Preclínica" : "Clínica",
    enfermedadesSistemicas: $("enfermedadesSistemicas").value,
    tipoEnfermedad: $("tipoEnfermedad").value.trim(),
    tomaMedicamentos: $("tomaMedicamentos").value,
    tipoMedicamento: $("tipoMedicamento").value.trim(),
    antecedentesPsicologicos: $("antecedentesPsicologicos").value,
    tipoEnfermedadPsicologica: $("tipoEnfermedadPsicologica").value.trim(),
    habitosOrales: habitos,
    sustanciasPsicoactivas: $("sustanciasPsicoactivas").value,
    tipoSustancia: $("tipoSustancia").value.trim(),
    fumaCigarrilloVape: fuma
  };

  const requeridos = ['fechaNacimiento', 'contacto', 'eps', 'sexo', 'semestre', 'enfermedadesSistemicas', 'tomaMedicamentos', 'antecedentesPsicologicos', 'sustanciasPsicoactivas'];
  if (requeridos.some(c => !datos[c])) { mostrarErrorEn("historiaError", "Complete todos los campos requeridos"); return; }
  if (!habitos.length) { mostrarErrorEn("historiaError", "Seleccione al menos un hábito oral"); return; }
  if (!fuma) { mostrarErrorEn("historiaError", "Seleccione opción de cigarrillo/vape"); return; }

  try {
    await llamarAPI('guardarHistoriaCompleta', datos);
    mostrar("registroExitoso");
  } catch (error) {
    mostrarErrorEn("historiaError", error.message);
  }
}

// ========= ENCUESTA =========
function mostrarCedulaEncuesta() {
  $("cedulaEncuestaInput").value = "";
  $("encuestaCedulaError").style.display = "none";
  mostrar("cedulaEncuesta");
}

async function validarCedulaEncuesta() {
  const ced = $("cedulaEncuestaInput").value;
  if (!ced) { mostrarErrorEn("encuestaCedulaError", "Ingrese un número de cédula"); return; }

  try {
    const [existeHistoria, existeEncuesta, cons1, cons2] = await llamarAPIMultiple([
      { action: 'cedulaExiste', data: { cedula: ced } },
      { action: 'encuestaYaExiste', data: { cedula: ced } },
      { action: 'verificarConsentimientoFirmado', data: { cedula: ced, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula: ced, tipo: 2 } }
    ]);
    
    if (!existeHistoria) { mostrarErrorEn("encuestaCedulaError", "Debe registrar primero la historia clínica"); return; }
    if (!cons1) { mostrarErrorEn("encuestaCedulaError", "Debe firmar el Consentimiento 1"); return; }
    if (!cons2) { mostrarErrorEn("encuestaCedulaError", "Debe firmar el Consentimiento 2"); return; }
    if (existeEncuesta) { mostrarErrorEn("encuestaCedulaError", "Este paciente ya completó la encuesta"); return; }
    
    const paciente = await llamarAPI('obtenerDatosPaciente', { cedula: ced });
    pacienteActual = paciente;
    $("nombrePacienteEncuesta").innerHTML = `${paciente.nombre} ${paciente.apellidos}`;
    $("cedulaPacienteEncuesta").innerHTML = ced;
    iniciarEncuesta();
  } catch (error) {
    mostrarErrorEn("encuestaCedulaError", error.message);
  }
}

async function iniciarEncuesta() {
  if (!preguntasCache) {
    try { preguntasCache = await llamarAPI('obtenerPreguntas'); } catch (e) {}
  }
  mostrarPreguntas(preguntasCache);
}

function mostrarPreguntas(preguntas) {
  const cont = $("contenedorPreguntas");
  cont.innerHTML = preguntas.map((p, i) => `
    <div class="pregunta">
      <b>${i + 1}. ${p}</b>
      <div class="opciones">
        ${[0,1,2,3].map(j => `<label><input type="radio" name="p${i}" value="${j}" required> <span>${j}</span></label>`).join('')}
      </div>
    </div>
  `).join('');
  mostrar("encuesta");
}

async function finalizarEncuesta() {
  const faltantes = [];
  const respuestas = [];
  
  $$(".pregunta").forEach((_, i) => {
    const r = document.querySelector(`input[name="p${i}"]:checked`);
    r ? respuestas.push(r.value) : faltantes.push(i + 1);
  });

  if (faltantes.length) {
    const msg = faltantes.length === 1 ? `Falta la pregunta ${faltantes[0]}` : `Faltan las preguntas ${faltantes.slice(0,-1).join(', ')} y ${faltantes.slice(-1)}`;
    $("mensajeErrorPreguntas").innerHTML = msg;
    $("mensajeErrorPreguntas").style.display = "block";
    $("mensajeErrorPreguntas").scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  try {
    await llamarAPI('guardarEncuesta', { cedula: pacienteActual.cedula, respuestas });
    mostrar("encuestaExitosa");
  } catch (error) {
    $("mensajeErrorPreguntas").innerHTML = error.message;
    $("mensajeErrorPreguntas").style.display = "block";
  }
}

// ========= INICIALIZACIÓN =========
document.addEventListener('DOMContentLoaded', async () => {
  // Precargar datos comunes en paralelo
  try {
    const [preguntas, eps] = await llamarAPIMultiple([
      { action: 'obtenerPreguntas', data: {} },
      { action: 'obtenerEPS', data: {} }
    ]);
    preguntasCache = preguntas;
    epsCache = eps;
  } catch (e) {
    console.log('Precarga parcial, se cargará bajo demanda');
  }
});
