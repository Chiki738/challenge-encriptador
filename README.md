# Chiki Cipher | Encriptador de texto

Aplicación web para encriptar y desencriptar mensajes usando las reglas del
Challenge Encriptador de Alura. El proyecto está construido con HTML, CSS y
JavaScript puro, con una interfaz personalizada para verse bien como pieza de
portafolio y repositorio público.

[Ver demo](https://challenge-encriptador-eosin.vercel.app/) ·
[Portafolio](https://portafolio-react-vite.vercel.app/) ·
[LinkedIn](https://www.linkedin.com/in/chiki738/)

## Vista general

Chiki Cipher transforma texto en una versión cifrada y permite restaurarlo al
mensaje original. La experiencia está pensada para ser directa: se limpia la
entrada en tiempo real, se muestra feedback visual sin alertas invasivas y el
resultado se puede copiar al portapapeles. La entrada trabaja en modo protegido
por defecto para que el mensaje original no quede expuesto visualmente mientras
se escribe.

## Funcionamiento

La aplicación trabaja con letras minúsculas, espacios y texto sin acentos. El
mensaje se mantiene oculto durante la escritura y la transformación solo se
muestra después de usar los botones de encriptar o desencriptar.

## Características

- Interfaz responsive para escritorio, tablet y móvil.
- Textos y estados visuales orientados a una experiencia más profesional.
- Entrada protegida: el mensaje se oculta mientras se escribe.
- Validación de entrada en tiempo real.
- Copiado al portapapeles con fallback para navegadores sin Clipboard API.
- CSS organizado con variables reutilizables, estados y componentes claros.
- JavaScript modularizado en funciones pequeñas y legibles.

## Estructura del proyecto

```text
challenge-encriptador/
├── img/
│   ├── icon.svg
│   └── imagen.jpg
├── index.html
├── logica.js
├── style.css
└── README.md
```

## Tecnologías

- HTML5 semántico
- CSS3 responsive
- JavaScript
- Font Awesome
- Google Fonts

## Ejecutar localmente

No requiere instalación de dependencias. Abre `index.html` en el navegador o
sirve la carpeta con cualquier servidor estático.

```bash
npx serve .
```

## Autor

Desarrollado por **Carlos Alzamora (@Chiki)** como una versión personalizada
del Challenge Encriptador de Alura.
