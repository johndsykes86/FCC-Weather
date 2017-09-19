if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position)
  })
}
else {
  console.log("Geolocation failed")
}
