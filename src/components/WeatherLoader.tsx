
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain } from 'lucide-react';

const WeatherLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-weather-gray/80 backdrop-blur-lg">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            className="text-amber-400"
          >
            <Sun size={40} />
          </motion.div>
          
          <motion.div
            animate={{ 
              x: [0, 10, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
            className="text-gray-400 ml-2"
          >
            <Cloud size={48} />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}
            className="text-blue-400 ml-2"
          >
            <CloudRain size={36} />
          </motion.div>
        </div>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg font-medium text-weather-darkBlue"
        >
          Loading weather data...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WeatherLoader;
