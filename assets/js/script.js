var count = 0;
var cityButtonsEl = document.querySelector(".cities");
var currentWeatherEl = document.querySelector("#currentWeather");
var city;
var timeZone;
var cdate;



function displaySearches(){
    
        var cityHistory = document.createElement("button");
        cityHistory.classList.add("btn");
        cityHistory.classList.add("cities");
        cityHistory.innerHTML = localStorage.getItem(count) + "<br/>";
        cityHistory.setAttribute("data-pastCity", "" +  localStorage.getItem(count));
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

function futuredates(dayNum, cdate){
  
  var ndate = moment(cdate, 'MM/DD/YYYY').add(dayNum, 'days').format('MM/DD/YYYY');
  return ndate; 
}

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



function currentWeather(city){
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

var icon1 = "http://openweathermap.org/img/w/" + oneresponse.daily[1].weather[0].icon + ".png";
var icon2 = "http://openweathermap.org/img/w/" + oneresponse.daily[2].weather[0].icon + ".png";
var icon3 = "http://openweathermap.org/img/w/" + oneresponse.daily[3].weather[0].icon + ".png";
var icon4 = "http://openweathermap.org/img/w/" + oneresponse.daily[4].weather[0].icon + ".png";
var icon5 = "http://openweathermap.org/img/w/" + oneresponse.daily[5].weather[0].icon + ".png";
fiveday(cdate,icon1, icon2, icon3, icon4, icon5);
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
//place.className = "icons";
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
//var fivedayTitle = document.createElement("h2");
//document.getElementById("fivedayTitle").innerHTML = "5-day Forecast: ";

//document.getElementById("fivedayforecast").appendChild(fivedayTitle);
document.getElementById("fivedayforecast").classList.add('icons');





})


});



}


function fiveday(cdate, icon1, icon2, icon3, icon4, icon5){
  //document.querySelectorAll("#card1Title, #card2Title, #card3Title, #card4Title, #card5Title").classList.add('cardWeather');
  //document.getElementById("currentWeather").classList.add('cardWeather');
  document.getElementById("card1Title").innerHTML = futuredates(1, cdate);
  document.getElementById("icon1").src = icon1;
  //document.getElementById("temp1").innerHTML += " " + temp1;
  document.getElementById("card2Title").innerHTML = futuredates(2, cdate);
  document.getElementById("icon2").src = "" + icon2;
  document.getElementById("card3Title").innerHTML = futuredates(3, cdate);
  document.getElementById("icon3").src = "" + icon3;
  document.getElementById("card4Title").innerHTML = futuredates(4, cdate);
  document.getElementById("icon4").src = "" + icon4;
  document.getElementById("card5Title").innerHTML = futuredates(5, cdate);
  document.getElementById("icon5").src = "" + icon5;
}


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


/*
function test(){
  document.getElementById("currentWeather").innerHTML = "";
  // var city1=  document.querySelector(".cities");
  clear();
  var pastCty= this.dataset.data-pastCity;
  console.log(pastCty);
  if(pastCty){
    //getFeaturedRepos(language);
    currentWeather(pastCty);
    fiveday();
    if(document.getElementById("fivedayforecast").style.display = "none"){
        
    
      document.getElementById("fivedayforecast").style.display = "block";
  }
    //clar old content
   // repoContainerEl.textContent = "";
  }
    
    //localStorage.setItem(count, city);
    
   // displaySearches();
    //count++;
};
*/


function searchHistory() {
    document.getElementById("currentWeather").innerHTML = "";
    
  clear();
     city = $("#city").val();
    
    localStorage.setItem(count, city);
    currentWeather();
    fiveday();
    if(document.getElementById("fivedayforecast").style.display = "none"){
        
    
      document.getElementById("fivedayforecast").style.display = "block";
  }
    displaySearches();
    count++;
    
  }

  
  document.getElementsByClassName("cities").addEventListener("click", function(){
    
    console.log(this.dataset.data-pastCity);
    
  });
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