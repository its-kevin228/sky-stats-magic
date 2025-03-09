
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, CloudLightning, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyForecastProps {
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    weatherType: string;
  }>;
  className?: string;
}

const weatherIcons: Record<string, React.ReactNode> = {
  'sunny': <Sun className="w-6 h-6 text-amber-500" />,
  'cloudy': <Cloud className="w-6 h-6 text-gray-400" />,
  'rainy': <CloudRain className="w-6 h-6 text-blue-400" />,
  'stormy': <CloudLightning className="w-6 h-6 text-indigo-500" />,
  'snowy': <CloudSnow className="w-6 h-6 text-blue-100" />,
  'partly-cloudy': <CloudSun className="w-6 h-6 text-amber-400" />,
  'drizzle': <CloudDrizzle className="w-6 h-6 text-blue-300" />
};

const DailyForecast = ({ forecast, className }: DailyForecastProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-card p-6", className)}
    >
      <h3 className="text-lg font-medium mb-4 text-weather-darkBlue">7-Day Forecast</h3>
      
      <div className="flex flex-col divide-y divide-weather-blue/10">
        {forecast.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <span className="font-medium text-weather-darkBlue w-10">{day.day}</span>
            <div className="flex-1 flex justify-center">
              {weatherIcons[day.weatherType]}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-weather-darkBlue font-medium">{day.high}°</span>
              <span className="text-weather-darkBlue/60">{day.low}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyForecast;
