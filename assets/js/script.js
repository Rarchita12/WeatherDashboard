var count = 0;
var currentWeatherEl = document.querySelector("#currentWeather");
var city;
var timeZone;
var cdate;


//Display Past Searches
function displaySearches(){
    
        var cityHistory = document.createElement("button");
        cityHistory.classList.add("btn");
        
        cityHistory.innerHTML = localStorage.getItem(count) + "<br/>";
        cityHistory.setAttribute("data-pastcity", "" +  localStorage.getItem(count));
     
        $('#city-buttons').append(cityHistory);
        

}

//In case city is in a different time zone
function date(timeZone){
    cdate = moment().tz(timeZone).format('MM/DD/YYYY');
    return cdate;
}

//5-day forecast dates
function futuredates(dayNum, cdate){
  
  var ndate = moment(cdate, 'MM/DD/YYYY').add(dayNum, 'days').format('MM/DD/YYYY');
  return ndate; 
}
//convert Kelvin to Fahrenheit
function toFahrenheit(OGtemp){
 return ((OGtemp - 273.15) * (9/5) + 32).toFixed(2);
}

function uvColorStatus(uv){
  var color;
  if(uv>=0 && uv<3){
    color = "good";
  }
  else if(uv>=3 && uv<6){
    color = "moderate";
  }
  else{
color = "severe";
  }
 
  return color;
}


//display currentWeather
function currentWeather(){
  var city = document.getElementById("city").value;
    
  
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=86e5b69988c83a74ef952be5ac176e35'
  )

.then(function(response) {
  return response.json();
})
.then(function(response) {
    
   var longitude =  response.coord.lon;
   var latitude = response.coord.lat;
  

   fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude +'&appid=86e5b69988c83a74ef952be5ac176e35')
      .then(function(oneresponse) {
        return oneresponse.json();
      })
      .then(function(oneresponse) {
 timeZone = oneresponse.timezone;
 
 var iconcode = oneresponse.current.weather[0].icon;
 var OGtemp = oneresponse.current.temp; 
 var realtemp = toFahrenheit(OGtemp);
 var uv = oneresponse.current.uvi;
 var uvColor = uvColorStatus(uv);
cdate = date(timeZone);

var icon1 = "http://openweathermap.org/img/w/" + oneresponse.daily[1].weather[0].icon + ".png";
var icon2 = "http://openweathermap.org/img/w/" + oneresponse.daily[2].weather[0].icon + ".png";
var icon3 = "http://openweathermap.org/img/w/" + oneresponse.daily[3].weather[0].icon + ".png";
var icon4 = "http://openweathermap.org/img/w/" + oneresponse.daily[4].weather[0].icon + ".png";
var icon5 = "http://openweathermap.org/img/w/" + oneresponse.daily[5].weather[0].icon + ".png";

document.getElementById("card1Title").innerHTML = futuredates(1, cdate);
document.getElementById("icon1").src = icon1;

document.getElementById("card2Title").innerHTML = futuredates(2, cdate);
document.getElementById("icon2").src = "" + icon2;
document.getElementById("card3Title").innerHTML = futuredates(3, cdate);
document.getElementById("icon3").src = "" + icon3;
document.getElementById("card4Title").innerHTML = futuredates(4, cdate);
document.getElementById("icon4").src = "" + icon4;
document.getElementById("card5Title").innerHTML = futuredates(5, cdate);
document.getElementById("icon5").src = "" + icon5;
var temp1 = toFahrenheit(oneresponse.daily[1].temp.day);
var temp2 =  toFahrenheit(oneresponse.daily[2].temp.day);
var temp3 =  toFahrenheit(oneresponse.daily[3].temp.day);
var temp4 =  toFahrenheit(oneresponse.daily[4].temp.day);
var temp5 =  toFahrenheit(oneresponse.daily[5].temp.day);
document.getElementById("temp1").innerHTML += "Temp: " + temp1 +"°F";
document.getElementById("temp2").innerHTML += "Temp: " +temp2 +"°F";
document.getElementById("temp3").innerHTML += "Temp: " +temp3 +"°F";
document.getElementById("temp4").innerHTML += "Temp: " +temp4 + "°F";
document.getElementById("temp5").innerHTML += "Temp: " +temp5 + "°F";
var wind1 = oneresponse.daily[1].wind_speed;
var wind2 = oneresponse.daily[2].wind_speed;
var wind3 = oneresponse.daily[3].wind_speed;
var wind4 = oneresponse.daily[4].wind_speed;
var wind5 = oneresponse.daily[5].wind_speed;
document.getElementById("wind1").innerHTML += "Wind: " +wind1 + " MPH";
document.getElementById("wind2").innerHTML += "Wind: " +wind2 + " MPH";
document.getElementById("wind3").innerHTML += "Wind: " +wind3 + " MPH";
document.getElementById("wind4").innerHTML += "Wind: " +wind4 + " MPH";
document.getElementById("wind5").innerHTML += "Wind: " +wind5 + " MPH";
var humidity1 = oneresponse.daily[1].humidity;
var humidity2 = oneresponse.daily[2].humidity;
var humidity3 = oneresponse.daily[3].humidity;
var humidity4 = oneresponse.daily[4].humidity;
var humidity5 = oneresponse.daily[5].humidity;
document.getElementById("humidity1").innerHTML += "Humidity: " +humidity1 + " %";
document.getElementById("humidity2").innerHTML += "Humidity: " +humidity2 + " %";
document.getElementById("humidity3").innerHTML += "Humidity: " +humidity3 + " %";
document.getElementById("humidity4").innerHTML += "Humidity: " +humidity4 + " %";
document.getElementById("humidity5").innerHTML += "Humidity: " +humidity5 + " %";
var place = document.createElement("h2");
var weatherInfo = document.createElement("p");
var uvi = document.createElement("p");

place.setAttribute = ("id", "place");
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";


place.innerHTML = " " +city + " " + "(" + cdate + ")" +" <img  src='" + iconurl + "'>";
weatherInfo.innerHTML = "<p> Temp: " + realtemp + "°F</p><p>Wind: " + oneresponse.current.wind_speed + " MPH</p><p>Humidity: " + oneresponse.current.humidity + " %</p>";
uvi.innerHTML =  "<p> UV Index: <span>" + uv + "</span> </p>";
uvi.classList.add('' + uvColor);
document.getElementById("currentWeather").appendChild(place);
document.getElementById("currentWeather").appendChild(weatherInfo);
document.getElementById("currentWeather").appendChild(uvi);      
document.getElementById("currentWeather").classList.add('icons');

document.getElementById("fivedayforecast").style.display = "block";

document.getElementById("fivedayforecast").classList.add('icons');

})

});

}


