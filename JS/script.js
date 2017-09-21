$(document).ready(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const {latitude} = position.coords
      const {longitude} = position.coords
      // const url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`
      const url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`

      var myHeaders = new Headers()
      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        credentials: 'include'
      }

      fetch(url).then(res => res.json()).then((data) => {
        console.log(data)

        const city = {
          name: data.name,
          lon: data.coord.lon,
          lat: data.coord.lat,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
        }

        var weather = {
          icon: data.weather[0].icon,
          type: data.weather[0].main,
          temp: `${Math.round(data.main.temp)}&deg;C`,
          high: `${Math.round(data.main.temp_max)}&deg;C`,
          low: `${Math.round(data.main.temp_min)}&deg;C`,
          description: data.weather[0].description,
          windSpeed: Math.round(data.wind.speed),
          visibility: Math.round(data.visibility / 5280)
        }

        //Adds data from API to weather and city-info sections

        $('.weather').append(`
              <div class="city-header">
                <h1 class="city-name">${city.name}</h1>
                <button class="unit-change C">Change Unit</button>
              </div>
                <div class="info">
                  <div class="info-item"><h3 class="current"><br>Currently:<br>${weather.temp}</h3></div>
                  <div class="info-item"><h3><img src=${weather.icon} alt=${weather.description}/><br>${weather.type}</h3></div>
                  <div class="info-item"><h3 class="high"><i class="fa fa-2x fa-thermometer-full" aria-hidden="true"></i><br><br>${weather.high}</h3></div>
                  <div class="info-item"><h3 class="low"><i class="fa fa-2x fa-thermometer-empty" aria-hidden="true"></i><br><br>${weather.low}</h3></div>
                  <div class="info-item"><h3><br><i class="fa fa-inverse fa-2x fa-sun-o" aria-hidden="true"/><br><br>${city.sunrise}</h3></div>
                  <div class="info-item"><h3><br><i class="fa fa-2x fa-sun-o" aria-hidden="true"/><br><br>${city.sunset}</h3></div>
                  <div class="info-item"><h3><br>Wind:<br> ${weather.windSpeed} mph</h3></div>
                  <div class="info-item"><h3><br>Visibility: <br>${weather.visibility} mph</h3></div>

                </div>
             `)

      $('.city-header button').on('click', function(){

        if ($(this).hasClass('C')){
          $('.current').html(`<br>Currently:<br>${Math.round(Math.round(data.main.temp)*1.8 + 32)}&deg;F`)
          $('.high').html(`<i class="fa fa-2x fa-thermometer-full" aria-hidden="true"/><br><br>${Math.round(Math.round(data.main.temp_max)*1.8 + 32)}&deg;F`)
          $('.low').html(`<i class="fa fa-2x fa-thermometer-empty" aria-hidden="true"/><br><br>${Math.round(Math.round(data.main.temp_max)*1.8 + 32)}&deg;F`)
          $(this).addClass('F').removeClass('C')
        } else if ($(this).hasClass('F')){
          $('.current').html(`<br>Currently:<br>${weather.temp}`)
          $('.high').html(`<i class="fa fa-2x fa-thermometer-full" aria-hidden="true"></i><br><br>${weather.high}`)
          $('.low').html(`<i class="fa fa-2x fa-thermometer-empty" aria-hidden="true"></i><br><br>${weather.low}`)
          $(this).addClass('C').removeClass('F')
        }
      })

      }).catch(err => console.log(error))

    })
  } else {
    console.log("Geolocation failed")
  }

  //document.ready closing tags
})
