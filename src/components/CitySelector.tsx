
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CitySelectorProps {
  onSelectCity: (city: string) => void;
  className?: string;
}

const popularCities = [
  'Paris',
  'New York',
  'Tokyo',
  'London',
  'Sydney',
  'Dubai',
  'Singapore',
  'Rome',
];

const CitySelector = ({ onSelectCity, className }: CitySelectorProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectCity(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-card p-6", className)}
    >
      <h3 className="text-lg font-medium mb-4 text-weather-darkBlue">Select City</h3>
      
      <form onSubmit={handleSearch} className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-weather-blue/60 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/50 backdrop-blur-sm rounded-lg pl-10 pr-4 py-2 text-weather-darkBlue placeholder:text-weather-darkBlue/50 focus:outline-none focus:ring-2 focus:ring-weather-blue/20 transition-all"
        />
      </form>
      
      <div>
        <h4 className="text-sm font-medium text-weather-darkBlue/70 mb-3">Popular Cities</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {popularCities.map((city, index) => (
            <motion.button
              key={city}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              onClick={() => onSelectCity(city)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-white/30 hover:bg-white/50 backdrop-blur-sm text-weather-darkBlue transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {city}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CitySelector;