//Past Searches Current Weather
function currentWeatherPast(city){
  
   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=86e5b69988c83a74ef952be5ac176e35'
  )

.then(function(response) {
  return response.json();
})
.then(function(response) {
    
   var longitude =  response.coord.lon;
   var latitude = response.coord.lat;
  

   fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude +'&appid=86e5b69988c83a74ef952be5ac176e35')
      .then(function(oneresponse) {
        return oneresponse.json();
      })
      .then(function(oneresponse) {
 timeZone = oneresponse.timezone;

 var iconcode = oneresponse.current.weather[0].icon;
 var OGtemp = oneresponse.current.temp; 
 var realtemp = toFahrenheit(OGtemp);
 var uv = oneresponse.current.uvi;
 var uvColor = uvColorStatus(uv);
cdate = date(timeZone);

var icon1 = "http://openweathermap.org/img/w/" + oneresponse.daily[1].weather[0].icon + ".png";
var icon2 = "http://openweathermap.org/img/w/" + oneresponse.daily[2].weather[0].icon + ".png";
var icon3 = "http://openweathermap.org/img/w/" + oneresponse.daily[3].weather[0].icon + ".png";
var icon4 = "http://openweathermap.org/img/w/" + oneresponse.daily[4].weather[0].icon + ".png";
var icon5 = "http://openweathermap.org/img/w/" + oneresponse.daily[5].weather[0].icon + ".png";

document.getElementById("card1Title").innerHTML = futuredates(1, cdate);
document.getElementById("icon1").src = icon1;

document.getElementById("card2Title").innerHTML = futuredates(2, cdate);
document.getElementById("icon2").src = "" + icon2;
document.getElementById("card3Title").innerHTML = futuredates(3, cdate);
document.getElementById("icon3").src = "" + icon3;
document.getElementById("card4Title").innerHTML = futuredates(4, cdate);
document.getElementById("icon4").src = "" + icon4;
document.getElementById("card5Title").innerHTML = futuredates(5, cdate);
document.getElementById("icon5").src = "" + icon5;
var temp1 = toFahrenheit(oneresponse.daily[1].temp.day);
var temp2 =  toFahrenheit(oneresponse.daily[2].temp.day);
var temp3 =  toFahrenheit(oneresponse.daily[3].temp.day);
var temp4 =  toFahrenheit(oneresponse.daily[4].temp.day);
var temp5 =  toFahrenheit(oneresponse.daily[5].temp.day);
document.getElementById("temp1").innerHTML += "Temp: " + temp1 +"°F";
document.getElementById("temp2").innerHTML += "Temp: " +temp2 +"°F";
document.getElementById("temp3").innerHTML += "Temp: " +temp3 +"°F";
document.getElementById("temp4").innerHTML += "Temp: " +temp4 + "°F";
document.getElementById("temp5").innerHTML += "Temp: " +temp5 + "°F";
var wind1 = oneresponse.daily[1].wind_speed;
var wind2 = oneresponse.daily[2].wind_speed;
var wind3 = oneresponse.daily[3].wind_speed;
var wind4 = oneresponse.daily[4].wind_speed;
var wind5 = oneresponse.daily[5].wind_speed;
document.getElementById("wind1").innerHTML += "Wind: " +wind1 + " MPH";
document.getElementById("wind2").innerHTML += "Wind: " +wind2 + " MPH";
document.getElementById("wind3").innerHTML += "Wind: " +wind3 + " MPH";
document.getElementById("wind4").innerHTML += "Wind: " +wind4 + " MPH";
document.getElementById("wind5").innerHTML += "Wind: " +wind5 + " MPH";
var humidity1 = oneresponse.daily[1].humidity;
var humidity2 = oneresponse.daily[2].humidity;
var humidity3 = oneresponse.daily[3].humidity;
var humidity4 = oneresponse.daily[4].humidity;
var humidity5 = oneresponse.daily[5].humidity;
document.getElementById("humidity1").innerHTML += "Humidity: " +humidity1 + " %";
document.getElementById("humidity2").innerHTML += "Humidity: " +humidity2 + " %";
document.getElementById("humidity3").innerHTML += "Humidity: " +humidity3 + " %";
document.getElementById("humidity4").innerHTML += "Humidity: " +humidity4 + " %";
document.getElementById("humidity5").innerHTML += "Humidity: " +humidity5 + " %";
var place = document.createElement("h2");
var weatherInfo = document.createElement("p");
var uvi = document.createElement("p");

place.setAttribute = ("id", "place");
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";


place.innerHTML = " " +city + " " + "(" + cdate + ")" +" <img  src='" + iconurl + "'>";
weatherInfo.innerHTML = "<p> Temp: " + realtemp + "°F</p><p>Wind: " + oneresponse.current.wind_speed + " MPH</p><p>Humidity: " + oneresponse.current.humidity + " %</p>";
uvi.innerHTML =  "<p> UV Index: <span>" + uv + "</span> </p>";
uvi.classList.add('' + uvColor);
document.getElementById("currentWeather").appendChild(place);
document.getElementById("currentWeather").appendChild(weatherInfo);
document.getElementById("currentWeather").appendChild(uvi);      
document.getElementById("currentWeather").classList.add('icons');

document.getElementById("fivedayforecast").style.display = "block";

document.getElementById("fivedayforecast").classList.add('icons');

})

});

}

