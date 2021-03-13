let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let day = days[currentDate.getDay()];
let date = currentDate.getDate();
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();

let todayDay = document.querySelector ("#today-day")
todayDay.innerHTML = `${day}`;
let todayDate = document.querySelector ("#today-date")
todayDate.innerHTML = `${date}/${month}/${year}`;

function searchCity (city) {
let apiKey = "53aff9595b18349d32179fdacc6d01bf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(`${apiUrl}`).then(showWeather);

}
function handleClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-form");
  searchCity (cityInput.value);
}

let citySubmit = document.querySelector("#search-submit");
citySubmit.addEventListener("submit", handleClick);


function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "53aff9595b18349d32179fdacc6d01bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function runNavigator() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-position-button");
currentButton.addEventListener("click", runNavigator);

function showWeather(response) {
  let temperatureToday = document.querySelector("#today-degree");
  temperatureToday.innerHTML = Math.round(response.data.main.temp)
  let weatherStatusToday = document.querySelector("#today-weather-status");
  weatherStatusToday.innerHTML = response.data.weather[0].description;
  let humidityToday = document.querySelector("#today-humidity");
  humidityToday.innerHTML = response.data.main.humidity;
  let windToday = document.querySelector("#today-wind");
  windToday.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#city").innerHTML = response.data.name;
  let iconToday = document.querySelector("#today-icon");
  iconToday.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

searchCity ("Oslo");
