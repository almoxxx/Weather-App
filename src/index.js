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
  let apiKey = "b1d355353afe3oe89t1c624ba0cd84bf";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
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
  let apiKey = "b1d355353afe3oe89t1c624ba0cd84bf";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log({ response });
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let currenttemperature = document.querySelector("#current-temperature");
  currenttemperature.innerHTML = `${temperature}°C`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.condition.description}`;
  let currenthumidity = document.querySelector("#current-humidity");
  let humidity = response.data.temperature.humidity;
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
