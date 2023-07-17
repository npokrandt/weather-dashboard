
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

    beforeWeatherDiv.classList.add("d-none")
    afterWeatherDiv.classList.remove("d-none")
    var city = cityInput.value
    //get both at once
    getCurrentWeather(city)
    getFiveDayForecast(city)
}

function getCurrentWeather(city){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey)
    .then(function(response){
        //console.log(response)
        return response.json()
    }) 
    .then(function(data){
        if (data.cod != 200){
            alert("City does not exist in database. Try again")
        } else {
            //console.log(data.weather[0].icon)
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

    })
    //console.log("weather!")
}

function getFiveDayForecast(city){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey)
    .then(function(response){
        //console.log(response)
        return response.json()
    }).then(function(data){
        
        //start from noon of tomorrow
        var dayID = getNoonId(data)
        createForecast(data, 1, dayID)
        // for (var i = 1; i <= 5; i++){
        //     createForecast(data, i)
        // }

    })
}

function getNoonId(data){
    //start from noon of tomorrow
    var noonID = 0
    var dateAndTime
    //console.log(dateAndTime[0])
    var date
    var time
    var today = dayjs().format('YYYY-MM-DD')
    while(today == date || time != "12:00:00"){
        //console.log(data.list[noonID])
        dateAndTime = data.list[noonID].dt_txt.split(' ')
        date = dateAndTime[0]
        time = dateAndTime[1]
        noonID++
    }
    noonID--
    
    //if it's before 9am, the forecast will include today
    if (noonID > 7){
        noonID -= 8
    }
    console.log(noonID)
    return noonID
}

function createForecast(data, dayNum, dayNumAtNoon){

    for (var i = dayNumAtNoon; i < 40; i += 8){
        console.log(data.list[i])
        //the elements, which will be decided by the dayNum number
        var forecastDateEl = document.getElementById('day' + dayNum + '-date')
        var forecastIconEl = document.getElementById('day' + dayNum + '-icon')
        var forecastTempEl = document.getElementById('day' + dayNum + '-temp')
        var forecastHumidityEl = document.getElementById('day' + dayNum + '-hum')
        var forecastWindEl = document.getElementById('day' + dayNum + '-wind')

        var forecastDate = 'test'
        var forecastIcon = 'test'
        //what the temp will be at noon
        var forecastTemp = 'test'
        var forecastHumidity = 'test'
        var forecastWind = 'test'

        forecastDateEl.innerText = forecastDate
        forecastIconEl.src = forecastIcon
        forecastTempEl.innerText = forecastTemp
        forecastHumidityEl.innerText = forecastHumidity
        forecastWindEl.innerText = forecastWind
        dayNum++
    }
}

//event listeners
weatherBtn.addEventListener('click', getWeather)

//there will be one for the saved city buttons