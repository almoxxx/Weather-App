function formatDate(date) {
  let now = new Date();
  let currentDate = document.querySelector("#current-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let city = document.querySelector("#city");

  currentDate.innerHTML = `Today, ${day} at ${hours}:${minutes} in ${city.value}`;
}
formatDate();
let form = document.querySelector("form");
form.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Searching for the weather in ${city.value} ...`;
  searchCity(city.value);
}

function showPosition(position) {
  let city = document.querySelector("#city");
  console.log({ position });
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log({ response });
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currenttemperature = document.querySelector("#current-temperature");
  currenttemperature.innerHTML = `${temperature}°C`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let currenthumidity = document.querySelector("#current-humidity");
  let humidity = response.data.main.humidity;
  currenthumidity.innerHTML = `   ${humidity} %`;
}

function handleCurrentLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
navigator.geolocation.getCurrentPosition(showPosition);
let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", handleCurrentLocation);

searchCity("Vienna");
