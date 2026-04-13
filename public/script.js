// ========= CONFIGURACIÓN GLOBAL =========
let pacienteActual = null;
let preguntasCache = null;
let signaturePad = null;
let tipoConsentimientoActual = null;
let epsCache = null;

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

En constancia de lo anterior, se firma el presente consentimiento informado.

______________________________________________________
Firma del participante

Nombre: ______________________  Cédula: ______________________  Fecha: ______________________

Firma de los investigadores:

Diana Carolina Cortés (20572211983) - Estudiante de odontología
Luisa María Sandoval (20572212013) - Estudiante de odontología
Christopher Vargas (20572211040) - Estudiante de odontología
Alejandra Bobadilla Henao - Docente de odontología - Asesora científica`,

  2: `CONSENTIMIENTO INFORMADO PARA REGISTRO FOTOGRÁFICO

Título del proyecto: Relación entre factores emocionales y hábitos parafuncionales en estudiantes de odontología de la Universidad Antonio Nariño, Sede Neiva.

Yo, ________________________________________________, identificado(a) con cédula de ciudadanía ______________________, en pleno uso de mis facultades, autorizo de manera voluntaria la toma de registros fotográficos intraorales como parte del estudio de investigación "Relación entre factores emocionales y hábitos parafuncionales en estudiantes de odontología".

1. PROPÓSITO DE LAS FOTOGRAFÍAS
He sido informado(a) que las imágenes serán utilizadas para fines de análisis clínico, documentación del caso y verificación de hallazgos relacionados con hábitos parafuncionales orales.

2. PROCEDIMIENTO
Entiendo que la toma de fotografías será realizada por personal capacitado, utilizando equipos adecuados, y no representa ningún riesgo adicional para mi salud.

3. CONFIDENCIALIDAD
Se me ha garantizado que las imágenes serán tratadas con estricta confidencialidad y almacenadas de forma segura. Mi identidad no será revelada en ninguna publicación o presentación, a menos que otorgue una autorización específica por escrito.

4. USO DE LAS IMÁGENES
Autorizo que los registros fotográficos puedan ser utilizados en análisis clínico, presentaciones académicas o científicas y publicaciones derivadas de la investigación.

5. PARTICIPACIÓN VOLUNTARIA Y RETIRO
Comprendo que mi participación es totalmente voluntaria y que puedo retirar mi autorización en cualquier momento, sin que esto genere ningún tipo de perjuicio.

6. ACLARACIÓN DE DUDAS
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

function volverMenu() {
  limpiarFormularioHistoria();
  limpiarEncuesta();
  pacienteActual = null;
  preguntasCache = null;
  tipoConsentimientoActual = null;
  if (signaturePad) signaturePad.clear();
  document.querySelectorAll(".pantalla").forEach(p => p.style.display = "none");
  document.getElementById("menu").style.display = "flex";
}

