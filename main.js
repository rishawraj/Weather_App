(() => {
  // ===================================
  async function getCoordinates(city) {
    try {
      const response = fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=27724dba35d8d0160fe0e343853eed92`,
        { mode: "cors" }
      );
      const responseData = await response;
      const dataJson = await responseData.json();
      return [dataJson[0].lat, dataJson[0].lon];
    } catch (error) {
      window.alert(error);
    }
  }

  async function getWeatherData(city) {
    try {
      let coords = getCoordinates(city);
      const response = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=27724dba35d8d0160fe0e343853eed92&units=standard`,
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
      const temp = weatherData.main.temp;
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

      return {
        temp,
        cityname,
        weather_desctiption,
        country,
        wind,
        humidity,
        timezone,
        feels_like,
        icon,
      };
    } catch (error) {
      console.log(error);
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

  // getWeatherData("Chapra");

  submit.addEventListener("click", async (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    let data = await getWeatherData(`${input.value}`);
    input.value = "";

    temp.textContent = `${kelvinToCelsius(data.temp)} °C`;
    city.textContent = data.cityname + ", " + data.country;
    rain.textContent = data.weather_desctiption;
    date.textContent = getLocalTime(data.timezone);
    icon.src = `https://openweathermap.org/img/wn/${data.icon}.png`;
    feelsLike.textContent = `${kelvinToCelsius(data.feels_like)} °C`;
    humidity.textContent = data.humidity;
    wind.textContent = data.wind;

    console.log(data);
  });

  function getLocalTime(data) {
    let date = new Date();
    let time = date.getTime();
    let;
  }

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
})();
