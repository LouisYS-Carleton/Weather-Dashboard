// Variables
    // Five Day Forecast Elements
        // Dates
let fiveDayDate1 = document.getElementById("forecastDate1");
let fiveDayDate2 = document.getElementById("forecastDate2");
let fiveDayDate3 = document.getElementById("forecastDate3");
let fiveDayDate4 = document.getElementById("forecastDate4");
let fiveDayDate5 = document.getElementById("forecastDate5");
        // Temps
let fiveDayTemp1 = document.getElementById("forecastTemp1")
let fiveDayTemp2 = document.getElementById("forecastTemp2")
let fiveDayTemp3 = document.getElementById("forecastTemp3")
let fiveDayTemp4 = document.getElementById("forecastTemp4")
let fiveDayTemp5 = document.getElementById("forecastTemp5")
        // Humidity
let fiveDayHumidity1 = document.getElementById('forecastHumidity1')
let fiveDayHumidity2 = document.getElementById('forecastHumidity2')
let fiveDayHumidity3 = document.getElementById('forecastHumidity3')
let fiveDayHumidity4 = document.getElementById('forecastHumidity4')
let fiveDayHumidity5 = document.getElementById('forecastHumidity5')
        // Icons
let fiveDayIcon1 = document.getElementById('forecastIcon1')
let fiveDayIcon2 = document.getElementById('forecastIcon2')
let fiveDayIcon3 = document.getElementById('forecastIcon3')
let fiveDayIcon4 = document.getElementById('forecastIcon4')
let fiveDayIcon5 = document.getElementById('forecastIcon5')



// Search Bar
let searchBarTextInput = document.getElementById('mysearch')
let searchBarButton = document.getElementById("search-btn");
let userCityName = searchBarTextInput.value;



// Current City Card
let cityIcon = document.getElementById('wicon')
let cityName = document.getElementById("city-name");
let cityTemperature = document.getElementById("city-temp");
let cityHumidity = document.getElementById("city-humidity");
let cityWindSpeed = document.getElementById("city-wind");
let cityUvIndex = document.getElementById("city-uv");
let currentDate = document.getElementById("city-current-date");





// Functions
window.onload = function loadLastSearch() {
    if (localStorage.getItem('lastSearch') === null) {
        let userCityName = 'Ottawa'
        apiCall(userCityName)
    } else {
        let userCityName = localStorage.getItem('lastSearch')
        apiCall(userCityName)
        }
}


function apiCall(userCityName) {

    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=23518631f4637b79d15912a2706d645b&units=metric`

    fetch(currentWeatherUrl)
    .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let temperature = data.main.temp
            let humidity = data.main.humidity
            let windspeed = data.wind.speed;
            let lat = data.coord.lat;
            let long = data.coord.lon;

            cityName.textContent = userCityName;
            currentDate.textContent = moment().format('L');   
            cityTemperature.textContent = 'Temperature: ' + temperature + '°C';
            cityHumidity.textContent = 'Humidity: ' + humidity + "%"
            cityWindSpeed.textContent = "Wind speed: " + windspeed + " MPH";
            cityIcon.setAttribute("src",`https://openweathermap.org/img/w/${data.weather[0].icon}.png`)

            // UV Index
            let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=23518631f4637b79d15912a2706d645b&lat=${lat}&lon=${long}`;

            fetch(uvIndexUrl)
            .then((response) => response.json())
                .then((data) => {
                console.log(data);
                let uvIndex = data.value;
                if (uvIndex >= 6) {
                    cityUvIndex.setAttribute('style', 'color: red')
                } else if (uvIndex <= 3) {
                    cityUvIndex.setAttribute('style', 'color: green')
                } else {
                    cityUvIndex.setAttribute('style', 'color: orange')
                }

                cityUvIndex.textContent = 'UV Index: ' + uvIndex;
                })



            // Five Day
            let fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityName}&units=metric&appid=23518631f4637b79d15912a2706d645b`;

            fetch(fiveDayForecastUrl)
            .then((response) => response.json())
                .then((data) => {
                console.log(data);
                fiveDayDate1.textContent = moment().add(1, 'days').calendar();
                fiveDayDate2.textContent = moment().add(2, 'days').calendar();
                fiveDayDate3.textContent = moment().add(3, 'days').calendar();
                fiveDayDate4.textContent = moment().add(4, 'days').calendar();
                fiveDayDate5.textContent = moment().add(5, 'days').calendar();

                fiveDayTemp1.textContent = "Temperature: " + data.list[6].main.temp + '°C';
                fiveDayTemp2.textContent = "Temperature: " + data.list[14].main.temp + '°C';
                fiveDayTemp3.textContent = "Temperature: " + data.list[22].main.temp + '°C';
                fiveDayTemp4.textContent = "Temperature: " + data.list[30].main.temp + '°C';
                fiveDayTemp5.textContent = "Temperature: " + data.list[38].main.temp  + '°C';

                fiveDayHumidity1.textContent = "Humidity: " + data.list[6].main.humidity  + '%';
                fiveDayHumidity2.textContent = "Humidity: " + data.list[14].main.humidity  + '%';
                fiveDayHumidity3.textContent = "Humidity: " + data.list[22].main.humidity  + '%';
                fiveDayHumidity4.textContent = "Humidity: " + data.list[30].main.humidity  + '%';
                fiveDayHumidity5.textContent = "Humidity: " + data.list[38].main.humidity  + '%';     
                
                fiveDayIcon1.setAttribute("src", `https://openweathermap.org/img/w/${data.list[6].weather[0].icon}.png`)
                fiveDayIcon2.setAttribute("src", `https://openweathermap.org/img/w/${data.list[14].weather[0].icon}.png`)
                fiveDayIcon3.setAttribute("src", `https://openweathermap.org/img/w/${data.list[22].weather[0].icon}.png`)
                fiveDayIcon4.setAttribute("src", `https://openweathermap.org/img/w/${data.list[30].weather[0].icon}.png`)
                fiveDayIcon5.setAttribute("src", `https://openweathermap.org/img/w/${data.list[38].weather[0].icon}.png`)
                })
    })
}

// Event Listener
searchBarButton.addEventListener("click", function(event){
    event.preventDefault()
    let userCityName = searchBarTextInput.value;
    apiCall(userCityName)
    let newListElements = document.getElementById('past-searches')
    localStorage.setItem('lastSearch', userCityName)
    newListElements.insertAdjacentHTML('afterbegin', `<button type="button" class="btn btn-primary" cityName="${userCityName}" onclick="pushCity(this)" id='previousSearchButtons'>${userCityName}</button>`)
})

function pushCity(button) {
    let city = button.getAttribute('cityName')
    apiCall(city)
}
