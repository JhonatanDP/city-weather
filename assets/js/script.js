var cityFormEl = document.querySelector("#city-form");//Form selector
var cityInputNameEl = document.querySelector("#city");//Input selector
var buttonCity= document.querySelector("#city-buttons");//section selector to hold city buttons
var cityName; //city input name
var cityGeolocation; //hold the name of the requested city
var latCity; //city latitude
var lonCity; //city longitude
var apiKey = '7016675fb0eabb9cd16c56c54fe7afa4';  //API key request string
var apiResquestKey = apiKey.trim(""); //API key
var cityDate; //city current date
var currentIcon; //city current icon
var imgForecast; //weather icon string
var currentTemp; // city current temp
var currentWind; //Current wind
var currentHumidity; //current humidity
var currentUvIndex; //current uv index
var iconUrl; //url address to request the icon using the code giving by the response
var apiResponse; //api response variable
//Array to hold 5 days forecast
var fiveDayForecast = [{},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""},{date:"",icon:"",temp:"",wind:"",humidity:""}];
//array to hold the city history
var cities =[];

 var formSubmitHandler = function(event) {
    // prevent page from refreshing
    if (event){
    event.preventDefault();
    }
    // get value from input element
    cityGeolocation = cityInputNameEl.value.trim();

  
    if(cityGeolocation) { //check for user input
        getCityGeo(cityGeolocation);
    } 

    else {
        alert("Please enter a city name");  //if user input is empty
    }
 };

 //function to get the geocoding and create the city button list

var getCityGeo = function(city) {
    //fetch request
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+ apiResquestKey).then(function(response) {
    //check if fetch request was sucessfully 
    if(response.ok) {
      response.json().then(function(data) {
            if(data.length === 1) { //check response is not empty
            latCity = data[0].lat;  //copy latitude
            lonCity= data[0].lon; //copy longitude
            cityName = data[0].name; //copy city name
                //check is city name was already requested before creating the history
                if(!cities.includes(cityName)){
                    var cityNameButton = document.createElement("button");
                    cityNameButton.setAttribute("class","btn");
                    cityNameButton.setAttribute("id","cityname");
                    cityNameButton.textContent = cityName;
                    buttonCity.appendChild(cityNameButton);
                    cities.push(cityName);    //push city name requested to array history
                    cityInputNameEl.value = ""; //empty input

                    getCityWeather(latCity,lonCity); //call function
                }
                else {
                    getCityWeather(latCity,lonCity); //call function
                }
            } 
            else {
                alert("No weather found. " + " Please try again!.");  //city name does not exist
                cityInputNameEl.value = "";
                formSubmitHandler(); //start orver
            }
    });
    } else {
        alert("Error: " + response.statusText);
    }
   });
};

//event listening for city button created

buttonCity.addEventListener("click",function(event){

    var cityButtonSelection = event.target;
    var selectedCity = cityButtonSelection.textContent;
   
    console.log(selectedCity);

    getCityGeo(selectedCity);

});

//function to request the city weather information using latitude and longitude

var getCityWeather = function() {

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latCity+"&lon="+lonCity+"&exclude=hourly&units=imperial&appid="+ apiResquestKey).then(function(response) {
  response.json().then(function(data) {

    //save API response information 
    apiResponse = data;
    currentTemp= data.current.temp;
    currentWind = data.current.wind_speed;
    currentHumidity = data.current.humidity;
    currentUvIndex = data.current.uvi;
    currentIcon = data.current.weather[0].icon;
    cityTimeZone = data.timezone;
    

    //getting the correct date for the requested city using the timeZone
    var date = (new Date().toLocaleString("en-US", {timeZone: cityTimeZone})).split(",");
    cityDate = date[0].trim();
    //URL to request the weather icon
    iconUrl = "https://openweathermap.org/img/w/" + currentIcon + ".png";
    //adding values to html tags
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
    //adding uv index number
    document.querySelector("#uvindex").innerHTML = " " + currentUvIndex;

    Forecast(); //call 5 days forecast function

  });
});
};
     //5 Days Forecast
var Forecast = function(){


    //using the loop  to save the information the 5 day forescast inside the array
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

//event listener for search buttons
cityFormEl.addEventListener("submit", formSubmitHandler);
