//JS: jQuery loaded


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude.toFixed(2);
      var lon = position.coords.longitude.toFixed(2);
      var apiLink = "http://api.openweathermap.org/data/2.5/";
      var wxCurrent = "weather?";
      var wxForecast = "forecast?";
      var latLong = "lat=" + lat + "&lon=" + lon;
      var units = "&units=imperial";
      var appID = "&APPID=";
      var appKey = "352afd8b09d3e8ae4f302e77b866532f";
      var joinedCurrent = apiLink + wxCurrent + latLong + units + appID + appKey;
      var joinedForecast = apiLink + wxForecast + latLong + units + appID + appKey;
      $.getJSON(joinedCurrent, function(current){
        $("#city").html("City: " + current.name);
        $("#country").html("Country: " + current.sys.country);
        $("#wxMain").html("Main: " + current.weather[0].main);
        var iconLink = "http://openweathermap.org/img/w/" + current.weather[0].icon + ".png"; //icon image link
        document.getElementById("wxIc").src = iconLink; //img src= replace
        $("#temp").html("Temperature: " + current.main.temp.toFixed(1) + "°F");
        $("#humid").html("Humidity: " + current.main.humidity + "%");
        $("#windSp").html("Windspeed: " + current.wind.speed + " mph");
        $("#windDir").html("Wind Direction: " + current.wind.deg.toFixed(0) + "°");
        $("#forLink").html(joinedForecast);
      });
  })
}
