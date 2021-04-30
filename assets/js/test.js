
var count = 0;

function displaySearches(){
    
    var cityHistory = document.createElement("button");
    cityHistory.classList.add("btn");
    cityHistory.innerHTML = localStorage.getItem(count) + "<br/>";
    
    $('#city-buttons').append(cityHistory);
    

}

function currentWeather(){
    var city = document.getElementById("city").value;
    console.log(city);
   var place = document.createElement("h2");
   place.setAttribute = ("id", "place1");
   place.innerHTML = " " +city;
   document.getElementById("currentWeather").appendChild(place);
   //document.getElementById("currentWeather").innerHTML = cname;
console.log("here");

}



function searchHistory() {
    document.getElementById("currentWeather").innerHTML = "";
    //city = $("#city").val();
   
   //localStorage.setItem(count, city);
   currentWeather();
   //displaySearches();
   count++;
   //$("#currentWeather").html(" ");
    
   
 }