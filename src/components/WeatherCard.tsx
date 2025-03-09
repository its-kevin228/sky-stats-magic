
import React from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, CloudLightning, Thermometer, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'partly-cloudy' | 'drizzle';

interface WeatherCardProps {
  city: string;
  temperature: number;
  feelsLike: number;
  weatherType: WeatherType;
  humidity: number;
  windSpeed: number;
  className?: string;
}

const weatherIcons: Record<WeatherType, React.ReactNode> = {
  'sunny': <Cloud className="w-16 h-16 text-amber-500" />,
  'cloudy': <Cloud className="w-16 h-16 text-gray-400" />,
  'rainy': <CloudRain className="w-16 h-16 text-blue-400" />,
  'stormy': <CloudLightning className="w-16 h-16 text-indigo-500" />,
  'snowy': <CloudSnow className="w-16 h-16 text-blue-100" />,
  'partly-cloudy': <CloudSun className="w-16 h-16 text-amber-400" />,
  'drizzle': <CloudDrizzle className="w-16 h-16 text-blue-300" />
};

const WeatherCard = ({
  city,
  temperature,
  feelsLike,
  weatherType,
  humidity,
  windSpeed,
  className
}: WeatherCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass-card p-6 flex flex-col w-full max-w-md transition-all duration-300 hover:shadow-card-hover",
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="weather-badge">{weatherType}</span>
          <h2 className="text-2xl font-medium mt-2 text-weather-darkGray">{city}</h2>
        </div>
        <motion.div 
          animate={{ y: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {weatherIcons[weatherType]}
        </motion.div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-6xl font-light text-weather-darkBlue">{temperature}°</span>
        <span className="text-sm text-weather-darkBlue/70 mb-2">Feels like {feelsLike}°</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="weather-stat">
          <div className="flex items-center gap-2 mb-1">
            <Thermometer className="w-4 h-4 text-weather-blue" />
            <span className="text-sm font-medium text-weather-darkBlue">Humidity</span>
          </div>
          <span className="text-xl font-light text-weather-darkBlue">{humidity}%</span>
        </div>
        
        <div className="weather-stat">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4 text-weather-blue" />
            <span className="text-sm font-medium text-weather-darkBlue">Wind</span>
          </div>
          <span className="text-xl font-light text-weather-darkBlue">{windSpeed} km/h</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
