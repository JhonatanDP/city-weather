var apiKey ="7016675fb0eabb9cd16c56c54fe7afa4";
var apiResquestKey = apiKey.trim("");

fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&appid="+ apiResquestKey).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
    var latCity = data[0].lat;
    var lonCity= data[0].lon;
    console.log(latCity);
    console.log(lonCity);

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latCity+"&lon="+lonCity+"&units=imperial&appid="+ apiResquestKey).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
    var currentHumidity = data.current.humidity;
    var currentTemp= data.current.temp;
    var currentIcon = data.current.weather[0].icon;
    console.log(currentHumidity);
    console.log(currentTemp);
    console.log(currentIcon);

    
  });
});
    
  });
});
