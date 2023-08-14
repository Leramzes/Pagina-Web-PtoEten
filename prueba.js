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
                      iconoAnimado.src='animated/thunder.svg'
                      break;
                    case 'Drizzle':
                        now >=horaAnochecer ? iconoAnimado.src='animated/rainy-5.svg' : iconoAnimado.src='animated/rainy-2.svg';
                      break;
                    case 'Rain':
                        now >=horaAnochecer ? iconoAnimado.src='animated/rainy-5.svg' : iconoAnimado.src='animated/rainy-1.svg';
                      break;
                    case 'Snow':
                        now >=horaAnochecer ? iconoAnimado.src='animated/snowy-5.svg' : iconoAnimado.src='animated/snowy-1.svg';
                      break;                        
                    case 'Clear':
                        now >=horaAnochecer ? iconoAnimado.src='animated/night.svg' : iconoAnimado.src='animated/day.svg';
                      break;
                    case 'Atmosphere':
                        iconoAnimado.src='animated/weather.svg'
                        break;  
                    case 'Clouds':
                        now >=horaAnochecer ? iconoAnimado.src='animated/cloudy-night-1.svg' : iconoAnimado.src='animated/cloudy-day-1.svg';
                        break;  
                    default:
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                  }

            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})
