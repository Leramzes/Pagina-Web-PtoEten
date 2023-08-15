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
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
  
           //ubicación por ciudad
           const url = `https://api.openweathermap.org/data/2.5/weather?q=Puerto Etén&lang=es&units=metric&appid=d11fefe3a1f816785b1807b25903cdd9`
  
           //console.log(url)
  
           fetch(url)
            .then( response => { return response.json()})
            .then( async data => {
                
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`
  
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
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


  //CONTROLADOR DE NAVBAR DE TURISMO
    document.addEventListener('DOMContentLoaded', function () {
    // Mostrar el contenido de turismo por defecto al cargar la página
    const contenidoAlcalde = document.getElementById('contenido-turismo');
    contenidoAlcalde.style.display = 'block';
  
    // Oculta todos los contenidos excepto el de turismo
    const contenidos = document.querySelectorAll('.info');
    contenidos.forEach((contenido) => {
      if (contenido.id !== 'contenido-turismo') {
        contenido.style.display = 'none';
      }
    });
  
    // Escucha los clics en los enlaces y muestra el contenido correspondiente
    const enlaces = document.querySelectorAll('.navbarTurismo a');
    enlaces.forEach((enlace) => {
      enlace.addEventListener('click', (event) => {
        event.preventDefault(); // Evita la navegación a la URL del enlace
  
        // Oculta todos los contenidos
        const contenidos = document.querySelectorAll('.info');
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
  