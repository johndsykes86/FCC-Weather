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

        const weather = {
          icon: data.weather[0].icon,
          type: data.weather[0].main,
          temp: Math.round(data.main.temp),
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          description: data.weather[0].description,
          windSpeed: Math.round(data.wind.speed),
          visibility: Math.round(data.visibility / 5280)
        }

        //Adds data from API to weather and city-info sections

        $('.weather').append(`
                <h1 class="city-name">${city.name}</h1>
                <div class="info">
                  <div class="info-item"><h3>${weather.temp}&deg;C</h3></div>
                  <div class="info-item"><h3><img src=${weather.icon} alt=${weather.description}/>${weather.type}</h3></div>
                  <div class="info-item"><h3>🔺 ${weather.high}&deg;C</h3></div>
                  <div class="info-item"><h3>🔻 ${weather.low}&deg;C</h3></div>
                </div>
             `)

        $('.weather-info').append(`
              <div class = "city-info">
                <h2 class='city-info-item'>🌄 ${city.sunrise}</h2>
                <h2 class='city-info-item'>🌇 ${city.sunset}</h2>
              <hr/>
                <h2 class='city-info-item'>💨 ${weather.windSpeed} mph</h2>
                <h2 class='city-info-item'>👀 ${weather.visibility} mi</h2>
              </div>
             `)

        //

      }).catch(err => console.log(error))

    })
  } else {
    console.log("Geolocation failed")
  }

  //document.ready closing tags
})
