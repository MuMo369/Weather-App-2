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

let apiKey = "53aff9595b18349d32179fdacc6d01bf";

function searchCity (city) {
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function runNavigator() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-position-button");
currentButton.addEventListener("click", runNavigator);

function showWeather(response) {
console.log (response);
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
  let arrayCoordinates = [`${response.data.coord.lat}`, `${response.data.coord.lon}`];
  searchForecastData (arrayCoordinates);

}

function searchForecastData (array) {
console.log (array);
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${array[0]}&lon=${array[1]}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
axios.get(`${apiUrl}`).then(showForecast)
}

function showForecast (forecast) {
console.log(forecast);
let firstDayTemperature = document.querySelector("#first-day-temperature");
firstDayTemperature.innerHTML = Math.round(forecast.data.daily[0].temp.day);
let firstDayDescription = document.querySelector("#first-day-description");
firstDayDescription.innerHTML = forecast.data.daily[0].weather[0].description;
let firstDayIcon = document.querySelector("#first-day-icon");
firstDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.data.daily[0].weather[0].icon}@2x.png`);

let secondDayTemperature = document.querySelector("#second-day-temperature");
secondDayTemperature.innerHTML = Math.round(forecast.data.daily[1].temp.day);
let secondDayDescription = document.querySelector("#second-day-description");
secondDayDescription.innerHTML = forecast.data.daily[1].weather[0].description;
let secondDayIcon = document.querySelector("#second-day-icon");
secondDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.data.daily[1].weather[0].icon}@2x.png`);

let thirdDayTemperature = document.querySelector("#third-day-temperature");
thirdDayTemperature.innerHTML = Math.round(forecast.data.daily[2].temp.day);
let thirdDayDescription = document.querySelector("#third-day-description");
thirdDayDescription.innerHTML = forecast.data.daily[2].weather[0].description;
let thirdDayIcon = document.querySelector("#third-day-icon");
thirdDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.data.daily[2].weather[0].icon}@2x.png`);

let fourthDayTemperature = document.querySelector("#fourth-day-temperature");
fourthDayTemperature.innerHTML = Math.round(forecast.data.daily[3].temp.day);
let fourthDayDescription = document.querySelector("#fourth-day-description");
fourthDayDescription.innerHTML = forecast.data.daily[3].weather[0].description;
let fourthDayIcon = document.querySelector("#fourth-day-icon");
fourthDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.data.daily[3].weather[0].icon}@2x.png`);

let fifthDayTemperature = document.querySelector("#fifth-day-temperature");
fifthDayTemperature.innerHTML = Math.round(forecast.data.daily[4].temp.day);
let fifthDayDescription = document.querySelector("#fifth-day-description");
fifthDayDescription.innerHTML = forecast.data.daily[4].weather[0].description;
let fifthDayIcon = document.querySelector("#fifth-day-icon");
fifthDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.data.daily[4].weather[0].icon}@2x.png`);

}

searchCity ("Oslo");