// ========= FUNCIONES DE CAMPOS CONDICIONALES =========
function configurarCamposCondicionales() {
  const enfermedades = document.getElementById("enfermedadesSistemicas");
  const medicamentos = document.getElementById("tomaMedicamentos");
  const psicologicos = document.getElementById("antecedentesPsicologicos");
  const sustancias = document.getElementById("sustanciasPsicoactivas");
  const checkNo = document.getElementById("habitoNo");
  const checkLabios = document.getElementById("habitoLabios");
  const checkMejillas = document.getElementById("habitoMejillas");
  const checkLengua = document.getElementById("habitoLengua");
  
  if (enfermedades) {
    enfermedades.addEventListener("change", function() {
      document.getElementById("campoTipoEnfermedad").style.display = this.value === "Sí" ? "block" : "none";
    });
  }
  if (medicamentos) {
    medicamentos.addEventListener("change", function() {
      document.getElementById("campoTipoMedicamento").style.display = this.value === "Sí" ? "block" : "none";
    });
  }
  if (psicologicos) {
    psicologicos.addEventListener("change", function() {
      document.getElementById("campoTipoPsicologico").style.display = this.value === "Sí" ? "block" : "none";
    });
  }
  if (sustancias) {
    sustancias.addEventListener("change", function() {
      document.getElementById("campoTipoSustancia").style.display = this.value === "Sí" ? "block" : "none";
    });
  }
  if (checkNo) {
    checkNo.addEventListener("change", function() {
      if (this.checked) {
        checkLabios.checked = false;
        checkMejillas.checked = false;
        checkLengua.checked = false;
      }
    });
  }
  const otrosHabitos = [checkLabios, checkMejillas, checkLengua];
  otrosHabitos.forEach(chk => {
    if (chk) {
      chk.addEventListener("change", function() {
        if (this.checked && checkNo && checkNo.checked) {
          checkNo.checked = false;
        }
      });
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

// ========= HISTORIA CLÍNICA =========
async function mostrarHistoria() {
  mostrar("historia");
  if (!epsCache) {
    try {
      epsCache = await llamarAPI('obtenerEPS');
      cargarEPS(epsCache);
    } catch (error) {
      console.error("Error cargando EPS:", error);
      alert("Error al cargar las EPS. Verifique la conexión.");
    }
  } else {
    cargarEPS(epsCache);
  }
  setTimeout(configurarCamposCondicionales, 100);
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

function limpiarFormularioHistoria() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("cedula").value = "";
  document.getElementById("fecha").value = "";
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
  document.getElementById("campoTipoEnfermedad").style.display = "none";
  document.getElementById("campoTipoMedicamento").style.display = "none";
  document.getElementById("campoTipoPsicologico").style.display = "none";
  document.getElementById("campoTipoSustancia").style.display = "none";
}

async function guardarHistoria() {
  const habitos = obtenerHabitosSeleccionados();
  const fuma = obtenerFumaSeleccionado();
  
  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    apellidos: document.getElementById("apellidos").value.trim(),
    cedula: document.getElementById("cedula").value,
    fecha: document.getElementById("fecha").value,
    contacto: document.getElementById("contacto").value,
    eps: document.getElementById("eps").value,
    sexo: document.getElementById("sexo").value,
    semestre: document.getElementById("semestre").value,
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

  if (!datos.nombre || !datos.apellidos || !datos.cedula || !datos.fecha || 
      !datos.contacto || !datos.eps || !datos.sexo || !datos.semestre || 
      !datos.enfermedadesSistemicas || !datos.tomaMedicamentos || 
      !datos.antecedentesPsicologicos || datos.habitosOrales.length === 0 ||
      !datos.sustanciasPsicoactivas || !datos.fumaCigarrilloVape) {
    alert("Complete todos los campos");
    return;
  }

  try {
    const existe = await llamarAPI('cedulaExiste', { cedula: datos.cedula });
    if (existe) {
      mostrar("cedulaDuplicadaHistoria");
    } else {
      await llamarAPI('guardarHistoria', datos);
      mostrar("registroExitoso");
    }
  } catch (error) {
    alert("Error al guardar: " + error.message);
  }
}

// ========= ENCUESTA =========
function mostrarCedulaEncuesta() {
  document.getElementById("cedulaEncuestaInput").value = "";
  mostrar("cedulaEncuesta");
}

function limpiarEncuesta() {
  document.getElementById("cedulaEncuestaInput").value = "";
  document.getElementById("contenedorPreguntas").innerHTML = "";
  document.getElementById("nombrePaciente").innerHTML = "";
  document.getElementById("mensajeErrorPreguntas").style.display = "none";
}

async function validarCedulaEncuesta() {
  const ced = document.getElementById("cedulaEncuestaInput").value;
  if (!ced) {
    alert("Ingrese un número de cédula");
    return;
  }

  try {
    const resultados = await llamarAPIMultiple([
      { action: 'cedulaExiste', data: { cedula: ced } },
      { action: 'encuestaYaExiste', data: { cedula: ced } }
    ]);
    
    const existeHistoria = resultados[0];
    const existeEncuesta = resultados[1];
    
    if (!existeHistoria) {
      mostrar("sinHistoria");
    } else if (existeEncuesta) {
      mostrar("encuestaDuplicada");
    } else {
      const paciente = await llamarAPI('obtenerDatosPaciente', { cedula: ced });
      pacienteActual = paciente;
      document.getElementById("nombrePaciente").innerHTML = `${paciente.nombre} ${paciente.apellidos}`;
      iniciarEncuesta();
    }
  } catch (error) {
    alert("Error al validar: " + error.message);
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
      alert("Error al cargar preguntas: " + error.message);
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
  const cedula = document.getElementById("cedulaEncuestaInput").value;

  try {
    const resultado = await llamarAPI('guardarEncuesta', { cedula: cedula, respuestas: respuestas });
    if (resultado === "duplicado") {
      mostrar("encuestaDuplicada");
    } else {
      mostrar("encuestaExitosa");
    }
  } catch (error) {
    alert("Error al guardar encuesta: " + error.message);
  }
}

// ========= CONSENTIMIENTO =========
function mostrarConsentimiento(tipo) {
  tipoConsentimientoActual = tipo;
  document.getElementById("consentimientoTitulo").innerHTML = tipo === 1 ? "CONSENTIMIENTO 1 - ESTUDIO DE INVESTIGACIÓN" : "CONSENTIMIENTO 2 - REGISTRO FOTOGRÁFICO";
  document.getElementById("cedulaConsentimientoInput").value = "";
  mostrar("cedulaConsentimiento");
}

async function validarCedulaConsentimiento() {
  const ced = document.getElementById("cedulaConsentimientoInput").value;
  if (!ced) {
    alert("Ingrese un número de cédula");
    return;
  }

  try {
    const existeHistoria = await llamarAPI('cedulaExiste', { cedula: ced });
    
    if (!existeHistoria) {
      mostrar("sinHistoria");
    } else {
      const paciente = await llamarAPI('obtenerDatosPaciente', { cedula: ced });
      pacienteActual = paciente;
      cargarConsentimiento(paciente, ced);
    }
  } catch (error) {
    alert("Error al validar: " + error.message);
  }
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
  document.getElementById("consentimientoTituloDoc").innerHTML = tipoConsentimientoActual === 1 ? "CONSENTIMIENTO 1 - ESTUDIO DE INVESTIGACIÓN" : "CONSENTIMIENTO 2 - REGISTRO FOTOGRÁFICO";
  
  setTimeout(() => configurarSignaturePad(), 100);
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
    alert("Error con el área de firma");
    return;
  }
  
  if (signaturePad.isEmpty()) {
    alert("Por favor, firme en el área designada antes de continuar");
    return;
  }
  
  const firmaDataURL = signaturePad.toDataURL();
  const cedula = document.getElementById("cedulaPacienteConsentimiento").innerHTML;
  
  const btn = document.getElementById("btnGuardarConsentimiento");
  const textoOriginal = btn.innerText;
  btn.innerText = "Guardando...";
  btn.disabled = true;
  
  try {
    await llamarAPI('guardarConsentimiento', { 
      cedula: cedula, 
      tipo: tipoConsentimientoActual, 
      firmaDataURL: firmaDataURL 
    });
    
    alert("✅ Documento guardado correctamente\n\nLa firma ha sido registrada en la historia clínica.");
    mostrar("consentimientoExitoso");
  } catch (error) {
    alert("❌ Error al guardar: " + error.message);
  } finally {
    btn.innerText = textoOriginal;
    btn.disabled = false;
  }
}