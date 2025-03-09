
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherCard from '@/components/WeatherCard';
import WeatherChart from '@/components/WeatherChart';
import WeatherStats from '@/components/WeatherStats';
import CitySelector from '@/components/CitySelector';
import DailyForecast from '@/components/DailyForecast';
import WeatherLoader from '@/components/WeatherLoader';
import Navbar from '@/components/Navbar';
import { getWeatherData, type WeatherData } from '@/lib/weatherData';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Paris');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      
      // Simulate API call with a delay
      setTimeout(() => {
        const data = getWeatherData(city);
        setWeatherData(data);
        setLoading(false);
      }, 1500);
    };
    
    fetchWeatherData();
  }, [city]);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className="min-h-screen bg-weather-bg">
      <Navbar />
      
      <AnimatePresence>
        {loading && <WeatherLoader />}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-weather-blue/10 text-weather-blue text-sm font-medium">
            Weather Forecast
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-weather-darkBlue">Premium Weather App</h1>
        </motion.div>
        
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeatherCard
              city={weatherData.city}
              temperature={weatherData.temperature}
              feelsLike={weatherData.feelsLike}
              weatherType={weatherData.weatherType}
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              className="lg:col-span-1"
            />
            
            <CitySelector 
              onSelectCity={handleCityChange}
              className="lg:col-span-2"
            />
            
            <WeatherChart
              data={weatherData.hourlyForecast}
              type="temperature"
              className="md:col-span-2 lg:col-span-1"
            />
            
            <WeatherChart
              data={weatherData.hourlyForecast}
              type="precipitation"
              className="md:col-span-2 lg:col-span-1"
            />
            
            <DailyForecast
              forecast={weatherData.dailyForecast}
              className="md:col-span-2 lg:col-span-1"
            />
            
            <WeatherStats
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              pressure={weatherData.pressure}
              visibility={weatherData.visibility}
              uvIndex={weatherData.uvIndex}
              sunrise={weatherData.sunrise}
              sunset={weatherData.sunset}
              rainChance={weatherData.rainChance}
              className="md:col-span-2 lg:col-span-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
