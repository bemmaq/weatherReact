import React, { useEffect, useState } from "react";
import "./App.css";
import Cloudy from "./assets/img/clouds.png";
import Rain from "./assets/img/run.png";
import Clear from "./assets/img/clear.png";
import Sun from "./assets/img/sun.png";
import Snow from "./assets/img/snow.png";
import Mist from "./assets/img/mist.png";

const _baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "6511e14723ad8cb6f243ece1366c5deb";

const App = () => {
  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState("");

  const fetchWeather = async (name = "Bishkek") => {
    try {
      const res = await fetch(`${_baseUrl}${name}&appid=${apiKey}`);

      const data = await res.json();
      console.log(data);
      setCityData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const weatherImg = (weather) => {
    switch (weather) {
      case "Rain":
        return Rain;

      case "Clouds":
        return Cloudy;

      case "Clear":
        return Clear;

      case "Snow":
        return Snow;

      case "Sun":
        return Sun;

      case "Mist":
        return Mist;

      default:
        return;
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!cityData) {
    return <h1 className="load">Loading...</h1>;
  }
  if (cityData.cod == 404) {
    return <h1 className="load">{cityData.message}</h1>;
  }

  return (
    <div className="content">
      <div className="container">
        <div className="content_weather">
          <div className="boxes">
            <h1>Weather forecast</h1>
            <input
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              type="text"
              placeholder="Enter the name of the city"
            />
            <button className="btn" onClick={() => fetchWeather(cityName)}>
              Show
            </button>
          </div>
          <div className="blocks">
            <div className="weather">
              <h3 className="weatherName">{cityData.name}</h3>
              <div className="mathtemp">
                <span className="temp">
                  {Math.floor(cityData.main.temp - 273.15)}{" "}
                </span>
                <span className="temp1">°c</span>
              </div>
              <div className="winds">
                <p className="wind">{cityData.weather[0].main}</p>
                <p className="wind">Wind: {cityData.wind.speed} km</p>
                <p className="wind">Country: {cityData.sys.country}</p>
              </div>
            </div>
            <div className="weather-img">
              <img src={weatherImg(cityData.weather[0].main)} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
