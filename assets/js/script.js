var cityFormEl = document.querySelector("#city-form");
var cityInputNameEl = document.querySelector("#city");
var buttonCity= document.querySelector("#city-buttons");
var cityName;
var cityGeolocation;
var latCity;
var lonCity;
var apiKey = '7016675fb0eabb9cd16c56c54fe7afa4';
var apiResquestKey = apiKey.trim("");
var cityDate; 
var currentIcon;
var imgForecast;
var currentTemp;
var currentWind;
var currentHumidity;
var currentUvIndex;
var iconUrl;
var apiResponse;
var fiveDayForecast = [{},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""}];
var cities =[];

 var formSubmitHandler = function(event) {
    // prevent page from refreshing
    if (event){
    event.preventDefault();
    }
    // get value from input element
    cityGeolocation = cityInputNameEl.value.trim();

  
    if(cityGeolocation) {
        getCityGeo(cityGeolocation);
    } 
    //To clear all variable to empty for the next city

    else {
        alert("Please enter a city name");
    }
 };
var getCityGeo = function(city) {

    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+ apiResquestKey).then(function(response) {

    if(response.ok) {
      response.json().then(function(data) {
            if(data.length === 1) {
            latCity = data[0].lat;
            lonCity= data[0].lon;
            cityName = data[0].name;
                
                if(!cities.includes(cityName)){
                    var cityNameButton = document.createElement("button");
                    cityNameButton.setAttribute("class","btn");
                    cityNameButton.setAttribute("id","cityname");
                    cityNameButton.textContent = cityName;
                    buttonCity.appendChild(cityNameButton);
                    cities.push(cityName);
                    cityInputNameEl.value = "";

                    getCityWeather(latCity,lonCity);
                }
                else {
                    getCityWeather(latCity,lonCity);
                }
            } 
            else {
                alert("No weather found. " + " Please try again!.");
                cityInputNameEl.value = "";
                formSubmitHandler();
            }
    });
    } else {
        alert("Error: " + response.statusText);
    }
   });
};

buttonCity.addEventListener("click",function(event){

    var cityButtonSelection = event.target;
    var selectedCity = cityButtonSelection.textContent;
   
    console.log(selectedCity);

    getCityGeo(selectedCity);

});

var getCityWeather = function() {

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latCity+"&lon="+lonCity+"&exclude=hourly&units=imperial&appid="+ apiResquestKey).then(function(response) {
  response.json().then(function(data) {

    apiResponse = data;
    currentTemp= data.current.temp;
    currentWind = data.current.wind_speed;
    currentHumidity = data.current.humidity;
    currentUvIndex = data.current.uvi;
    currentIcon = data.current.weather[0].icon;
    cityTimeZone = data.timezone;
    


    var date = (new Date().toLocaleString("en-US", {timeZone: cityTimeZone})).split(",");
    cityDate = date[0].trim();

    iconUrl = "https://openweathermap.org/img/w/" + currentIcon + ".png";

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

    Forecast();

  });
});
};
     //5 Days Forecast
var Forecast = function(){

    console.log(apiResponse);

    for (var i = 1; i < 6; i++) {
     var timestamp = apiResponse.daily[i].dt
     var forecastDate = new Date(timestamp*1000);
     var splitDate = forecastDate.toLocaleDateString().split(","); 
    fiveDayForecast[i].date = splitDate[0].trim();
    fiveDayForecast[i].icon = apiResponse.daily[i].weather[0].icon;
    fiveDayForecast[i].temp = apiResponse.daily[i].temp.day;
    fiveDayForecast[i].wind = apiResponse.daily[i].wind_speed;
    fiveDayForecast[i].humidity = apiResponse.daily[i].humidity;

    //Display Forecast
    document.querySelector("#forecastdate"+[i]).innerHTML = fiveDayForecast[i].date;
    imgForecast = "https://openweathermap.org/img/w/" + fiveDayForecast[i].icon + ".png"
    $("#imgdate"+[i]).attr("src", imgForecast);
    document.querySelector("#tempdate"+[i]).innerHTML = " "+ fiveDayForecast[i].temp + "℉";
    document.querySelector("#winddate"+[i]).innerHTML = " "+ fiveDayForecast[i].wind + " MPH ";
    document.querySelector("#humiditydate"+[i]).innerHTML = " "+ fiveDayForecast[i].humidity + " % ";
    
    }
 
};

var checkCityButton = function() {



            var cityNameButton = document.createElement("button");
            cityNameButton.setAttribute("class","btn");
            cityNameButton.setAttribute("id","cityname");
            cityNameButton.textContent = cityName;
            buttonCity.appendChild(cityNameButton);
            cities.push(cityName);
            cityInputNameEl.value = "";
    
}
    



cityFormEl.addEventListener("submit", formSubmitHandler);
