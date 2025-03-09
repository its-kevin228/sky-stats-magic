
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getWeatherData, type WeatherData } from '@/lib/weatherData';
import WeatherLoader from '@/components/WeatherLoader';

const Forecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Paris');
  const cities = ['Paris', 'New York', 'Tokyo', 'London', 'Sydney'];

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      
      // Simulate API call with a delay
      setTimeout(() => {
        const data = getWeatherData(selectedCity);
        setWeatherData(data);
        setLoading(false);
      }, 800);
    };
    
    fetchWeatherData();
  }, [selectedCity]);

  if (loading) return <WeatherLoader />;

  return (
    <div className="min-h-screen bg-weather-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-weather-blue/10 text-weather-blue text-sm font-medium">
            5-Day Forecast
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-weather-darkBlue">Weather Forecast</h1>
          <p className="text-gray-600 mt-2">View detailed weather forecasts for the upcoming days</p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-6">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCity === city
                  ? "bg-weather-blue text-white shadow-md"
                  : "bg-white/50 backdrop-blur-sm hover:bg-white/80"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.dailyForecast.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-card p-4 flex flex-col items-center"
              >
                <div className="font-bold text-lg text-weather-darkBlue">{day.day}</div>
                
                <div className="my-4 relative">
                  {getWeatherIcon(day.weatherType)}
                </div>
                
                <div className="text-2xl font-bold mb-1">{day.high}°</div>
                <div className="text-sm text-gray-500 mb-4">{day.low}°</div>
                
                <div className="w-full border-t border-gray-100 pt-3 mt-auto">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center">
                      <Droplets size={14} className="mr-1" />
                      {Math.floor(Math.random() * 100)}%
                    </div>
                    <div className="flex items-center">
                      <Wind size={14} className="mr-1" />
                      {Math.floor(Math.random() * 30)} km/h
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {weatherData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 glass-card p-6"
          >
            <h2 className="text-xl font-bold text-weather-darkBlue mb-4">Detailed Forecast for {weatherData.city}</h2>
            <div className="space-y-4">
              {weatherData.dailyForecast.map((day, index) => (
                <div key={index} className="p-4 bg-white/50 rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                  <div className="font-medium text-lg mb-2 md:mb-0">{day.day}</div>
                  <div className="flex items-center text-sm">
                    {getDetailedWeatherIcon(day.weatherType)}
                    <span className="mx-2">{capitalizeFirstLetter(day.weatherType)}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Thermometer size={16} className="text-red-500 mr-1" />
                      <span>{day.high}°</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer size={16} className="text-blue-500 mr-1" />
                      <span>{day.low}°</span>
                    </div>
                    <div className="flex items-center">
                      <Droplets size={16} className="text-blue-400 mr-1" />
                      <span>{Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <div className="flex items-center">
                      <Wind size={16} className="text-gray-500 mr-1" />
                      <span>{Math.floor(Math.random() * 30)} km/h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const getWeatherIcon = (weatherType: string) => {
  switch (weatherType) {
    case 'sunny':
      return <div className="w-16 h-16 flex items-center justify-center bg-yellow-400 rounded-full text-white"><Cloud className="opacity-0" size={24} /></div>;
    case 'cloudy':
      return <Cloud size={40} className="text-gray-400" />;
    case 'rainy':
      return <Droplets size={40} className="text-blue-400" />;
    case 'stormy':
      return <Cloud size={40} className="text-gray-600" />;
    case 'snowy':
      return <Cloud size={40} className="text-blue-200" />;
    case 'partly-cloudy':
      return <div className="relative"><div className="w-10 h-10 bg-yellow-400 rounded-full absolute -left-2" /><Cloud size={40} className="text-gray-400 relative z-10" /></div>;
    case 'drizzle':
      return <Droplets size={40} className="text-blue-300" />;
    default:
      return <Cloud size={40} />;
  }
};

const getDetailedWeatherIcon = (weatherType: string) => {
  // Same as above but smaller
  switch (weatherType) {
    case 'sunny':
      return <div className="w-6 h-6 flex items-center justify-center bg-yellow-400 rounded-full text-white"><Cloud className="opacity-0" size={10} /></div>;
    case 'cloudy':
      return <Cloud size={20} className="text-gray-400" />;
    case 'rainy':
      return <Droplets size={20} className="text-blue-400" />;
    case 'stormy':
      return <Cloud size={20} className="text-gray-600" />;
    case 'snowy':
      return <Cloud size={20} className="text-blue-200" />;
    case 'partly-cloudy':
      return <div className="relative"><div className="w-4 h-4 bg-yellow-400 rounded-full absolute -left-1" /><Cloud size={20} className="text-gray-400 relative z-10" /></div>;
    case 'drizzle':
      return <Droplets size={20} className="text-blue-300" />;
    default:
      return <Cloud size={20} />;
  }
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace(/-/g, ' ').slice(1);
};

export default Forecast;
