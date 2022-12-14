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
  let celsiustemperature = document.querySelector("#current-temperature");
  celsiustemperature.innerHTML = `${temperature}`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.condition.description}`;
  let currenthumidity = document.querySelector("#current-humidity");
  let humidity = response.data.temperature.humidity;
  currenthumidity.innerHTML = `   ${humidity} %`;
  let descriptionicon = document.querySelector("#des-i");
  descriptionicon.setAttribute("src", response.data.condition.icon_url);
  descriptionicon.setAttribute("alt", response.data.condition.icon);
}

function handleCurrentLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");

  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheittemperature = (celsiustemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheittemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiustemperature);
}

let celsiustemperature = null;
let fahrenheitlink = document.querySelector("#fahrenheitlink");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsiuslink");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

navigator.geolocation.getCurrentPosition(showPosition);
let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", handleCurrentLocation);

searchCity("Vienna");
