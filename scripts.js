const currentTemp = document.getElementById('currentTemp');
const currentConditionImage = document.getElementById('currentConditionsImage');

async function getCurrentWeather() {
    const response = await fetch(
		'http://api.weatherapi.com/v1/forecast.json?key=e53052be24db4c8abb1154941240606&q=62002&days=3&aqi=no&alerts=yes',
		{ mode: 'cors' }
	);
    const currentWeatherData = await response.json();
    console.log(currentWeatherData);
    currentTemp.innerText = `The current temperature is ${currentWeatherData.current.temp_f}\u00B0F.`;
    currentConditionImage.src = currentWeatherData.current.condition.icon;
}

getCurrentWeather();