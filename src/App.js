import './App.css';
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [load, setLoad] = useState("false");

  function handleResponse(response) {
    setWeather({
      temp: Math.round(response.data.main.temp),
      wind: Math.round(response.data.wind.speed),
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = `3fdbb0c1f67069bd33e76ea8a1295d83`;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(handleResponse);

    setLoad(true);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        id="userLocation"
        placeholder="Location?"
        onChange={updateCity}
      ></input>
      <input type="submit" value="search"></input>
    </form>
  );

  let source = (
    <a href="https://github.com/maggiegmcd/cool-weather-zone">Open-Source Code</a>
  )

  if (load === true) {
    return (
      <div className="Search">
        <h1>Cool Weather Zone</h1>
        <img src={weather.icon} alt="weather icon" />
        <h2>{city}</h2>
        <ul>
          <li>Temperature: {weather.temp}°C</li>
          <li>Wind Speed: {weather.wind} km/hr</li>
          <li>Humidity: {weather.humidity}%</li>
        </ul>
        {form}
        {source}
      </div>
    );
  } else {
    return (
      <div className="Search">
        <h1>Cool Weather Zone</h1>
        {form}
        {source}
      </div>
    );
  }
}

export default App;
