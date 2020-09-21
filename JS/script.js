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

// Search Bar
let searchBarTextInput = document.getElementById('mysearch')
let searchBarButton = document.getElementById("search-btn");
let userCityName = searchBarTextInput.value;

// Current City Card
let cityName = document.getElementById("city-name");
let cityTemperature = document.getElementById("city-temp");
let cityHumidity = document.getElementById("city-humidity");
let cityWindSpeed = document.getElementById("city-wind");
let cityUvIndex = document.getElementById("city-uv");



// Functions
function apiCall() {
    let userCityName = searchBarTextInput.value;

    localStorage.setItem('currentSearch', JSON.stringify(userCityName))
    let searchHistory = localStorage.getItem('currentSearch', JSON.stringify(userCityName))

    for (let i = 0; i < 8; i++) {
        console.log(searchHistory[i])
        $(`<li>`).html(`<a href="#" onClick="getWeatherData(${searchHistory[i]})">
        ${searchHistory[i]} </a>`)

        if (i === undefined) {
            $('a').text('')
        }
    }
    


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
            cityTemperature.textContent = 'Temperature: ' + temperature + '°C';
            cityHumidity.textContent = 'Humidity: ' + humidity + "%"
            cityWindSpeed.textContent = "Wind speed: " + windspeed + " MPH";

            // UV Index
            let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=23518631f4637b79d15912a2706d645b&lat=${lat}&lon=${long}`;

            fetch(uvIndexUrl)
            .then((response) => response.json())
                .then((data) => {
                console.log(data);
                let uvIndex = data.value;
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
                })
    })
}

// Event Listener
searchBarButton.addEventListener("click", apiCall)

