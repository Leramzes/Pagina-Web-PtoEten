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


//CONTROLADOR DE CLIMA
window.addEventListener('load', ()=> {
  let lon
  let lat

  let temperaturaValor = document.getElementById('temperatura-valor')  
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
  
  let ubicacion = document.getElementById('ubicacion')  
  let iconoAnimado = document.getElementById('icono-animado') 

  let vientoVelocidad = document.getElementById('viento-velocidad') 

  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition( posicion => {
         //console.log(posicion.coords.latitude)
         lon = posicion.coords.longitude
         lat = posicion.coords.latitude
          //ubicación actual    
         //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${AQUI_VIENE_TU_API_KEY}`

         //ubicación por ciudad
         const url = `https://api.openweathermap.org/data/2.5/weather?q=Puerto Etén&lang=es&units=metric&appid=d11fefe3a1f816785b1807b25903cdd9`

         //console.log(url)

         fetch(url)
          .then( response => { return response.json()})
          .then( async data => {
              //console.log(data)
              
              let temp = Math.round(data.main.temp)
              //console.log(temp)
              temperaturaValor.textContent = `${temp} ° C`

              //console.log(data.weather[0].description)
              let desc = data.weather[0].description
              temperaturaDescripcion.textContent = desc.toUpperCase()
              ubicacion.textContent = data.name
              
              vientoVelocidad.textContent = `${data.wind.speed} m/s`
              
              //para iconos estáticos
              //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`                     
              //icono.src = urlIcon
              //console.log(data.weather[0].icon)

              //para iconos dinámicos
              console.log(data.weather[0].main)

              //fecha actual
              var today = new Date();
              var now = today.toLocaleTimeString('en-US',{hour12: false});
              const horaAnochecer= '18:30:00';

              switch (data.weather[0].main) {
                  case 'Thunderstorm':
                    iconoAnimado.src='../animated/thunder.svg'
                    break;
                  case 'Drizzle':
                      now >=horaAnochecer ? iconoAnimado.src='../animated/rainy-5.svg' : iconoAnimado.src='../animated/rainy-2.svg';
                    break;
                  case 'Rain':
                      now >=horaAnochecer ? iconoAnimado.src='../animated/rainy-5.svg' : iconoAnimado.src='../animated/rainy-1.svg';
                    break;
                  case 'Snow':
                      now >=horaAnochecer ? iconoAnimado.src='../animated/snowy-5.svg' : iconoAnimado.src='../animated/snowy-1.svg';
                    break;                        
                  case 'Clear':
                      now >=horaAnochecer ? iconoAnimado.src='../animated/night.svg' : iconoAnimado.src='../animated/day.svg';
                    break;
                  case 'Atmosphere':
                      iconoAnimado.src='../animated/weather.svg'
                      break;  
                  case 'Clouds':
                      now >=horaAnochecer ? iconoAnimado.src='../animated/cloudy-night-1.svg' : iconoAnimado.src='../animated/cloudy-day-1.svg';
                      break;  
                  default:
                      iconoAnimado.src='../animated/cloudy-day-1.svg'
                }

          })
          .catch( error => {
              console.log(error)
          })
     })
        
  }
})

