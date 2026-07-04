const reglasEncriptacion = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const elementos = {
  entrada: document.getElementById("texto-ingresado"),
  salida: document.getElementById("texto-resultado"),
  contador: document.getElementById("contador-caracteres"),
  estado: document.getElementById("estado-aplicacion"),
  estadoVacio: document.getElementById("estado-vacio"),
  estadoResultado: document.getElementById("estado-resultado"),
  etiquetaResultado: document.getElementById("etiqueta-resultado"),
  botonEncriptar: document.getElementById("boton-encriptar"),
  botonDesencriptar: document.getElementById("boton-desencriptar"),
  botonCopiar: document.getElementById("boton-copiar"),
};

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z\s]/g, "");
}

function actualizarContador() {
  const total = elementos.entrada.value.length;
  elementos.contador.textContent = `${total} ${total === 1 ? "caracter" : "caracteres"}`;
}

function mostrarEstado(mensaje, tipo = "info") {
  elementos.estado.textContent = mensaje;
  elementos.estado.dataset.status = tipo;
}

function mostrarPanelVacio() {
  elementos.estadoVacio.classList.remove("is-hidden");
  elementos.estadoResultado.classList.add("is-hidden");
  elementos.salida.value = "";
  restaurarBotonCopiar();
}

function mostrarResultado(texto, etiqueta) {
  elementos.salida.value = texto;
  elementos.etiquetaResultado.textContent = etiqueta;
  elementos.estadoVacio.classList.add("is-hidden");
  elementos.estadoResultado.classList.remove("is-hidden");
  elementos.botonCopiar.disabled = false;

  if (window.matchMedia("(max-width: 920px)").matches) {
    elementos.estadoResultado.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function encriptar(texto) {
  return texto.replace(/[aeiou]/g, (letra) => reglasEncriptacion[letra]);
}

function desencriptar(texto) {
  const reglasDesencriptacion = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  return texto.replace(/enter|imes|ai|ober|ufat/g, (codigo) => {
    return reglasDesencriptacion[codigo];
  });
}

function procesarTexto(transformar, etiqueta, mensajeExito) {
  const textoIngresado = elementos.entrada.value;

  if (textoIngresado.trim() === "") {
    mostrarPanelVacio();
    mostrarEstado("Ingresa un mensaje oculto antes de procesarlo.", "warning");
    elementos.entrada.focus();
    return;
  }

  mostrarResultado(transformar(textoIngresado), etiqueta);
  mostrarEstado(mensajeExito, "success");
}

function actualizarEntrada(evento) {
  const valorActual = evento.target.value;
  const valorNormalizado = normalizarTexto(valorActual);

  if (valorActual !== valorNormalizado) {
    evento.target.value = valorNormalizado;
    mostrarEstado("Entrada protegida y ajustada a minúsculas sin acentos.", "warning");
  } else if (valorNormalizado.trim() === "") {
    mostrarEstado("Procesa el mensaje para revelar su versión transformada.", "info");
  }

  actualizarContador();
}

function restaurarBotonCopiar() {
  const icono = elementos.botonCopiar.querySelector("i");
  const texto = elementos.botonCopiar.querySelector("span");

  icono.className = "fa-solid fa-copy";
  texto.textContent = "Copiar";
  elementos.botonCopiar.disabled = elementos.salida.value.trim() === "";
}

function marcarTextoCopiado() {
  const icono = elementos.botonCopiar.querySelector("i");
  const texto = elementos.botonCopiar.querySelector("span");

  icono.className = "fa-solid fa-check";
  texto.textContent = "Copiado";
  elementos.botonCopiar.disabled = true;
  mostrarEstado("Resultado copiado al portapapeles.", "success");

  window.setTimeout(restaurarBotonCopiar, 1800);
}

async function copiarAlPortapapeles(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(texto);
    return;
  }

  elementos.salida.focus();
  elementos.salida.select();

  const copiado = document.execCommand("copy");
  elementos.salida.setSelectionRange(
    elementos.salida.value.length,
    elementos.salida.value.length
  );

  if (!copiado) {
    throw new Error("El navegador no permitió copiar el texto.");
  }
}

async function copiarResultado() {
  const textoResultado = elementos.salida.value.trim();

  if (textoResultado === "") {
    mostrarEstado("No hay texto para copiar.", "warning");
    return;
  }

  try {
    await copiarAlPortapapeles(elementos.salida.value);
    marcarTextoCopiado();
  } catch (error) {
    mostrarEstado("No se pudo copiar automáticamente.", "warning");
    console.error(error);
  }
}

function iniciarAplicacion() {
  elementos.entrada.addEventListener("input", actualizarEntrada);
  elementos.botonEncriptar.addEventListener("click", () => {
    procesarTexto(encriptar, "Encriptado", "Mensaje oculto encriptado correctamente.");
  });
  elementos.botonDesencriptar.addEventListener("click", () => {
    procesarTexto(
      desencriptar,
      "Desencriptado",
      "Mensaje revelado mediante desencriptado."
    );
  });
  elementos.botonCopiar.addEventListener("click", copiarResultado);

  actualizarContador();
  mostrarPanelVacio();
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);
