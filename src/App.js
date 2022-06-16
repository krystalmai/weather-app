import React, { useState, useEffect } from "react";
import "./App.css";

const API = {
  key: "ce2477d764a11cf3a35fb8f11a991e8c",
  base: "https://api.openweathermap.org/data/2.5/weather",
};
const iconBase = "http://openweathermap.org/img/wn/";
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    const getWeatherData = async () => {
      if (!searchCity) {
        return;
      }
      setLoading(true);

      try {
        const url = `${API.base}?q=${searchCity}&units=metric&appid=${API.key}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setWeatherInfo({
            name: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });

          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }

      setLoading(false);
    };
    getWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  const iconUrl = `${iconBase}${weatherInfo.icon}@2x.png`;
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          className="search-box"
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div className="error-msg">{errorMessage}</div>
      ) : (
        searchCity && (
          <div className="weather-card">
            <h2 className="location">
              {weatherInfo.name}, {weatherInfo.country}
            </h2>
            <img className="icon" src={iconUrl} alt="" />
            <h1 className="temp">{weatherInfo.temp}&#176;C</h1>
            <p className="description">{weatherInfo.description}</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
