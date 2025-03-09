
// Mock weather data generation

export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'partly-cloudy' | 'drizzle';
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  rainChance: number;
  hourlyForecast: Array<{ time: string; temperature: number; precipitation?: number; }>;
  dailyForecast: Array<{ day: string; high: number; low: number; weatherType: string; }>;
}

const weatherTypes = ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'partly-cloudy', 'drizzle'];

// Generate a random number between min and max
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random time in HH:MM format
const randomTime = () => {
  const hours = String(randomNumber(0, 23)).padStart(2, '0');
  const minutes = String(randomNumber(0, 59)).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Generate hourly forecast data
const generateHourlyForecast = (baseTemp: number) => {
  const hours = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const futureTime = new Date(now);
    futureTime.setHours(now.getHours() + i);
    
    const hourString = futureTime.getHours().toString().padStart(2, '0') + ':00';
    
    // Temperature varies slightly throughout the day
    const tempVariation = Math.sin((i / 24) * Math.PI * 2) * 5;
    const temperature = Math.round((baseTemp + tempVariation) * 10) / 10;
    
    // Add some random precipitation chance
    const precipitation = i > 6 && i < 18 ? randomNumber(0, 30) : 0;
    
    hours.push({
      time: hourString,
      temperature,
      precipitation
    });
  }
  
  return hours;
};

// Generate daily forecast data
const generateDailyForecast = (baseTemp: number) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forecast = [];
  const now = new Date();
  const currentDayIndex = now.getDay();
  
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex + i) % 7;
    const tempVariation = randomNumber(-8, 8);
    
    forecast.push({
      day: days[dayIndex],
      high: Math.round(baseTemp + Math.abs(tempVariation)),
      low: Math.round(baseTemp - Math.abs(tempVariation)),
      weatherType: weatherTypes[randomNumber(0, weatherTypes.length - 1)]
    });
  }
  
  return forecast;
};

export const getWeatherData = (city: string): WeatherData => {
  const baseTemp = randomNumber(5, 35);
  const weatherTypeIndex = randomNumber(0, weatherTypes.length - 1);
  
  return {
    city,
    temperature: baseTemp,
    feelsLike: baseTemp + randomNumber(-3, 3),
    weatherType: weatherTypes[weatherTypeIndex] as any,
    humidity: randomNumber(30, 90),
    windSpeed: randomNumber(0, 30),
    pressure: randomNumber(980, 1040),
    visibility: randomNumber(1, 20),
    uvIndex: randomNumber(0, 11),
    sunrise: '06:' + String(randomNumber(0, 59)).padStart(2, '0'),
    sunset: '19:' + String(randomNumber(0, 59)).padStart(2, '0'),
    rainChance: randomNumber(0, 100),
    hourlyForecast: generateHourlyForecast(baseTemp),
    dailyForecast: generateDailyForecast(baseTemp)
  };
};
