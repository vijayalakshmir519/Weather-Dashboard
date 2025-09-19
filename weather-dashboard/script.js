const apiKey = "db36978a65fb5e277bd5d54d5b7fe5d5"; // ✅ Your working key

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

// Search weather by city
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  getWeatherByCity(city);
});

// Fetch weather by city name
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => showWeather(data))
    .catch(err => {
      console.error("Fetch error:", err);
      weatherInfo.innerHTML = `<p>Error fetching data.</p>`;
    });
}

// Show weather details
function showWeather(data) {
  if (data.cod && Number(data.cod) !== 200) {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
    return;
  }

  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}
