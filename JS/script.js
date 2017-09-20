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
          description: data.weather[0].description,
          windSpeed: data.wind.speed,
          visibility: Math.round(data.visibility/5280)
        }

        //Adds city and coordinates to city location section

        $('.city-info').append(`<p>
                <span>${city.name}</span><br>
                <span><img src=${weather.icon}/ alt="${weather.description}"></span><br>
                  <span>${weather.type}</span><br>
                    <span>${weather.windSpeed} mph</span><br>
                    <span>${weather.visibility} mi</span><br>

                <span>Sunrise - ${city.sunrise}</span><br>
                <span>Sunset - ${city.sunset}</span>
             </p>`)




        //

      }).catch(err => console.log(error))

    })
  } else {
    console.log("Geolocation failed")
  }

  //document.ready closing tags
})
