# City Weather


- Project Repository address: https://github.com/JhonatanDP/city-weather
- Project live web page: https://jhonatandp.github.io/city-weather/

## Full Site
![_Users_jhonatandiaz_Desktop_Bootcamp_Modules_Module-06_Challenge_city-weather_index html (1)](https://user-images.githubusercontent.com/106892660/179439259-06af0d54-fa63-429b-91d7-d31c767f639e.png)
## Descripton

- This project is about creating an application using javascript and jsquery to request weather data from https://openweathermap.org/ using their API.


### Acceptance Criteria

- GIVEN a weather dashboard with form inputs
- WHEN I search for a city
- THEN I am presented with current and future conditions for that city and that city is added to the search history
- WHEN I view current weather conditions for that city
- THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
- WHEN I view the UV index
- THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
- WHEN I view future weather conditions for that city
- THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
- WHEN I click on a city in the search history
- THEN I am again presented with current and future conditions for that city


## Work done to complete the challenge
- I designed the dashboard using bootstrap and css.
- I divided the html in two sections; one for the search form and history, the other to present the current and 5 days forecast of the city.
- I used bootstrap card properties to layout the design.
- I added classes and Id to elements.
- I used bootstrap grid system (row and col) to organize the view of my application.
- I declared global variables and arrays.
- I created an array to hold the information of the 5 days forecast.
- I added an eventlistener to the search button.
- I created a function to check the input of the form.
- I created a function and used fetch to request the lat and lon of a city based on the name of the city and pass those value to another function.
- I created a function to fetch the city weather information using lat and lon.
- I check if the city already exist to created the button.
- I created a function to display the current city weather information and assign the correct backgroud color to the UV.
- I created a function to display the 5 day forecast of the selected city.
