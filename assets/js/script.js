
// global variables
var apiKey = '7a4e76b338bbea8e2f0fabe191563e3b'

var weatherBtn = document.querySelector("form button")
var cityInput = document.querySelector("form input")
var beforeWeatherDiv = document.getElementById("before-weather-div")
var afterWeatherDiv = document.getElementById("after-weather-div")
var currentTempEl = document.getElementById("current-temp")
var currentHumEl = document.getElementById("current-hum")
var currentWindEl = document.getElementById("current-wind")
var currentCityEl = document.getElementById("current-city-and-date")
var currentIconEl = document.getElementById("current-weather-icon")

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
            //console.log(data.weather[0].icon)
            beforeWeatherDiv.classList.add("d-none")
            afterWeatherDiv.classList.remove("d-none")
            var temp = data.main.temp
            var humidity = data.main.humidity
            var wind = data.wind.speed
            var headline = 'pending...'
            var cityName = data.name
            var unixDate = data.dt*1000
            var date = dayjs(unixDate).format("MM/DD/YYYY")
            var icon = data.weather[0].icon
            //the link to the weather icon
            var iconHref = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
            currentIconEl.src = iconHref
            headline = cityName + " " + date
            currentCityEl.innerText = headline
            currentTempEl.innerText = "Temperature: " + temp + "\u2109"
            currentHumEl.innerText = "Humidity: " + humidity + "%"
            currentWindEl.innerHTML = "Wind: " + wind + " MPH"
            //console.log(temp + " " + humidity + " " + wind)
        }
        
        //now we can get the forecast with the coords given
        //getForecast(lat, lon)
    })
    //console.log("weather!")
}

//event listeners
weatherBtn.addEventListener('click', getWeather)

//there will be one for the saved city buttons