//clear old 5-day forecast content
function clear(){
  document.getElementById("temp1").innerHTML = "";
  document.getElementById("wind1").innerHTML = "";
  document.getElementById("humidity1").innerHTML = "";

  document.getElementById("temp2").innerHTML = "";
  document.getElementById("wind2").innerHTML = "";
  document.getElementById("humidity2").innerHTML = "";

  document.getElementById("temp3").innerHTML = "";
  document.getElementById("wind3").innerHTML = "";
  document.getElementById("humidity3").innerHTML = "";

  document.getElementById("temp4").innerHTML = "";
  document.getElementById("wind4").innerHTML = "";
  document.getElementById("humidity4").innerHTML = "";

  document.getElementById("temp5").innerHTML = "";
  document.getElementById("wind5").innerHTML = "";
  document.getElementById("humidity5").innerHTML = "";
}




//When user Clicks Search
function searchHistory() {
    document.getElementById("currentWeather").innerHTML = "";
    
  clear();
     city = $("#city").val();
    
    localStorage.setItem(count, city);
    currentWeather();
    
    if(document.getElementById("fivedayforecast").style.display = "none"){
        
    
      document.getElementById("fivedayforecast").style.display = "block";
  }
    displaySearches();
    count++;
    
  }


  //Persist data on refresh
  window.onload = function() {

    
    for(var i =0; i<localStorage.length; i++){
       
        var renderpastCity = localStorage.getItem(localStorage.key(i));
        var cityHistory = document.createElement("button");
        cityHistory.classList.add("btn");
        
        cityHistory.innerHTML = renderpastCity + "<br/>";
        cityHistory.setAttribute("data-pastcity", "" +  localStorage.getItem(i));
       
      
        $('#city-buttons').append(cityHistory);
    
        
        }

       
        
  }


//Event Listener for Search History buttons
  document.getElementById("city-buttons").addEventListener('click',function(e){
    if(e.target && event.target.tagName=== 'BUTTON')
    {
          
         
          var pastCity= event.target.getAttribute("data-pastcity")
          document.getElementById("currentWeather").innerHTML = "";
    
  clear();

          currentWeatherPast(pastCity);
         
          if(document.getElementById("fivedayforecast").style.display = "none"){
              
          
            document.getElementById("fivedayforecast").style.display = "block";
        }
     }
 });


 

  
  