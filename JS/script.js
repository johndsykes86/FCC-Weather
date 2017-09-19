if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(function(position){
    const { latitude } = position.coords
    const { longitude } = position.coords
    // const url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`

    var myHeaders = new Headers()
    var myInit = {method: 'GET',
                  headers: myHeaders,
                  mode: 'cors',
                  credentials: 'include'}

    fetch(url)
     .then(res => res.json())
       .then((data)=>{
         console.log(data)
       }).catch(err=>console.log(error))


  })
} else {
  console.log("Geolocation failed")
}
