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
                <h1>${city.name}</h1>
                <h2>${weather.temp}&deg;C<br><span><img src=${weather.icon} alt=${weather.description}/>${weather.type}</span><br>
                <span>🔺 ${weather.high}&deg;C<br>🔻 ${weather.low}&deg;C</h2>
             `)

        $('.weather').append(`
                <h2><span>🌄 ${city.sunrise}<br>🌇 ${city.sunset}</span><br>
                <span>💨 ${weather.windSpeed} mph<br> 👀 ${weather.visibility} mi<h2>
             `)

        //

      }).catch(err => console.log(error))

    })
  } else {
    console.log("Geolocation failed")
  }

  //document.ready closing tags
})
