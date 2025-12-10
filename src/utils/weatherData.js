// Weather data for municipalities in Negros Occidental
export const municipalityData = {
  isabela: {
    name: "Isabela",
    weather: "Partly Cloudy",
    temperature: 28,
    chanceOfRain: 30,
    heatIndex: 35,
    humidity: 65,
    windSpeed: 12
  },
  binalbagan: {
    name: "Binalbagan",
    weather: "Sunny",
    temperature: 30,
    chanceOfRain: 10,
    heatIndex: 38,
    humidity: 55,
    windSpeed: 8
  },
  hinigaran: {
    name: "Hinigaran",
    weather: "Cloudy",
    temperature: 26,
    chanceOfRain: 45,
    heatIndex: 32,
    humidity: 72,
    windSpeed: 15
  },
  moisesPadilla: {
    name: "Moises Padilla",
    weather: "Rainy",
    temperature: 24,
    chanceOfRain: 80,
    heatIndex: 28,
    humidity: 85,
    windSpeed: 20
  },
  himamaylan: {
    name: "Himamaylan",
    weather: "Partly Cloudy",
    temperature: 27,
    chanceOfRain: 35,
    heatIndex: 33,
    humidity: 68,
    windSpeed: 11
  },
  laCastellana: {
    name: "La Castellana",
    weather: "Sunny",
    temperature: 29,
    chanceOfRain: 15,
    heatIndex: 36,
    humidity: 60,
    windSpeed: 10
  }
};

export const getWeatherData = (municipality) => {
  return municipalityData[municipality] || municipalityData.isabela;
};

export const getMunicipalityList = () => {
  return Object.keys(municipalityData).map(key => ({
    id: key,
    name: municipalityData[key].name
  }));
};
