const currentLocation = document.getElementById('currentLocation');
const currentTemp = document.getElementById('currentTemp');
const currentConditionImage = document.getElementById('currentConditionsImage');
const currentConditionText = document.getElementById('currentConditionsText');
const feelsLikeTemp = document.getElementById('feelsLikeTemp');
const lastUpdated = document.getElementById('lastUpdated');
const forecastDay1 = document.getElementById('forecastDay1');
const forecastDay2 = document.getElementById('forecastDay2');
const forecastDay3 = document.getElementById('forecastDay3');
const searchInput = document.getElementById('location-search');
const searchButton = document.querySelector('#searchDiv button');

async function fetchWeatherData(location) {
	const apiKey = 'e53052be24db4c8abb1154941240606';
	const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=yes`;

	try {
		const response = await fetch(apiUrl, { mode: 'cors' });
		const currentWeatherData = await response.json();
		//console.log(currentWeatherData);

		updateCurrentWeather(currentWeatherData);

		const forecast = currentWeatherData.forecast.forecastday;
		updateForecastDay(forecastDay1, forecast[0]);
		updateForecastDay(forecastDay2, forecast[1]);
		updateForecastDay(forecastDay3, forecast[2]);
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function updateCurrentWeather(weatherData) {
	currentLocation.innerHTML = `${weatherData.location.name}, ${weatherData.location.region}`;
	currentTemp.innerText = `${weatherData.current.temp_f}\u00B0F`;
	currentConditionImage.src = weatherData.current.condition.icon;
	currentConditionText.innerText = weatherData.current.condition.text;
	feelsLikeTemp.innerHTML = `Feels like: ${weatherData.current.feelslike_f}\u00B0F`;
	lastUpdated.innerText = `Last updated: ${weatherData.current.last_updated}`;
}

function updateForecastDay(dayDiv, forecastData) {
	const dateString = forecastData.date;
	const [year, month, day] = dateString.split('-');
	const formattedDate = new Date(year, month - 1, day).toLocaleDateString();

	const maxTemp = forecastData.day.maxtemp_f;
	const minTemp = forecastData.day.mintemp_f;
	const conditionIcon = forecastData.day.condition.icon;
	const chanceOfRain = forecastData.day.daily_chance_of_rain;

	dayDiv.innerHTML = `
        <h4>${formattedDate}</h4>
        <img src="${conditionIcon}" alt="${forecastData.day.condition.text}">
        <p>Max: ${maxTemp}&deg;F</p>
        <p>Min: ${minTemp}&deg;F</p>
        <p>Chance of Rain: ${chanceOfRain}%</p>
    `;
}

searchButton.addEventListener('click', () => {
	const userInput = searchInput.value;
	fetchWeatherData(userInput);
});

fetchWeatherData('62002'); //Search Alton, IL by default
