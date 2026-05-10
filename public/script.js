// ========= CONFIGURACIÓN GLOBAL =========
let pacienteActual = null;
let preguntasCache = null;
let signaturePad = null;
let tipoConsentimientoActual = null;
let epsCache = null;
let datosPacienteConsentimiento = null;

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

// ========= FUNCIONES DE CARGA =========
function mostrarCarga(mensaje = 'Procesando...') {
  const overlay = document.getElementById('loadingOverlay');
  const texto = document.getElementById('loadingText');
  if (overlay && texto) {
    texto.textContent = mensaje;
    overlay.style.display = 'flex';
  }
}

function ocultarCarga() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// ========= FUNCIONES DE COMUNICACIÓN CON EL BACKEND =========
async function llamarAPI(action, data = {}, mostrarLoader = true, maxReintentos = 3) {
  let ultimoError = null;
  
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      if (mostrarLoader && intento === 1) {
        mostrarCarga('Procesando solicitud...');
      } else if (mostrarLoader && intento > 1) {
        mostrarCarga(`Reintentando (${intento}/${maxReintentos})...`);
      }
      
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data })
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Error en la API');
      }
      
      if (mostrarLoader) ocultarCarga();
      return result.data;
      
    } catch (error) {
      ultimoError = error;
      console.error(`Intento ${intento}/${maxReintentos} fallido:`, error.message);
      
      if (intento < maxReintentos) {
        const espera = Math.pow(2, intento - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, espera));
      }
    }
  }
  
  if (mostrarLoader) ocultarCarga();
  throw new Error(`Error después de ${maxReintentos} intentos: ${ultimoError.message}`);
}

async function llamarAPIMultiple(acciones, mostrarLoader = true) {
  if (mostrarLoader) mostrarCarga('Verificando información del paciente...');
  
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
    return result.data;
  } catch (error) {
    console.error('Error en llamarAPIMultiple:', error);
    throw error;
  } finally {
    if (mostrarLoader) ocultarCarga();
  }
}

// ========= FUNCIONES DE NAVEGACIÓN =========
function mostrar(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function mostrarError(mensaje) {
  document.getElementById("errorTexto").innerHTML = mensaje;
  mostrar("errorMensaje");
}

function volverMenu() {
  limpiarFormularios();
  pacienteActual = null;
  preguntasCache = null;
  tipoConsentimientoActual = null;
  datosPacienteConsentimiento = null;
  if (signaturePad) signaturePad.clear();
  document.querySelectorAll(".pantalla").forEach(p => p.style.display = "none");
  document.getElementById("menu").style.display = "flex";
  limpiarMensajesError();
}

function limpiarMensajesError() {
  const errores = document.querySelectorAll('.mensaje-error');
  errores.forEach(e => e.style.display = 'none');
}

function limpiarFormularios() {
  document.getElementById("cons1Nombre").value = "";
  document.getElementById("cons1Apellidos").value = "";
  document.getElementById("cons1Cedula").value = "";
  
  document.getElementById("cons2Cedula").value = "";
  
  document.getElementById("historiaCedulaInput").value = "";
  document.getElementById("fechaNacimiento").value = "";
  document.getElementById("contacto").value = "";
  document.getElementById("sexo").value = "";
  document.getElementById("semestre").value = "";
  document.getElementById("enfermedadesSistemicas").value = "";
  document.getElementById("tipoEnfermedad").value = "";
  document.getElementById("tomaMedicamentos").value = "";
  document.getElementById("tipoMedicamento").value = "";
  document.getElementById("antecedentesPsicologicos").value = "";
  document.getElementById("tipoEnfermedadPsicologica").value = "";
  document.getElementById("habitoNo").checked = false;
  document.getElementById("habitoLabios").checked = false;
  document.getElementById("habitoMejillas").checked = false;
  document.getElementById("habitoLengua").checked = false;
  document.getElementById("sustanciasPsicoactivas").value = "";
  document.getElementById("tipoSustancia").value = "";
  
  const epsInput = document.getElementById("epsInput");
  const epsSelect = document.getElementById("eps");
  if (epsInput) epsInput.value = "";
  if (epsSelect) epsSelect.value = "";
  
  const radios = document.getElementsByName("fumaOpcion");
  for (let i = 0; i < radios.length; i++) radios[i].checked = false;
  
  document.getElementById("cedulaEncuestaInput").value = "";
  
  const camposCondicionales = document.querySelectorAll('.campo-condicional');
  camposCondicionales.forEach(campo => campo.style.display = 'none');
}

// ========= CONSENTIMIENTO 1 =========
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
    const yaFirmado = await llamarAPI('verificarConsentimientoFirmado', { cedula: cedula, tipo: 1 });
    if (yaFirmado) {
      mostrarErrorEn("cons1Error", "Este paciente ya tiene el Consentimiento 1 Recolección de datos firmado");
      return;
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
    const cons1Firmado = await llamarAPI('verificarConsentimientoFirmado', { cedula: cedula, tipo: 1 });
    
    if (!cons1Firmado) {
      mostrarErrorEn("cons2Error", "Debe firmar primero el Consentimiento 1 Recolección de datos");
      return;
    }
    
    const cons2Firmado = await llamarAPI('verificarConsentimientoFirmado', { cedula: cedula, tipo: 2 });
    
    if (cons2Firmado) {
      mostrarErrorEn("cons2Error", "Este paciente ya tiene el Consentimiento 2 Registro fotográfico firmado");
      return;
    }
    
    const paciente = await llamarAPI('obtenerDatosConsentimiento', { cedula: cedula });
    
    datosPacienteConsentimiento = { ...paciente, cedula };
    cargarConsentimiento(paciente, cedula);
  } catch (error) {
    mostrarErrorEn("cons2Error", error.message);
  }
}

