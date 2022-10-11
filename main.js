async function getCoordinates(city) {
  try {
    const response = fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=27724dba35d8d0160fe0e343853eed92`,
      { mode: "cors" }
    );
    const responseData = await response;
    const dataJson = await responseData.json();

    return [dataJson[0].lat, dataJson[0].lon];
  } catch (error) {
    // console.log(error);
  }
}

async function getWeatherData(city) {
  try {
    let coords = await getCoordinates(city);
    const response = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${+coords[0]}&lon=${+coords[1]}&appid=27724dba35d8d0160fe0e343853eed92&units=standard`,
      { mode: "cors" }
    );
    const responseData = await response;
    const weatherData = await responseData.json();
    console.log(weatherData);

    // city
    const cityname = weatherData.name;
    // country
    const country = weatherData.sys.country;
    // date time
    const timezone = weatherData.timezone;
    // temp celsius
    const temperature = weatherData.main.temp;
    // weather
    const weather_desctiption = weatherData.weather[0].description;
    // feels like
    const feels_like = weatherData.main.feels_like;
    // humidity
    const humidity = weatherData.main.humidity;
    // wind
    const wind = weatherData.wind.speed;
    // icon
    const icon = weatherData.weather[0].icon;
    // main
    const main = weatherData.weather[0].main;
    // id
    const id = weatherData.weather[0].id;

    return {
      temperature,
      cityname,
      weather_desctiption,
      country,
      wind,
      humidity,
      timezone,
      feels_like,
      icon,
      main,
      id,
    };
  } catch (error) {
    alert("Please enter a valid city!");
  }
}

//

const submit = document.querySelector("#submit");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const rain = document.querySelector(".rain");
const date = document.querySelector("#date");
const icon = document.querySelector("#icon");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  let data = await getWeatherData(`${input.value}`);
  // console.log(data);
  input.value = "";

  changeBackground(data.id, data.icon);

  temp.textContent = kelvinToCelsius(data.temperature);
  city.textContent = data.cityname + ", " + data.country;
  rain.textContent = data.weather_desctiption;
  date.textContent = getLocalTime(data.timezone);
  icon.src = `https://openweathermap.org/img/wn/${data.icon}.png`;
  feelsLike.textContent = kelvinToCelsius(data.feels_like);
  humidity.textContent = data.humidity;
  wind.textContent = data.wind;
});

// ?====================================================

function getLocalTime(data) {
  let date = new Date();
  let time = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = time + localOffset;
  let localTime = utc + 1000 * data;
  let localTimeDate = new Date(localTime);
  return localTimeDate.toLocaleString();
}

function kelvinToCelsius(kelvin) {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius);
}

function changeBackground(id, icon) {
  console.log(icon[2]);
  let d = String(id)[0];
  let c;
  if (d == "8") {
    c = icon[2] + String(id);
  } else {
    c = icon[2] + String(id)[0];
  }
  let url = "";
  console.log(c);
  switch (c) {
    case "d2":
      url = "./resources/thunderstorm.jpg";
      break;

    case "d3":
      url = "./resources/drizzle.jpg";
      break;

    case "d5":
      url = "./resources/rain.jpg";
      break;

    case "d6":
      url = "./resources/snow.jpg";
      break;

    case "d7":
      url = "./resources/atoms.jpg";
      break;

    case "d800":
      url = "./resources/clear.jpg";
      break;

    case "d801":
      url = "./resources/few_clouds.jpg";
      break;

    case "d802":
      url = "./resources/scattered_clouds.jpg";
      break;

    case "d803":
      url = "./resources/broken_clouds.jpg";
      break;

    case "d804":
      url = "./resources/overcast_clouds.jpg";
      break;
    // night ===================
    case "n5":
      url = "./resources/night_rain.jpg";
      break;

    case "n7":
      url = "./resources/atoms_night.jpg";
      break;

    case "n800":
      url = "./resources/clear_night.jpg";
      break;

    case "n801":
    case "n802":
    case "n803":
      url = "./resources/night_few_clouds.jpg";
      break;

    case "n804":
      url = "./resources/night_clouds.jpg";
      break;

    default:
      url = "./resources/atoms.jpg";
      break;
  }

  document.body.style.backgroundImage = `url(${url})`;
}
