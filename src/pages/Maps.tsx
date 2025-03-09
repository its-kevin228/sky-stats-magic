
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Cloud, Droplets, Wind, MapPin, Layers } from 'lucide-react';

const Maps = () => {
  const [activeLayer, setActiveLayer] = useState('temperature');

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
            Weather Maps
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-weather-darkBlue">Interactive Weather Maps</h1>
          <p className="text-gray-600 mt-2">View weather patterns and forecasts on an interactive map</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-6">
          <LayerButton 
            active={activeLayer === 'temperature'} 
            onClick={() => setActiveLayer('temperature')}
            icon={<div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mr-2" />}
            label="Temperature"
          />
          <LayerButton 
            active={activeLayer === 'precipitation'} 
            onClick={() => setActiveLayer('precipitation')}
            icon={<Droplets size={16} className="text-blue-400 mr-2" />}
            label="Precipitation"
          />
          <LayerButton 
            active={activeLayer === 'wind'} 
            onClick={() => setActiveLayer('wind')}
            icon={<Wind size={16} className="mr-2" />}
            label="Wind"
          />
          <LayerButton 
            active={activeLayer === 'clouds'} 
            onClick={() => setActiveLayer('clouds')}
            icon={<Cloud size={16} className="text-gray-400 mr-2" />}
            label="Clouds"
          />
          <LayerButton 
            active={activeLayer === 'pressure'} 
            onClick={() => setActiveLayer('pressure')}
            icon={<Layers size={16} className="mr-2" />}
            label="Pressure"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[600px] glass-card overflow-hidden"
        >
          {/* Mock Map Interface */}
          <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MapPin size={48} className="mx-auto mb-2 text-weather-blue" />
              <p>Interactive Weather Map</p>
              <p className="text-sm mt-2">Currently displaying: {capitalizeFirstLetter(activeLayer)}</p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-2 flex flex-col space-y-2">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">+</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">−</button>
          </div>

          {/* Legend based on active layer */}
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-3">
            <div className="text-xs font-medium mb-2">Legend: {capitalizeFirstLetter(activeLayer)}</div>
            {activeLayer === 'temperature' && (
              <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full mb-1"></div>
            )}
            {activeLayer === 'precipitation' && (
              <div className="h-2 w-32 bg-gradient-to-r from-blue-100 to-blue-700 rounded-full mb-1"></div>
            )}
            {activeLayer === 'wind' && (
              <div className="h-2 w-32 bg-gradient-to-r from-green-200 to-green-800 rounded-full mb-1"></div>
            )}
            {activeLayer === 'clouds' && (
              <div className="h-2 w-32 bg-gradient-to-r from-gray-100 to-gray-700 rounded-full mb-1"></div>
            )}
            {activeLayer === 'pressure' && (
              <div className="h-2 w-32 bg-gradient-to-r from-orange-100 to-purple-700 rounded-full mb-1"></div>
            )}
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-5"
          >
            <h3 className="font-bold text-lg text-weather-darkBlue mb-3">Popular Locations</h3>
            <div className="space-y-3">
              {['Paris', 'New York', 'Tokyo', 'London', 'Sydney'].map((city, index) => (
                <div key={index} className="p-3 bg-white/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-weather-blue mr-2" />
                    <span>{city}</span>
                  </div>
                  <button className="text-xs bg-weather-blue/10 hover:bg-weather-blue/20 text-weather-blue px-2 py-1 rounded transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-5 md:col-span-2"
          >
            <h3 className="font-bold text-lg text-weather-darkBlue mb-3">Weather Insights</h3>
            <p className="text-gray-600 mb-4">
              Our interactive weather maps provide real-time data on weather patterns around the world. 
              Select different layers to visualize temperature, precipitation, wind, clouds, and atmospheric pressure.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/50 p-3 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded-full" />
                </div>
                <div className="text-xs font-medium mt-2">Temperature</div>
              </div>
              
              <div className="bg-white/50 p-3 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto flex items-center justify-center">
                  <Droplets size={24} className="text-blue-400" />
                </div>
                <div className="text-xs font-medium mt-2">Precipitation</div>
              </div>
              
              <div className="bg-white/50 p-3 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto flex items-center justify-center">
                  <Wind size={24} className="text-green-500" />
                </div>
                <div className="text-xs font-medium mt-2">Wind</div>
              </div>
              
              <div className="bg-white/50 p-3 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto flex items-center justify-center">
                  <Cloud size={24} className="text-gray-400" />
                </div>
                <div className="text-xs font-medium mt-2">Clouds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface LayerButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const LayerButton = ({ active, onClick, icon, label }: LayerButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-weather-blue text-white shadow-md"
          : "bg-white/50 backdrop-blur-sm hover:bg-white/80"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Maps;
