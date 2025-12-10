import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import WeeklyForecast from './WeeklyForecast';
import { municipalityCoordinates, fetchWeatherData } from '../utils/weatherApi';

function Home() {
  const [selectedMunicipality, setSelectedMunicipality] = useState('isabela');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const municipalities = Object.keys(municipalityCoordinates).map(key => ({
    id: key,
    name: municipalityCoordinates[key].name
  }));

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(selectedMunicipality);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [selectedMunicipality]);

  const handleMunicipalityChange = (e) => {
    setSelectedMunicipality(e.target.value);
  };

  const getWeatherEmoji = (weatherCondition) => {
    const emojis = {
      'Clear': '☀️',
      'Mostly Clear': '🌤️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Foggy': '🌫️',
      'Light Drizzle': '🌦️',
      'Drizzle': '🌧️',
      'Dense Drizzle': '🌧️',
      'Slight Rain': '🌧️',
      'Moderate Rain': '🌧️',
      'Heavy Rain': '⛈️',
      'Slight Snow': '❄️',
      'Moderate Snow': '❄️',
      'Heavy Snow': '❄️',
      'Slight Rain Showers': '🌦️',
      'Moderate Rain Showers': '🌧️',
      'Violent Rain Showers': '⛈️',
      'Slight Snow Showers': '❄️',
      'Heavy Snow Showers': '❄️',
      'Thunderstorm': '⛈️',
      'Thunderstorm with Hail': '⛈️'
    };
    return emojis[weatherCondition] || '🌤️';
  };

  return (
    <div className="home-container">
      <div className="weather-app">
        <div className="header">
          <h1>SkyCast</h1>
          <p className="subtitle">Weather Forecast</p>
        </div>

        <div className="municipality-selector">
          <label htmlFor="municipality">Select Municipality:</label>
          <select 
            id="municipality" 
            value={selectedMunicipality} 
            onChange={handleMunicipalityChange}
            className="select-dropdown"
          >
            {municipalities.map((mun) => (
              <option key={mun.id} value={mun.id}>
                {mun.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="loading">
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {weatherData && !loading && (
          <>
            <div className="municipality-name">
              <h2>{weatherData.name}</h2>
            </div>

            <div className="weather-cards">
              <div className="weather-card main-weather">
                <div className="weather-icon">
                  <span className="icon">{getWeatherEmoji(weatherData.current.weather)}</span>
                </div>
                <div className="weather-info">
                  <p className="weather-condition">{weatherData.current.weather}</p>
                  <p className="temperature">{weatherData.current.temperature}°C</p>
                </div>
              </div>

              <div className="weather-card">
                <div className="card-icon">💧</div>
                <div className="card-content">
                  <p className="label">Chance of Rain</p>
                  <p className="value">{weatherData.current.chanceOfRain}%</p>
                </div>
              </div>

              <div className="weather-card">
                <div className="card-icon">🌡️</div>
                <div className="card-content">
                  <p className="label">Heat Index</p>
                  <p className="value">{weatherData.current.heatIndex}°C</p>
                </div>
              </div>
            </div>

            <div className="additional-info">
              <div className="info-item">
                <span className="info-label">Humidity</span>
                <span className="info-value">{weatherData.current.humidity}%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Wind Speed</span>
                <span className="info-value">{weatherData.current.windSpeed} km/h</span>
              </div>
              <div className="info-item">
                <span className="info-label">Min Temperature</span>
                <span className="info-value">{weatherData.current.minTemperature}°C</span>
              </div>
              <div className="info-item">
                <span className="info-label">Precipitation</span>
                <span className="info-value">{weatherData.current.precipitation} mm</span>
              </div>
            </div>

            <WeeklyForecast forecast={weatherData.forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
