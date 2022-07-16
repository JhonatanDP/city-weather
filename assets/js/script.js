var cityFormEl = document.querySelector("#city-form");
var cityInputNameEl = document.querySelector("#city");
var buttonCitySearch = document.querySelector(".btn-search");


var apiKey = config.MY_KEY;
var apiResquestKey = apiKey.trim("");


 debugger;

 var formSubmitHandler = function(event) {
    debugger;
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityName = cityInputNameEl.value.trim();
    console.log(cityName);
  
    // prevent page from refreshin

//     fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&appid="+ apiResquestKey).then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//     var latCity = data[0].lat;
//     var lonCity= data[0].lon;
//     console.log(latCity);
//     console.log(lonCity);

//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latCity+"&lon="+lonCity+"&units=imperial&appid="+ apiResquestKey).then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//     var currentHumidity = data.current.humidity;
//     var currentTemp= data.current.temp;
//     var currentIcon = data.current.weather[0].icon;
//     console.log(currentHumidity);
//     console.log(currentTemp);
//     console.log(currentIcon);

    
//   });
// });
    
//   });
// });

};  

cityFormEl.addEventListener("submit", formSubmitHandler);