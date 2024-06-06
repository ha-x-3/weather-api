const currentTemp = document.getElementById('currentTemp');

async function getCurrentWeather() {
    const response = await fetch(
		'http://api.weatherapi.com/v1/forecast.json?key=e53052be24db4c8abb1154941240606&q=62002&days=3&aqi=no&alerts=yes',
		{ mode: 'cors' }
	);
    const currentWeatherData = await response.json();
    currentTemp.innerText = `The current temperature is ${currentWeatherData.current.temp_f}\u00B0F.`;
}

getCurrentWeather();