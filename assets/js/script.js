var count = 0;
var cityButtonsEl = document.querySelector("#city-buttons");
var currentWeatherEl = document.querySelector("#currentWeather");
var city;
var timeZone;
var cdate;


function test(){
    alert("here");
}

function displaySearches(){
    
        var cityHistory = document.createElement("button");
        cityHistory.classList.add("btn");
        cityHistory.innerHTML = localStorage.getItem(count) + "<br/>";
        
        $('#city-buttons').append(cityHistory);
        

}


function date(timeZone){
    /*var date = moment.unix(currentDate).format('MM/DD/YYYY');
    console.log("this is the date: " + date);*/

    cdate = moment().tz(timeZone).format('MM/DD/YYYY');
    /*var curdates = document.createElement("span");
    curdates.innerHTML = " " + cdate;
    //console.log("cdate is " + cdate);

    document.getElementById("place").appendChild(curdates);
    
    var ndate = moment(cdate, 'MM/DD/YYYY').add(1, 'days').format('MM/DD/YYYY');
    console.log("ndate is " + ndate);*/
    return cdate;
}

function toFahrenheit(OGtemp){
 return ((OGtemp - 273.15) * (9/5) + 32).toFixed(2);
}

function uvColorStatus(uv){
  var color;
  if(uv>=0 || uv<3){
    color = "good";
  }
  else if(uv>=3 || uv<6){
    color = "moderate";
  }
  else{
color = "severe";
  }
  return color;
}

function currentWeather(){
    var city = document.getElementById("city").value;
    console.log(city);
  
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=86e5b69988c83a74ef952be5ac176e35'
  )

.then(function(response) {
  return response.json();
})
.then(function(response) {
    console.log(response);
   var longitude =  response.coord.lon;
   var latitude = response.coord.lat;
  

   fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude +'&appid=86e5b69988c83a74ef952be5ac176e35')
      .then(function(oneresponse) {
        return oneresponse.json();
      })
      .then(function(oneresponse) {
 timeZone = oneresponse.timezone;
 console.log(oneresponse);
 var iconcode = oneresponse.current.weather[0].icon;
 var OGtemp = oneresponse.current.temp; 
 var realtemp = toFahrenheit(OGtemp);
 var uv = oneresponse.current.uvi;
 var uvColor = uvColorStatus(uv);
cdate = date(timeZone);
var place = document.createElement("h2");
var weatherInfo = document.createElement("p");
var uvi = document.createElement("p");
//place.className = "icons";
place.setAttribute = ("id", "place");
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

console.log(iconurl);
place.innerHTML = " " +city + " " + "(" + cdate + ")" +" <img  src='" + iconurl + "'>";
weatherInfo.innerHTML = "<p> Temp: " + realtemp + "°F</p><p>Wind: " + oneresponse.current.wind_speed + " MPH</p><p>Humidity: " + oneresponse.current.humidity + " %</p>";
uvi.innerHTML =  "<p> UV Index: <span>" + uv + "</span> </p>";
uvi.classList.add('' + uvColor);
document.getElementById("currentWeather").appendChild(place);
document.getElementById("currentWeather").appendChild(weatherInfo);
document.getElementById("currentWeather").appendChild(uvi);      
document.getElementById("currentWeather").classList.add('icons');
})


});



}

function searchHistory() {
    document.getElementById("currentWeather").innerHTML = "";
    
     city = $("#city").val();
    
    localStorage.setItem(count, city);
    currentWeather();
    displaySearches();
    count++;
    
  }

  
  cityButtonsEl.addEventListener("click", test);
/*
var searchTerm = 'Dallas';

fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&appid=86e5b69988c83a74ef952be5ac176e35'
  )

.then(function(response) {
  return response.json();
})
.then(function(response) {
    console.log(response);
   var longitude =  response.coord.lon;
   var latitude = response.coord.lat;
  

   fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude +'&appid=86e5b69988c83a74ef952be5ac176e35')
      .then(function(oneresponse) {
        return oneresponse.json();
      })
      .then(function(oneresponse) {
 timeZone = oneresponse.timezone;
 
date(timeZone);
        
})


});
/*
var creation_time = 1619639360;
var date = moment.unix(creation_time).format('MM/DD/YYYY');
console.log("this is the date: " + date);


var date = new Date(1619639360);

console.log("Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear());*/



/*          var cdate = moment().tz("Asia/Kolkata").format('MM/DD/YYYY');
console.log("cdate is " + cdate);

var ndate = moment(cdate, 'MM/DD/YYYY').add(1, 'days').format('MM/DD/YYYY');
console.log("ndate is " + ndate);*/