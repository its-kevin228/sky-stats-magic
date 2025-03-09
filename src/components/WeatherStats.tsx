
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Thermometer, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset, 
  Umbrella 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherStatsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  rainChance: number;
  className?: string;
}

const WeatherStats = ({
  humidity,
  windSpeed,
  pressure,
  visibility,
  uvIndex,
  sunrise,
  sunset,
  rainChance,
  className
}: WeatherStatsProps) => {
  const stats = [
    { name: 'Humidity', value: `${humidity}%`, icon: <Droplets className="w-5 h-5" /> },
    { name: 'Wind Speed', value: `${windSpeed} km/h`, icon: <Wind className="w-5 h-5" /> },
    { name: 'Pressure', value: `${pressure} hPa`, icon: <Gauge className="w-5 h-5" /> },
    { name: 'Visibility', value: `${visibility} km`, icon: <Eye className="w-5 h-5" /> },
    { name: 'UV Index', value: uvIndex.toString(), icon: <Thermometer className="w-5 h-5" /> },
    { name: 'Sunrise', value: sunrise, icon: <Sunrise className="w-5 h-5" /> },
    { name: 'Sunset', value: sunset, icon: <Sunset className="w-5 h-5" /> },
    { name: 'Rain Chance', value: `${rainChance}%`, icon: <Umbrella className="w-5 h-5" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-card p-6", className)}
    >
      <h3 className="text-lg font-medium mb-4 text-weather-darkBlue">Weather Details</h3>
      
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-full bg-weather-blue/10 flex items-center justify-center mb-2 text-weather-blue">
              {stat.icon}
            </div>
            <p className="text-sm font-medium text-weather-darkBlue/70">{stat.name}</p>
            <p className="text-lg font-medium text-weather-darkBlue">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherStats;
