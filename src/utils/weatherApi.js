// Weather API Service - Using Open-Meteo (free weather API)
// No API key required, completely free to use

export const municipalityCoordinates = {
  isabela: {
    name: "Isabela",
    latitude: 10.7034,
    longitude: 122.0819
  },
  binalbagan: {
    name: "Binalbagan",
    latitude: 10.3119,
    longitude: 122.5369
  },
  hinigaran: {
    name: "Hinigaran",
    latitude: 10.4603,
    longitude: 122.8275
  },
  moisesPadilla: {
    name: "Moises Padilla",
    latitude: 10.2469,
    longitude: 122.7875
  },
  himamaylan: {
    name: "Himamaylan",
    latitude: 10.2969,
    longitude: 122.9669
  },
  laCastellana: {
    name: "La Castellana",
    latitude: 10.5119,
    longitude: 123.1403
  }
};

// Fetch weather data from Open-Meteo API
export const fetchWeatherData = async (municipality) => {
  try {
    const coords = municipalityCoordinates[municipality];
    if (!coords) {
      throw new Error("Municipality not found");
    }

    // Using Open-Meteo free weather API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,windspeed_10m_max,relative_humidity_2m_max,weathercode&timezone=Asia/Manila&forecast_days=7`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return formatWeatherData(data, coords);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Return fallback data if API fails
    return getFallbackWeatherData(municipality);
  }
};

// Format API response to our app structure
const formatWeatherData = (apiData, coordinates) => {
  const daily = apiData.daily;

  const weatherForecasts = daily.time.map((dateStr, index) => {
    const date = new Date(dateStr);
    const weatherCode = daily.weathercode[index];
    const weatherCondition = getWeatherCondition(weatherCode);

    return {
      date: dateStr,
      dayName: getDayName(date),
      temperature: Math.round(daily.temperature_2m_max[index]),
      minTemperature: Math.round(daily.temperature_2m_min[index]),
      chanceOfRain: daily.precipitation_probability_max[index] || 0,
      precipitation: daily.precipitation_sum[index] || 0,
      humidity: daily.relative_humidity_2m_max[index] || 0,
      windSpeed: Math.round(daily.windspeed_10m_max[index] || 0),
      weather: weatherCondition,
      heatIndex: calculateHeatIndex(
        daily.temperature_2m_max[index],
        daily.relative_humidity_2m_max[index] || 0
      )
    };
  });

  return {
    name: coordinates.name,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    current: weatherForecasts[0],
    forecast: weatherForecasts
  };
};

// Convert weather code to readable condition
const getWeatherCondition = (code) => {
  const weatherCodes = {
    0: "Clear",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Foggy",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Thunderstorm with Hail"
  };
  return weatherCodes[code] || "Unknown";
};

// Calculate heat index from temperature and humidity
const calculateHeatIndex = (temp, humidity) => {
  // Simplified heat index calculation
  // Full formula: HI = c1 + c2*T + c3*RH + c4*T*RH + c5*T² + c6*RH² + c7*T²*RH + c8*T*RH² + c9*T²*RH²
  const c1 = -42.379;
  const c2 = 2.04901523;
  const c3 = 10.14333127;
  const c4 = -0.22475541;
  const c5 = -0.00683783;
  const c6 = -0.05481717;
  const c7 = 0.00122874;
  const c8 = 0.00085282;
  const c9 = -0.00000199;

  const T = temp;
  const RH = humidity;

  const hi =
    c1 +
    c2 * T +
    c3 * RH +
    c4 * T * RH +
    c5 * T * T +
    c6 * RH * RH +
    c7 * T * T * RH +
    c8 * T * RH * RH +
    c9 * T * T * RH * RH;

  return Math.round(hi);
};

// Get day name from date
const getDayName = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};

// Fallback data if API fails
export const getFallbackWeatherData = (municipality) => {
  const coords = municipalityCoordinates[municipality];
  const mockData = {
    isabela: {
      current: {
        date: new Date().toISOString().split("T")[0],
        temperature: 28,
        minTemperature: 24,
        chanceOfRain: 30,
        precipitation: 0,
        humidity: 65,
        windSpeed: 12,
        weather: "Partly Cloudy",
        heatIndex: 35
      },
      forecast: [
        {
          date: new Date().toISOString().split("T")[0],
          dayName: "Today",
          temperature: 28,
          minTemperature: 24,
          chanceOfRain: 30,
          precipitation: 0,
          humidity: 65,
          windSpeed: 12,
          weather: "Partly Cloudy",
          heatIndex: 35
        },
        {
          date: getDateString(1),
          dayName: "Tue",
          temperature: 29,
          minTemperature: 25,
          chanceOfRain: 20,
          precipitation: 0,
          humidity: 60,
          windSpeed: 10,
          weather: "Sunny",
          heatIndex: 36
        },
        {
          date: getDateString(2),
          dayName: "Wed",
          temperature: 27,
          minTemperature: 23,
          chanceOfRain: 45,
          precipitation: 2,
          humidity: 70,
          windSpeed: 15,
          weather: "Cloudy",
          heatIndex: 34
        },
        {
          date: getDateString(3),
          dayName: "Thu",
          temperature: 26,
          minTemperature: 22,
          chanceOfRain: 60,
          precipitation: 5,
          humidity: 75,
          windSpeed: 18,
          weather: "Rainy",
          heatIndex: 32
        },
        {
          date: getDateString(4),
          dayName: "Fri",
          temperature: 27,
          minTemperature: 23,
          chanceOfRain: 40,
          precipitation: 2,
          humidity: 68,
          windSpeed: 14,
          weather: "Partly Cloudy",
          heatIndex: 33
        },
        {
          date: getDateString(5),
          dayName: "Sat",
          temperature: 29,
          minTemperature: 25,
          chanceOfRain: 15,
          precipitation: 0,
          humidity: 58,
          windSpeed: 9,
          weather: "Sunny",
          heatIndex: 37
        },
        {
          date: getDateString(6),
          dayName: "Sun",
          temperature: 28,
          minTemperature: 24,
          chanceOfRain: 25,
          precipitation: 0.5,
          humidity: 62,
          windSpeed: 11,
          weather: "Partly Cloudy",
          heatIndex: 35
        }
      ]
    }
  };

  return {
    name: coords.name,
    latitude: coords.latitude,
    longitude: coords.longitude,
    ...mockData.isabela
  };
};

// Helper function to get date string
const getDateString = (daysOffset) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
};
