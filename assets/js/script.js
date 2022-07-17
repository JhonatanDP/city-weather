var cityFormEl = document.querySelector("#city-form");
var cityInputNameEl = document.querySelector("#city");
var buttonCitySearch = document.querySelector(".btn-search");
var cityName;
var cityGeolocation;
var latCity;
var lonCity;
var apiKey = config.MY_KEY;
var apiResquestKey = apiKey.trim("");
var cityDate; 
var currentIcon;
var currentTemp;
var currentWind;
var currentHumidity;
var currentUvIndex;
var iconUrl;
var apiResponse;
var fiveDayForecast = [{date:"",icon:"",temp:"",humidity:""},{date:"",icon:"",temp:"",humidity:""},{date:"",icon:"",temp:"",humidity:""},{date:"",icon:"",temp:"",humidity:""},{date:"",icon:"",temp:"",humidity:""}];


 var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    cityGeolocation = cityInputNameEl.value.trim();
    // console.log(cityGeolocation);
  
    if(cityGeolocation) {
        getCityGeo(cityGeolocation);
    } 
    //To clear all variable to empty for the next city

    else {
        alert("Please enter a City name");
    }
 };
var getCityGeo = function(city) {

    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+ apiResquestKey).then(function(response) {

    if(response.ok) {
      response.json().then(function(data) {
    //   console.log(data);
            if(data.length === 1) {
            latCity = data[0].lat;
            lonCity= data[0].lon;
            cityName = data[0].name;
            // console.log(latCity);
            // console.log(lonCity);
            // console.log(cityName);
            
            getCityWeather(latCity,lonCity);

            } 
            else {
                alert("No weather found. " + " Please try again");
                cityInputNameEl.value = "";
                formSubmitHandler();
            }
    });
    } else {
        alert("Error: " + response.statusText);
    }
   });
};

var getCityWeather = function() {

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latCity+"&lon="+lonCity+"&exclude=hourly&units=imperial&appid="+ apiResquestKey).then(function(response) {
  response.json().then(function(data) {
    // console.log(data);

    apiResponse = data;
    currentTemp= data.current.temp;
    currentWind = data.current.wind_speed;
    currentHumidity = data.current.humidity;
    currentUvIndex = data.current.uvi;
    currentIcon = data.current.weather[0].icon;
    cityTimeZone = data.timezone;
    // console.log(currentHumidity);
    // console.log(currentTemp);
    // console.log(currentIcon);

    var date = (new Date().toLocaleString("en-US", {timeZone: cityTimeZone})).split(",");
    cityDate = date[0].trim();
    // console.log(cityDate);
    iconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";

    document.querySelector("#city-current-name").innerHTML = cityName;
    document.querySelector("#current-day").innerHTML ="("+cityDate+")";
    $("#wicon").attr("src", iconUrl);
    document.querySelector("#currentTemp").innerHTML = " " + currentTemp + "℉";
    document.querySelector("#currentWind").innerHTML = " " + currentWind + " MPH ";
    document.querySelector("#currentHumidity").innerHTML = " " + currentHumidity + " % ";

    //UV index check
    
    if(currentUvIndex <= 2) {
    $("#currentUvIndex").attr("class","uv-low");
    }
    else if(currentUvIndex > 2 && currentUvIndex <=5) {
        $("#currentUvIndex").attr("class","uv-moderate");
    }
    else if(currentUvIndex > 5 && currentUvIndex <=7) {
        $("#currentUvIndex").attr("class","uv-high");
    }
    else if(currentUvIndex > 7 && currentUvIndex <=10) {
        $("#currentUvIndex").attr("class","uv-very-high");
    }
    else if(currentUvIndex > 10) {
        $("#currentUvIndex").attr("class","uv-extrme");
    }

    document.querySelector("#uvindex").innerHTML = " " + currentUvIndex;

    fiveDayForecast();

  });
});
};
     //5 Days Forecast
var fiveDayForecast = function(){
    // var d = new Date(timestap*1000);
    console.log(apiResponse);
    
    for (var i = 0; i < 6; i++) {
     var timestamp = apiResponse.daily[i].dt



    }

};

   




cityFormEl.addEventListener("submit", formSubmitHandler);