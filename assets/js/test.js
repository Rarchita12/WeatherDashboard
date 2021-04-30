
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



function fiveday(){
   document.getElementById("card1Title").innerHTML =document.getElementById("city").value;
  // document.getElementById("card1").appendChild(dateTest);
   /* document.getElementById("fivedayforecast").appendChild(fivedayTitle);
    document.getElementById("fivedayforecast").classList.add('icons');*/
/*for(var i =0; i<5; i++){
    var fiveCard1 = document.createElement("div");
    fiveCard1.classList.add('column');
    var fiveCard11 = document.createElement("div");
    fiveCard11.classList.add('card');
    var date1 = document.createElement("div");
    
}*/
}


function searchHistory() {
   
    document.getElementById("currentWeather").innerHTML = "";
  
    //city = $("#city").val();
   
   //localStorage.setItem(count, city);
   currentWeather();
   //displaySearches();
   fiveday();
   if(document.getElementById("fivedayforecast").style.display = "none"){
        
    
    document.getElementById("fivedayforecast").style.display = "block";
}
   count++;
   //$("#currentWeather").html(" ");
    
   
 }