// Función para ajustar la visibilidad de los contenedores según el tamaño de la pantalla
function ajustarVisibilidadContenedores() {
  const anchoPantalla = window.innerWidth;
  const divContainerResultado = document.querySelector(
    ".div-container-resultado"
  );
  const divContainerResultadoResponsive = document.getElementById(
    "div-container-resultado-responsive"
  );

  if (anchoPantalla >= 769) {
    divContainerResultado.style.display = "flex";
    divContainerResultadoResponsive.style.display = "none";
  } else {
    divContainerResultado.style.display = "none";
    divContainerResultadoResponsive.style.display = "flex";
  }
}

// Añadir un event listener para que se ejecute la función cuando se cambie el tamaño de la ventana
window.addEventListener("resize", ajustarVisibilidadContenedores);

// Ejecutar la función una vez al cargar la página para ajustar los estilos inicialmente
ajustarVisibilidadContenedores();

// Función para validar y limpiar el texto del textarea
function validarTexto() {
  const textarea = document.getElementById("texto-ingresado");

  textarea.addEventListener("input", function (event) {
    let texto = event.target.value;
    texto = texto.toLowerCase(); // Convertir a minúsculas
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
    texto = texto.replace(/[^a-z\s]/g, ""); // Eliminar todo excepto letras y espacios
    event.target.value = texto;
  });
}

// Ejecutar la función de validación de texto al cargar la página
validarTexto();

// Función para verificar si el textarea está vacío
function verificarCampoVacio() {
  const textarea = document.getElementById("texto-ingresado");
  return textarea.value.trim() === "";
}

// Función auxiliar para manejar el resultado de encriptar/desencriptar
function manejarResultado(textoIngresado, encriptarOdesencriptar) {
  const textoVacio = verificarCampoVacio();
  const imagenTexto = document.getElementById("imagen-texto");
  const containerResultado = document.querySelector(".container-resultado");
  const textoResultado = document.getElementById("texto-resultado");
  const textoResultadoResponsive = document.getElementById(
    "texto-resultado-responsive"
  );
  const textoResponsive =
    document.getElementsByClassName("texto-responsive")[0];
  const containerResultadoResponsive = document.getElementsByClassName(
    "container-resultado-responsive"
  )[0];
  const divContainerResultadoResponsive = document.getElementById(
    "div-container-resultado-responsive"
  );

  if (textoVacio) {
    imagenTexto.style.display = "flex"; // Mostrar imagen cuando el campo está vacío
    containerResultado.style.display = "none"; // Ocultar el resultado cuando el campo está vacío
    textoResponsive.style.display = "block";
    containerResultadoResponsive.style.display = "none";
    divContainerResultadoResponsive.style.height = "15vh";
    // Usar setTimeout para mostrar la alerta después de cambiar los estilos
    setTimeout(() => {
      alert("Campo vacío. Ingresar texto a encriptar/desencriptar");
    }, 0); // Ejecutar inmediatamente después de los cambios en la interfaz
  } else {
    imagenTexto.style.display = "none"; // Ocultar imagen cuando el campo no está vacío
    containerResultado.style.display = "flex"; // Mostrar el resultado cuando el campo no está vacío
    textoResponsive.style.display = "none";
    containerResultadoResponsive.style.display = "flex";
    divContainerResultadoResponsive.style.height = "70vh";
    textoResultado.value = encriptarOdesencriptar(textoIngresado); // Encriptar o desencriptar el texto y mostrarlo en el textarea
    textoResultadoResponsive.value = encriptarOdesencriptar(textoIngresado);

    // Desplazar la vista hasta el contenedor responsive si está visible
    divContainerResultadoResponsive.scrollIntoView({ behavior: "smooth" });
  }
}

// Función para manejar el clic en el botón de encriptar
function manejarEncriptar() {
  const textoIngresado = document.getElementById("texto-ingresado").value;
  manejarResultado(textoIngresado, encriptar);
}

// Función para manejar el clic en el botón de desencriptar
function manejarDesencriptar() {
  const textoIngresado = document.getElementById("texto-ingresado").value;
  manejarResultado(textoIngresado, desencriptar);
}

// Función para encriptar el texto
function encriptar(texto) {
  return texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

// Función para desencriptar el texto
function desencriptar(texto) {
  return texto
    .replace(/ufat/g, "u")
    .replace(/ober/g, "o")
    .replace(/ai/g, "a")
    .replace(/imes/g, "i")
    .replace(/enter/g, "e");
}

// Función general para copiar texto al portapapeles y actualizar el botón
function copiarTexto(textoId, botonId) {
  const textoElement = document.getElementById(textoId);
  const botonCopiar = document.getElementById(botonId);

  if (textoElement.value.trim() === "") {
    alert("No hay texto para copiar.");
    return;
  }

  // Copiar el texto al portapapeles
  navigator.clipboard
    .writeText(textoElement.value)
    .then(() => {
      // Cambiar el texto del botón a "Copiado" usando innerHTML
      botonCopiar.innerHTML = "<i class='fa-solid fa-check'></i>&nbsp;Copiado";
      botonCopiar.disabled = true; // Opcional: deshabilitar el botón temporalmente

      // Mostrar una alerta
      alert("Texto copiado");

      // Restaurar el botón después de 3 segundos
      setTimeout(() => {
        botonCopiar.innerHTML = "<i class='fa-solid fa-copy'></i>&nbsp;COPIAR";
        botonCopiar.disabled = false; // Opcional: habilitar el botón nuevamente
      }, 3000);
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
}

// Añadir event listeners a los botones de encriptar, desencriptar y copiar
document
  .getElementById("boton-encriptar")
  .addEventListener("click", manejarEncriptar);
document
  .getElementById("boton-desencriptar")
  .addEventListener("click", manejarDesencriptar);
document
  .getElementById("boton-copiar")
  .addEventListener("click", () =>
    copiarTexto("texto-resultado", "boton-copiar")
  );
document
  .getElementById("boton-copiar-responsive")
  .addEventListener("click", () =>
    copiarTexto("texto-resultado-responsive", "boton-copiar-responsive")
  );
