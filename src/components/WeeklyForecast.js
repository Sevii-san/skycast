import React from 'react';
import '../styles/weeklyForecast.css';

function WeeklyForecast({ forecast }) {
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
    <div className="weekly-forecast">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p className="day-name">{day.dayName}</p>
            <div className="day-emoji">{getWeatherEmoji(day.weather)}</div>
            <p className="day-condition">{day.weather}</p>
            <div className="day-temps">
              <span className="max-temp">{day.temperature}°</span>
              <span className="min-temp">{day.minTemperature}°</span>
            </div>
            <div className="day-details">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-value">{day.chanceOfRain}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-value">{day.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecast;
