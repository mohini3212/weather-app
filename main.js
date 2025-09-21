// start
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather-temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");
let cityInput = document.querySelector(".city-name");
let body = document.querySelector('#app-body');

// Get country name
const getCountryName = (code) => 
  new Intl.DisplayNames(["en"], { type: "region" }).of(code);

// Format date & time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

// Fetch weather data
const getWeatherData = async (city = "Delhi") => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=221d24cf1dd36369f4871c5f77173f8a`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    // Update UI
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    w_temperature.innerHTML = `${main.temp.toFixed()}&#176;C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176;C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176;C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed()}&#176;C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

    // Change background
    const weatherCondition = weather[0].main.toLowerCase();
    console.log("Weather:", weather[0].main, "Condition:", weatherCondition);

    let bgImage = "";

    switch (weatherCondition) {
      case "clear": bgImage = "images/clear.jpg"; break;
      case "clouds": bgImage = "images/cloudy.jpg"; break;
      case "haze": bgImage = "images/Haze.jpg"; break;
      case "mist": bgImage = "images/Mist.jpg"; break;
      case "rain": bgImage = "images/Rain.jpg"; break;
      case "sunny": bgImage = "images/sunny.jpg"; break;
      default: bgImage = "images/default.jpg"; 
    }

        body.style.backgroundImage =
  `linear-gradient(rgba(79,79,79,0), rgb(157,157,157)), url(${bgImage})`;


  } catch (error) {
    console.log(error);
  }
};

// Handle search
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
    cityInput.value = "";
  }
});

// ✅ Load default weather on page load
window.addEventListener("load", () => {
  getWeatherData("Delhi"); 
});

// end



