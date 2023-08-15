function showSubmenu(element) {
    element.classList.add("active");

}

function hideSubmenu(element) {
    element.classList.remove("active");

}


//js swiper
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 40,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  //siempre el medio principal
  initialSlide: Math.floor(document.querySelectorAll(".mySwiper .swiper-slide").length / 2),
});



//CONTROLADOR DE NAVBAR DE AUTORIDADES
document.addEventListener('DOMContentLoaded', function () {
  // Mostrar el contenido del Alcalde por defecto al cargar la página
  const contenidoAlcalde = document.getElementById('contenido-alcalde');
  contenidoAlcalde.style.display = 'block';

  // Oculta todos los contenidos excepto el del Alcalde
  const contenidos = document.querySelectorAll('.contenido');
  contenidos.forEach((contenido) => {
    if (contenido.id !== 'contenido-alcalde') {
      contenido.style.display = 'none';
    }
  });

  // Escucha los clics en los enlaces y muestra el contenido correspondiente
  const enlaces = document.querySelectorAll('.folletoAutoridades a');
  enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (event) => {
      event.preventDefault(); // Evita la navegación a la URL del enlace

      // Oculta todos los contenidos
      const contenidos = document.querySelectorAll('.contenido');
      contenidos.forEach((contenido) => {
        contenido.style.display = 'none';
      });

      // Obtiene el identificador del contenido a mostrar
      const target = enlace.getAttribute('data-target');
      const contenidoAMostrar = document.getElementById(target);

      // Muestra el contenido correspondiente
      contenidoAMostrar.style.display = 'block';

      // Quita la clase "seleccionado" de todos los enlaces
      enlaces.forEach((enlace) => {
        enlace.classList.remove('seleccionado');
      });

      // Agrega la clase "seleccionado" al enlace seleccionado
      enlace.classList.add('seleccionado');

    });
  });
});




