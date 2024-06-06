const currentLocation = document.getElementById('currentLocation');
const currentTemp = document.getElementById('currentTemp');
const currentConditionImage = document.getElementById('currentConditionsImage');
const currentConditionText = document.getElementById('currentConditionsText');
const feelsLikeTemp = document.getElementById('feelsLikeTemp');
const lastUpdated = document.getElementById('lastUpdated');

async function getCurrentWeather() {
    const response = await fetch(
		'http://api.weatherapi.com/v1/forecast.json?key=e53052be24db4c8abb1154941240606&q=62002&days=3&aqi=no&alerts=yes',
		{ mode: 'cors' }
	);
    const currentWeatherData = await response.json();
    console.log(currentWeatherData);
    currentLocation.innerHTML = `${currentWeatherData.location.name}, ${currentWeatherData.location.region}`;
    currentTemp.innerText = `${currentWeatherData.current.temp_f}\u00B0F`;
    currentConditionImage.src = currentWeatherData.current.condition.icon;
    currentConditionText.innerText = currentWeatherData.current.condition.text;
    feelsLikeTemp.innerHTML = `Feels like: ${currentWeatherData.current.feelslike_f}\u00B0F`;
    lastUpdated.innerText = `Last updated: ${currentWeatherData.current.last_updated}`;
}

getCurrentWeather();