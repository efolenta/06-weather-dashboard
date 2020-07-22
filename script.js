var cities = ["Los Angeles, US", "New York, US"];

function displayCityData() {

  var city = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=db190b755e9d701c024fe9333f9cab2c";
  var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=db190b755e9d701c024fe9333f9cab2c";
  var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=db190b755e9d701c024fe9333f9cab2c";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // console.log(queryURL);
    console.log(queryURL);
    console.log(response);

    var weatherDiv = $("#weather-column");
    
    // This prevents multiple cities from populating on one page.
    weatherDiv.empty();
    
    // City name
    var cityName = $("<h1>").text(response.name);
    weatherDiv.append(cityName);
    // Weather Icon
    var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
    weatherDiv.append(weatherIcon);
    // Wind Speed
    var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");
    weatherDiv.append(wind);
    // Humidity
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    weatherDiv.append(humidity);
    // Temperature converted into F
    var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
    var temp = $("<p>").html("Temperature: " + tempF + "&deg;F");
    weatherDiv.append(temp);
    
    $("#weather-column").prepend(weatherDiv);

  });
  
  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response2) {

    // console.log(queryURL);
    console.log(queryURL2);
    console.log(response2);

    var forecast = response2.list;

    for (var i = 0; i < 5; i++) {
        
        // Gathering all the weather data for each loop
        var forecastDate = $("<h3>").text(forecast[i].dt_txt);
        var forecastTempF = Math.floor((forecast[i].main.temp - 273.15) * 1.80 + 32);
        var forecastTemp = $("<p>").html("Temp: " + forecastTempF + "&deg;F");
        var forecastWind = $("<p>").text("Wind: " + forecast[i].wind.speed + "mph");
        var forecastHumidity = $("<p>").text("Humidity: " + forecast[i].main.humidity + "%");
        var forecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + forecast[i].weather[0].icon + "@2x.png");
        var forecastDiv = $("#forecast-container");
        var col = $("<div>").attr("style", `width:20%; display: block; float: left;`).addClass("forecast-col");

        // Creates a new column with a set size in the forecast container div
        forecastDiv.append(col);
        // Adding the rest of the newly generated elements into that column div
        col.append(forecastDate);
        col.append(forecastIcon);
        col.append(forecastTemp);
        col.append(forecastWind);
        col.append(forecastHumidity);
      

        // This prevents multiple cities from populating on one page.
        
    }
  });
}

// Shows and adds the city buttons
function renderCityBtns() {

  $("#cities-view").empty();

  for (var i = 0; i < cities.length; i++) {

    var cityBtn = $("<button>");
    cityBtn.addClass("city-btn");
    cityBtn.attr("data-name", cities[i]);
    cityBtn.text(cities[i]);
    $("#cities-view").append(cityBtn);
  }
}

$("#add-city").on("click", function(event) {
  event.preventDefault();
  var city = $("#city-input").val().trim();

  cities.push(city);

  renderCityBtns();
});

// Clears the forecast container after each city click
function clearForecast() {
    var col = $(".forecast-col");
    col.empty();
}

$(document).on("click", ".city-btn", displayCityData,);
$(document).on("click", ".city-btn", clearForecast,);

renderCityBtns();