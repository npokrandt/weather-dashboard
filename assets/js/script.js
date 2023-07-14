
// global variables
var apiKey = '7a4e76b338bbea8e2f0fabe191563e3b'

var weatherBtn = document.querySelector("form button")
var cityInput = document.querySelector("form input")
var beforeWeatherDiv = document.getElementById("before-weather-div")
var afterWeatherDiv = document.getElementById("after-weather-div")

console.log(afterWeatherDiv)

//functions
function getWeather(){
    var city = cityInput.value
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey).then(function(response){
        //console.log(response)
        return response.json()
    }) 
    .then(function(data){
        if (data.cod != 200){
            alert("City does not exist in database. Try again")
        } else {
            console.log(data)
        }
        
        //now we can get the forecast with the coords given
        //getForecast(lat, lon)
    })
    //console.log("weather!")
}

//event listeners
weatherBtn.addEventListener('click', getWeather)

//there will be one for the saved city buttons