function mostrarErrorEn(elementId, mensaje) {
  const errorDiv = document.getElementById(elementId);
  errorDiv.innerHTML = mensaje;
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

function cargarConsentimiento(paciente, cedula) {
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`;
  
  document.getElementById("nombrePacienteConsentimiento").innerHTML = nombreCompleto;
  document.getElementById("cedulaPacienteConsentimiento").innerHTML = cedula;
  document.getElementById("fechaConsentimiento").innerHTML = fechaActual;
  
  let texto = consentimientoTextos[tipoConsentimientoActual];
  
  texto = texto.replace(/________________________________________________/g, nombreCompleto);
  texto = texto.replace(/Nombre:\s*\n/g, `Nombre: ${nombreCompleto}\n`);
  texto = texto.replace(/Cédula:\s*\n/g, `Cédula: ${cedula}\n`);
  texto = texto.replace(/Fecha:\s*\n/g, `Fecha: ${fechaActual}\n`);
  texto = texto.replace(/\n/g, '<br>');
  
  document.getElementById("consentimientoTexto").innerHTML = `<p style="white-space: pre-line;">${texto}</p>`;
  document.getElementById("consentimientoTituloDoc").innerHTML = tipoConsentimientoActual === 1 
    ? "CONSENTIMIENTO 1 RECOLECCIÓN DE DATOS" 
    : "CONSENTIMIENTO 2 REGISTRO FOTOGRÁFICO";
  
  setTimeout(() => configurarSignaturePad(), 100);
  document.getElementById("consentimientoError").style.display = "none";
  mostrar("consentimiento");
}

function configurarSignaturePad() {
  const canvas = document.getElementById('signatureCanvas');
  if (canvas) {
    const scaleFactor = 2;
    canvas.width = 500 * scaleFactor;
    canvas.height = 200 * scaleFactor;
    canvas.style.width = '100%';
    canvas.style.height = '200px';
    
    const ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
    
    signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)',
      velocityFilterWeight: 0.7,
      minWidth: 1,
      maxWidth: 3
    });
  }
}

function limpiarFirma() {
  if (signaturePad) signaturePad.clear();
}

async function guardarConsentimiento() {
  if (!signaturePad) {
    mostrarErrorEn("consentimientoError", "Error con el área de firma");
    return;
  }
  
  if (signaturePad.isEmpty()) {
    mostrarErrorEn("consentimientoError", "Por favor, firme en el área designada antes de continuar");
    return;
  }
  
  const firmaDataURL = signaturePad.toDataURL('image/jpeg', 0.85);
  const cedula = document.getElementById("cedulaPacienteConsentimiento").innerHTML;
  
  mostrarCarga('Guardando consentimiento y generando PDF...');
  
  try {
    await llamarAPI('guardarConsentimientoConImagen', { 
      cedula: cedula,
      nombre: datosPacienteConsentimiento.nombre,
      apellidos: datosPacienteConsentimiento.apellidos,
      tipo: tipoConsentimientoActual,
      firmaDataURL: firmaDataURL
    }, false);
    
    ocultarCarga();
    mostrar("consentimientoExitoso");
  } catch (error) {
    ocultarCarga();
    mostrarErrorEn("consentimientoError", error.message);
  }
}

// ========= HISTORIA CLÍNICA =========
async function mostrarHistoria() {
  limpiarFormularios();
  document.getElementById("historiaCedulaInput").value = "";
  document.getElementById("historiaCedulaError").style.display = "none";
  mostrar("cedulaHistoria");
  if (!epsCache) {
    try {
      epsCache = await llamarAPI('obtenerEPS');
    } catch (error) {
      console.error("Error cargando EPS:", error);
    }
  }
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
  
  if (epsCache && epsCache.length > 0) {
    epsCache.forEach(eps => {
      if (eps && eps.toString().trim() !== "") {
        const option = document.createElement("option");
        option.value = eps;
        option.text = eps;
        epsSelect.appendChild(option);
      }
    });
  }
  
  function filtrarEPS(busqueda) {
    const termino = busqueda.toLowerCase().trim();
    epsSelect.innerHTML = "";
    
    let opcionesMostradas = 0;
    if (epsCache && epsCache.length > 0) {
      epsCache.forEach(eps => {
        if (eps && eps.toString().trim() !== "" && eps.toLowerCase().includes(termino)) {
          const option = document.createElement("option");
          option.value = eps;
          option.text = eps;
          epsSelect.appendChild(option);
          opcionesMostradas++;
        }
      });
    }
    
    if (opcionesMostradas === 0 && termino.length > 0) {
      const option = document.createElement("option");
      option.value = termino;
      option.text = `Usar "${termino}" como nueva EPS`;
      epsSelect.appendChild(option);
    }
    
    epsSelect.style.display = termino.length > 0 || epsSelect.options.length > 0 ? 'block' : 'none';
  }
  
  epsInput.addEventListener('input', (e) => {
    filtrarEPS(e.target.value);
  });
  
  epsInput.addEventListener('focus', () => {
    filtrarEPS(epsInput.value);
  });
  
  epsInput.addEventListener('blur', () => {
    setTimeout(() => {
      epsSelect.style.display = 'none';
    }, 200);
  });
  
  epsSelect.addEventListener('change', () => {
    if (epsSelect.value) {
      epsInput.value = epsSelect.value;
    }
    epsSelect.style.display = 'none';
  });
  
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
    const cons1Firmado = await llamarAPI('verificarConsentimientoFirmado', { cedula: cedula, tipo: 1 });
    const cons2Firmado = await llamarAPI('verificarConsentimientoFirmado', { cedula: cedula, tipo: 2 });
    
    if (!cons1Firmado) {
      mostrarErrorEn("historiaCedulaError", "Debe tener el Consentimiento 1 Recolección de datos firmado antes de registrar la historia clínica");
      return;
    }
    
    if (!cons2Firmado) {
      mostrarErrorEn("historiaCedulaError", "Debe tener el Consentimiento 2 Registro fotográfico firmado antes de registrar la historia clínica");
      return;
    }
    
    const existeHistoria = await llamarAPI('cedulaExiste', { cedula: cedula });
    if (existeHistoria) {
      mostrarErrorEn("historiaCedulaError", "Este paciente ya tiene una historia clínica registrada");
      return;
    }
    
    const paciente = await llamarAPI('obtenerDatosConsentimiento', { cedula: cedula });
    pacienteActual = { ...paciente, cedula };
    
    document.getElementById("nombrePacienteHistoria").innerHTML = `${paciente.nombre} ${paciente.apellidos}`;
    document.getElementById("cedulaPacienteHistoria").innerHTML = cedula;
    
    document.getElementById("historiaError").style.display = "none";
    mostrar("historia");
    
    setTimeout(configurarCamposCondicionales, 100);
  } catch (error) {
    mostrarErrorEn("historiaCedulaError", error.message);
  }
}

function configurarCamposCondicionales() {
  const configuraciones = [
    { trigger: 'enfermedadesSistemicas', campo: 'campoTipoEnfermedad', limpiar: 'tipoEnfermedad' },
    { trigger: 'tomaMedicamentos', campo: 'campoTipoMedicamento', limpiar: 'tipoMedicamento' },
    { trigger: 'antecedentesPsicologicos', campo: 'campoTipoPsicologico', limpiar: 'tipoEnfermedadPsicologica' },
    { trigger: 'sustanciasPsicoactivas', campo: 'campoTipoSustancia', limpiar: 'tipoSustancia' }
  ];
  
  configuraciones.forEach(config => {
    const trigger = document.getElementById(config.trigger);
    const campo = document.getElementById(config.campo);
    const limpiar = document.getElementById(config.limpiar);
    
    if (trigger && campo && trigger.dataset.listenerAdded !== 'true') {
      trigger.addEventListener('change', () => {
        campo.style.display = trigger.value === 'Sí' ? 'block' : 'none';
        if (trigger.value !== 'Sí' && limpiar) limpiar.value = '';
      });
      trigger.dataset.listenerAdded = 'true';
    }
  });
  
  const checkNo = document.getElementById("habitoNo");
  const checkLabios = document.getElementById("habitoLabios");
  const checkMejillas = document.getElementById("habitoMejillas");
  const checkLengua = document.getElementById("habitoLengua");
  
  if (checkNo && checkNo.dataset.listenerAdded !== 'true') {
    checkNo.addEventListener('change', function() {
      if (this.checked) {
        if (checkLabios) checkLabios.checked = false;
        if (checkMejillas) checkMejillas.checked = false;
        if (checkLengua) checkLengua.checked = false;
      }
    });
    checkNo.dataset.listenerAdded = 'true';
  }
  
  [checkLabios, checkMejillas, checkLengua].forEach(chk => {
    if (chk && chk.dataset.listenerAdded !== 'true') {
      chk.addEventListener('change', function() {
        if (this.checked && checkNo && checkNo.checked) {
          checkNo.checked = false;
        }
      });
      chk.dataset.listenerAdded = 'true';
    }
  });
}

function obtenerHabitosSeleccionados() {
  const habitos = [];
  if (document.getElementById("habitoNo")?.checked) habitos.push("No");
  if (document.getElementById("habitoLabios")?.checked) habitos.push("Mordedura de labios");
  if (document.getElementById("habitoMejillas")?.checked) habitos.push("Mordedura de mejillas");
  if (document.getElementById("habitoLengua")?.checked) habitos.push("Mordedura de lengua");
  return habitos;
}

function obtenerFumaSeleccionado() {
  const radios = document.getElementsByName("fumaOpcion");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return "";
}

// ========= GUARDAR HISTORIA CLÍNICA CON VALIDACIÓN ROBUSTA =========
async function guardarHistoria() {
  const habitos = obtenerHabitosSeleccionados();
  
  const tieneNo = habitos.includes('No');
  const tieneEspecificos = habitos.filter(h => h !== 'No');
  
  if (tieneNo && tieneEspecificos.length > 0) {
    mostrarErrorEn("historiaError", 'Si selecciona "No presenta hábitos", no puede marcar hábitos específicos');
    return;
  }
  
  if (!tieneNo && tieneEspecificos.length === 0) {
    mostrarErrorEn("historiaError", "Seleccione al menos un hábito oral o marque 'No'");
    return;
  }
  
  const fuma = obtenerFumaSeleccionado();
  
  const semestre = parseInt(document.getElementById("semestre").value);
  const areaCalculada = semestre <= 4 ? "Preclínica" : "Clínica";
  
  const epsValue = document.getElementById("epsInput") ? document.getElementById("epsInput").value.trim() : "";
  
  if (!epsValue) {
    mostrarErrorEn("historiaError", "Seleccione o especifique una EPS");
    return;
  }
  
  if (epsValue.length < 3) {
    mostrarErrorEn("historiaError", "El nombre de la EPS es demasiado corto");
    return;
  }
  
  if (epsCache && epsCache.length > 0 && !epsCache.some(eps => eps.toLowerCase() === epsValue.toLowerCase())) {
    const continuar = confirm(`"${epsValue}" no está en la lista de EPS conocidas. ¿Desea usar este valor de todas formas?`);
    if (!continuar) return;
  }
  
  const datos = {
    nombre: pacienteActual.nombre,
    apellidos: pacienteActual.apellidos,
    cedula: pacienteActual.cedula,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    contacto: document.getElementById("contacto").value,
    eps: epsValue,
    sexo: document.getElementById("sexo").value,
    semestre: semestre,
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
  
  const faltantes = camposRequeridos.filter(campo => !datos[campo]);
  if (faltantes.length > 0) {
    mostrarErrorEn("historiaError", "Complete todos los campos requeridos");
    return;
  }
  
  if (!fuma) {
    mostrarErrorEn("historiaError", "Seleccione una opción sobre consumo de cigarrillo/vape");
    return;
  }

  mostrarCarga('Guardando historia clínica...');
  
  try {
    await llamarAPI('guardarHistoriaCompleta', datos, false);
    ocultarCarga();
    mostrar("registroExitoso");
  } catch (error) {
    ocultarCarga();
    mostrarErrorEn("historiaError", error.message);
  }
}

// ========= ENCUESTA =========
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
    const resultados = await llamarAPIMultiple([
      { action: 'cedulaExiste', data: { cedula: ced } },
      { action: 'encuestaYaExiste', data: { cedula: ced } },
      { action: 'verificarConsentimientoFirmado', data: { cedula: ced, tipo: 1 } },
      { action: 'verificarConsentimientoFirmado', data: { cedula: ced, tipo: 2 } }
    ]);
    
    const existeHistoria = resultados[0];
    const existeEncuesta = resultados[1];
    const cons1Firmado = resultados[2];
    const cons2Firmado = resultados[3];
    
    if (!existeHistoria) {
      mostrarErrorEn("encuestaCedulaError", "Debe registrar primero la historia clínica");
      return;
    }
    
    if (!cons1Firmado) {
      mostrarErrorEn("encuestaCedulaError", "Debe tener el Consentimiento 1 Recolección de datos firmado");
      return;
    }
    
    if (!cons2Firmado) {
      mostrarErrorEn("encuestaCedulaError", "Debe tener el Consentimiento 2 Registro fotográfico firmado");
      return;
    }
    
    if (existeEncuesta) {
      mostrarErrorEn("encuestaCedulaError", "Este paciente ya completó la encuesta anteriormente");
      return;
    }
    
    const paciente = await llamarAPI('obtenerDatosPaciente', { cedula: ced });
    pacienteActual = paciente;
    document.getElementById("nombrePacienteEncuesta").innerHTML = `${paciente.nombre} ${paciente.apellidos}`;
    document.getElementById("cedulaPacienteEncuesta").innerHTML = ced;
    iniciarEncuesta();
  } catch (error) {
    mostrarErrorEn("encuestaCedulaError", error.message);
  }
}

async function iniciarEncuesta() {
  if (preguntasCache) {
    mostrarPreguntas(preguntasCache);
  } else {
    try {
      preguntasCache = await llamarAPI('obtenerPreguntas');
      mostrarPreguntas(preguntasCache);
    } catch (error) {
      mostrarErrorEn("mensajeErrorPreguntas", "Error al cargar preguntas: " + error.message);
    }
  }
}

function mostrarPreguntas(preguntas) {
  const cont = document.getElementById("contenedorPreguntas");
  cont.innerHTML = "";
  preguntas.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "pregunta";
    let html = `<b>${i + 1}. ${p}</b>`;
    html += `<div class="opciones">`;
    for (let j = 0; j <= 3; j++) {
      html += `<label><input type="radio" name="p${i}" value="${j}" required> <span>${j}</span></label>`;
    }
    html += `</div>`;
    div.innerHTML = html;
    cont.appendChild(div);
  });
  mostrar("encuesta");
}

async function finalizarEncuesta() {
  const respuestas = [];
  const preguntas = document.querySelectorAll(".pregunta");
  const preguntasFaltantes = [];

  for (let i = 0; i < preguntas.length; i++) {
    const r = document.querySelector(`input[name="p${i}"]:checked`);
    if (!r) {
      preguntasFaltantes.push(i + 1);
    } else {
      respuestas.push(r.value);
    }
  }

  const mensajeDiv = document.getElementById("mensajeErrorPreguntas");
  if (preguntasFaltantes.length > 0) {
    if (preguntasFaltantes.length === 1) {
      mensajeDiv.innerHTML = `Falta la pregunta ${preguntasFaltantes[0]}`;
    } else {
      const ultima = preguntasFaltantes.pop();
      mensajeDiv.innerHTML = `Faltan las preguntas ${preguntasFaltantes.join(', ')} y ${ultima}`;
    }
    mensajeDiv.style.display = "block";
    mensajeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  mensajeDiv.style.display = "none";
  const cedula = pacienteActual.cedula;

  mostrarCarga('Guardando respuestas de la encuesta...');
  
  try {
    await llamarAPI('guardarEncuesta', { cedula: cedula, respuestas: respuestas }, false);
    ocultarCarga();
    mostrar("encuestaExitosa");
  } catch (error) {
    ocultarCarga();
    mostrarErrorEn("mensajeErrorPreguntas", error.message);
  }
}

// ========= VERIFICAR BACKEND AL INICIO =========
async function verificarBackend() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    console.log('Backend conectado:', data);
  } catch (error) {
    console.error('Error conectando al backend:', error);
    mostrarError('No se pudo conectar al servidor. Por favor, recargue la página.');
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', verificarBackend);
