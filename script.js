const weatherContainer = document.querySelector("#weather-container");
const form = document.querySelector("form");
const searchInput = document.querySelector("input[type='text']");

let weatherInfo;

form.addEventListener("submit", () => {
    event.preventDefault();
    getWeather(searchInput.value)
        .then((resolvedValue) => {
            weatherInfo = resolvedValue;
            updateWeatherUI(weatherInfo);
        })
});

function updateWeatherUI(weatherInfo) {
    if (weatherInfo) {
        clearWeatherContainer();
        showWeatherContainer();

        appendElement("h2", weatherInfo.city + ", " + weatherInfo.country);
        appendElement("h1", weatherInfo.temperature_c + " °C");
        appendElement("p", "Feels like: " + weatherInfo.feelsLike_c + " °C");
        appendElement("p", "Humidity: " + weatherInfo.humidity + " %");
        appendElement("p", "Wind: " + weatherInfo.wind_kph + " km/h");
        appendElement("p", "Local time: " + weatherInfo.localTime);
    }
}

function clearWeatherContainer() {
    weatherContainer.innerHTML = '';
}

function showWeatherContainer() {
    weatherContainer.classList.add('visible');
}

function appendElement(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    weatherContainer.appendChild(element);
}

async function getWeather(cityName) {
    const baseURL = 'https://api.weatherapi.com/v1';
    const apiMethod = '/current.json';
    const apiKey = 'ea9ab689df764767889122018240901';
    const fullURL = baseURL + apiMethod + '?key=' + apiKey + '&q=' + cityName;
    try {
        const response = await fetch(fullURL, { mode: 'cors' });
        const responseData = await response.json();
        return extractWeatherInfo(responseData);
    } catch (error) {
        alert("ERROR: City '" + cityName + "' not found!");
    }
}

function extractWeatherInfo(data) {
    return {
        country: data.location.country,
        city: data.location.name,
        localTime: data.location.localtime,
        temperature_c: data.current.temp_c,
        temperature_f: data.current.temp_f,
        feelsLike_c: data.current.feelslike_c,
        feelsLike_f: data.current.feelslike_f,
        humidity: data.current.humidity,
        wind_kph: data.current.wind_kph
    }
}
