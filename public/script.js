// ========= CONFIGURACIÓN GLOBAL =========
let pacienteActual = null;
let preguntasCache = null;
let signaturePad = null;
let tipoConsentimientoActual = null;
let epsCache = null;
let datosPacienteConsentimiento = null;

// Textos de consentimientos (versión HTML para mostrar en pantalla)
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

En constancia de lo anterior, se firma el presente consentimiento informado.

______________________________________________________
Firma del participante

Nombre: ______________________  Cédula: ______________________  Fecha: ______________________

Firma de los investigadores:

Diana Carolina Cortés (20572211983) - Estudiante de odontología
Luisa María Sandoval (20572212013) - Estudiante de odontología
Christopher Vargas (20572211040) - Estudiante de odontología
Alejandra Bobadilla Henao - Docente de odontología - Asesora científica`,

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

En constancia de lo anterior, se firma el presente consentimiento informado.

______________________________________________________
Firma del participante

Nombre: ______________________  Cédula: ______________________  Fecha: ______________________

Firma de los investigadores:

Diana Carolina Cortés (20572211983) - Estudiante de odontología
Luisa María Sandoval (20572212013) - Estudiante de odontología
Christopher Vargas (20572211040) - Estudiante de odontología
Alejandra Bobadilla Henao - Docente de odontología - Asesora científica`
};

// ========= FUNCIONES DE COMUNICACIÓN CON EL BACKEND =========
async function llamarAPI(action, data = {}) {
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
  // Limpiar formulario de historia
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
  const radios = document.getElementsByName("fumaOpcion");
  for (let i = 0; i < radios.length; i++) radios[i].checked = false;
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
  texto = texto.replace(/Nombre: ______________________/g, "");
  texto = texto.replace(/Cédula: ______________________/g, "");
  texto = texto.replace(/Fecha: ______________________/g, "");
  texto = texto.replace(/\nFirma del participante/, `\n\nNombre: ${nombreCompleto}\nCédula: ${cedula}\nFecha: ${fechaActual}\n\nFirma del participante`);
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
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
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
  
  const firmaDataURL = signaturePad.toDataURL();
  const cedula = document.getElementById("cedulaPacienteConsentimiento").innerHTML;
  
  const btn = document.getElementById("btnGuardarConsentimiento");
  const textoOriginal = btn.innerText;
  btn.innerText = "Guardando...";
  btn.disabled = true;
  
  try {
    await llamarAPI('guardarConsentimientoConImagen', { 
      cedula: cedula,
      nombre: datosPacienteConsentimiento.nombre,
      apellidos: datosPacienteConsentimiento.apellidos,
      tipo: tipoConsentimientoActual,
      firmaDataURL: firmaDataURL
    });
    
    mostrar("consentimientoExitoso");
  } catch (error) {
    mostrarErrorEn("consentimientoError", error.message);
  } finally {
    btn.innerText = textoOriginal;
    btn.disabled = false;
  }
}

// ========= HISTORIA CLÍNICA =========
async function mostrarHistoria() {
  document.getElementById("historiaCedulaInput").value = "";
  document.getElementById("historiaCedulaError").style.display = "none";
  mostrar("cedulaHistoria");
  if (!epsCache) {
    try {
      epsCache = await llamarAPI('obtenerEPS');
      cargarEPS(epsCache);
    } catch (error) {
      console.error("Error cargando EPS:", error);
    }
  } else {
    cargarEPS(epsCache);
  }
}

function cargarEPS(lista) {
  const select = document.getElementById("eps");
  select.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.text = "-- Seleccione EPS --";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.add(defaultOption);
  if (lista && lista.length > 0) {
    lista.forEach(e => {
      if (e && e.toString().trim() !== "") {
        const o = document.createElement("option");
        o.text = e;
        o.value = e;
        select.add(o);
      }
    });
  }
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
  const enfermedades = document.getElementById("enfermedadesSistemicas");
  const medicamentos = document.getElementById("tomaMedicamentos");
  const psicologicos = document.getElementById("antecedentesPsicologicos");
  const sustancias = document.getElementById("sustanciasPsicoactivas");
  const checkNo = document.getElementById("habitoNo");
  const checkLabios = document.getElementById("habitoLabios");
  const checkMejillas = document.getElementById("habitoMejillas");
  const checkLengua = document.getElementById("habitoLengua");
  
  const toggleEnfermedad = () => {
    document.getElementById("campoTipoEnfermedad").style.display = enfermedades.value === "Sí" ? "block" : "none";
  };
  const toggleMedicamento = () => {
    document.getElementById("campoTipoMedicamento").style.display = medicamentos.value === "Sí" ? "block" : "none";
  };
  const togglePsicologico = () => {
    document.getElementById("campoTipoPsicologico").style.display = psicologicos.value === "Sí" ? "block" : "none";
  };
  const toggleSustancia = () => {
    document.getElementById("campoTipoSustancia").style.display = sustancias.value === "Sí" ? "block" : "none";
  };
  
  enfermedades.removeEventListener('change', toggleEnfermedad);
  medicamentos.removeEventListener('change', toggleMedicamento);
  psicologicos.removeEventListener('change', togglePsicologico);
  sustancias.removeEventListener('change', toggleSustancia);
  
  enfermedades.addEventListener('change', toggleEnfermedad);
  medicamentos.addEventListener('change', toggleMedicamento);
  psicologicos.addEventListener('change', togglePsicologico);
  sustancias.addEventListener('change', toggleSustancia);
  
  if (checkNo) {
    checkNo.onchange = function() {
      if (this.checked) {
        checkLabios.checked = false;
        checkMejillas.checked = false;
        checkLengua.checked = false;
      }
    };
  }
  [checkLabios, checkMejillas, checkLengua].forEach(chk => {
    if (chk) {
      chk.onchange = function() {
        if (this.checked && checkNo && checkNo.checked) {
          checkNo.checked = false;
        }
      };
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

// ========= GUARDAR HISTORIA CLÍNICA CON ÁREA AUTOMÁTICA =========
async function guardarHistoria() {
  const habitos = obtenerHabitosSeleccionados();
  const fuma = obtenerFumaSeleccionado();
  
  const semestre = parseInt(document.getElementById("semestre").value);
  const areaCalculada = semestre <= 4 ? "Preclínica" : "Clínica";
  
  const datos = {
    nombre: pacienteActual.nombre,
    apellidos: pacienteActual.apellidos,
    cedula: pacienteActual.cedula,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    contacto: document.getElementById("contacto").value,
    eps: document.getElementById("eps").value,
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
    mostrar("registroExitoso");
  } catch (error) {
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

  try {
    await llamarAPI('guardarEncuesta', { cedula: cedula, respuestas: respuestas });
    mostrar("encuestaExitosa");
  } catch (error) {
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
