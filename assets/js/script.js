var count = 0;
var cityButtonsEl = document.querySelector("#city-buttons");

function test(){
    alert("here");
}

function displaySearches(){
    
        var cityHistory = document.createElement("button");
        cityHistory.classList.add("btn");
        cityHistory.innerHTML = localStorage.getItem(count) + "<br/>";
        
        $('#city-buttons').append(cityHistory);
        

}

function searchHistory() {
    
    var city = $("#city").val();
    
    localStorage.setItem(count, city);
    
    displaySearches();
    count++;
  }

  cityButtonsEl.addEventListener("click", test);