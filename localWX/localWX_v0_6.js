//Test JS


$(document).ready(function() {

	//global vars: 
	var apiLink = "http://api.openweathermap.org/data/2.5/";
	var wxCurrent = "weather?";
	var units = "&units=imperial";
	var appID = "&APPID=";
	var appKey = "352afd8b09d3e8ae4f302e77b866532f";

	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(pos){
		  var lat = pos.coords.latitude.toFixed(4);
		  var lon = pos.coords.longitude.toFixed(4);
		  var latLong = "lat=" + lat + "&lon=" + lon;
		  var joinedCurrent = apiLink + wxCurrent + latLong + units + appID + appKey;
		  $.getJSON(joinedCurrent, function(current){
				$("#citycountry").html(current.name + ", " + current.sys.country);
				$("#wxMain").html(current.weather[0].main);
				var iconLink = "http://openweathermap.org/img/w/" + current.weather[0].icon + ".png"; //icon image link
				document.getElementById("wxIcon").src = iconLink; //img src= replace
				$("#temp").html("Temperature: " + current.main.temp.toFixed(1) + "°F");
				$("#humid").html("Humidity: " + current.main.humidity + "%");
				$("#windSp").html("Windspeed: " + current.wind.speed + " mph");
				$("#windDir").html("Wind Direction: " + current.wind.deg.toFixed(0) + "°");
					var risedate = new Date(current.sys.sunrise*1000);
					var risehours = risedate.getHours();
					var riseminutes = risedate.getMinutes();
				  $("#sunrise").html("Sunrise: " + risehours + ":" + riseminutes);
					var setdate = new Date(current.sys.sunset*1000);
					var sethours = setdate.getHours();
					var setminutes = setdate.getMinutes();
				  $("#sunset").html("Sunset: " + sethours + ":" + setminutes);
			  });
		  //back to imperial if needed, only temp and windspeed
		  $("#impButton").on("click", function() {
			  units = "&units=imperial";
			  joinedCurrent = apiLink + wxCurrent + latLong + units + appID + appKey;
			  $.getJSON(joinedCurrent, function(current){
				$("#temp").html("Temperature: " + current.main.temp.toFixed(1) + "°F");
				$("#windSp").html("Windspeed: " + current.wind.speed + " mi/h");
			  });
		  });
		  // To Metric Units: NOTE: only swapping temp and windspeed, since 
		  $("#metButton").on("click", function() {
			  units = "&units=metric";
			  joinedCurrent = apiLink + wxCurrent + latLong + units + appID + appKey;
			  $.getJSON(joinedCurrent, function(current){
				$("#temp").html("Temperature: " + current.main.temp.toFixed(1) + "°C");
				$("#windSp").html("Windspeed: " + current.wind.speed + " m/s");
			  });
		  });
		  });
		  
	  }
	//toggle units button:

	//start with imperial/ JIC
	$("#impButton").trigger("click");
})


/* NOTES:
Time stamp mulitplied by 1000, since JS uses miliseconds
*/
