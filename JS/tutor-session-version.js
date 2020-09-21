$(document).ready(function() {
    setConditions();
})

// Search for city on button click
$('#search-btn').on('click', function(){
    let searchLocation = $('#mysearch')
    searchLocation.focus()
    getWeatherData(searchLocation.val())
})


// Where we left off on Friday, with included temp, hum, wind speed added

function getWeatherData(location){
    let searchHistory = []
    // Get JSON data
    $.ajax({
        type: "POST",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=23518631f4637b79d15912a2706d645b&units=metric`, 
        dataType: "json",
        success: function (result) {
            let weatherData = result;
            searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
            if (searchHistory === null) {
                searchHistory = []
            }
            
            searchHistory.unshift(weatherData.name);

            localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
            localStorage.setItem('currentWeather', JSON.stringify(weatherData));

            setConditions();
        },
        error: function (){
            alert("Please input a valid city name")
            }
        })
    }

function setConditions(){
    let weatherData = JSON.parse(localStorage.getItem('currentWeather'))
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = `${mm} / ${dd} / ${yyyy}`

    // Visual Changes
    // Icon
    let iconCode = weatherData.weather.icon
    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`

    // Current Weather section
    $("#city-name").html(weatherData.name)
    $("#wicon").html(weatherData.weather)
    $("#city-temp").html('Temperature: ' + weatherData.main.temp + '° celcius');
    $("#city-humidity").html('Humidity: ' + weatherData.main.humidity + '%');
    $("#city-wind").html('Wind Speed: ' + weatherData.wind.speed + ' MPH');
    $("#city-uv-index").html('UV Index: ' + weatherData.name);
    
    // Changing search history visuals
    for (let i = 0; i < 8; i++) {
        console.log(searchHistory[i])
        $(`#sh-${i}`).html(`<a href="#" onClick="getWeatherData(${searchHistory[i]})">
        ${searchHistory[i]} </a>`)

        if (i === undefined) {
            $('a').text('')
        }
    }
}