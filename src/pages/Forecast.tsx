
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getWeatherData } from '@/lib/weatherData';

const Forecast = () => {
  const [selectedCity, setSelectedCity] = useState('Lomé');
  const [view, setView] = useState('week'); // 'week' or 'day'
  const [forecastData, setForecastData] = useState<any>(null);

  useEffect(() => {
    const data = getWeatherData(selectedCity);
    setForecastData(data);
  }, [selectedCity]);

  if (!forecastData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-weather-blue/10 text-weather-blue text-xs md:text-sm font-medium">
            Prévisions étendues
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-2">Prévisions sur 10 jours</h1>
          <p className="text-gray-700 text-sm md:text-base">Prévisions précises pour {selectedCity}</p>
        </div>

        {/* City selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {['Lomé', 'Kara', 'Sokodé', 'Kpalimé', 'Atakpamé'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm transition-all ${selectedCity === city
                  ? 'bg-weather-blue text-white font-medium'
                  : 'bg-white/80 hover:bg-white/90 text-weather-darkBlue font-medium'
                  }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-glass-sm">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm transition-all ${view === 'week'
                ? 'bg-weather-blue text-white font-medium'
                : 'text-weather-darkBlue hover:bg-white/80 font-medium'
                }`}
            >
              Prévisions sur 10 jours
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm transition-all ${view === 'day'
                ? 'bg-weather-blue text-white font-medium'
                : 'text-weather-darkBlue hover:bg-white/80 font-medium'
                }`}
            >
              Prévisions horaires
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-glass-sm"
          >
            <h3 className="text-gray-700 text-xs md:text-sm mb-2">Humidity</h3>
            <div className="flex items-center">
              <Droplets className="text-blue-500 mr-2" size={20} />
              <span className="text-lg md:text-xl font-bold">{forecastData.humidity}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-glass-sm"
          >
            <h3 className="text-gray-700 text-xs md:text-sm mb-2">Wind Speed</h3>
            <div className="flex items-center">
              <Wind className="text-blue-500 mr-2" size={20} />
              <span className="text-lg md:text-xl font-bold">{forecastData.windSpeed} km/h</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-glass-sm"
          >
            <h3 className="text-gray-700 text-xs md:text-sm mb-2">Max Temperature</h3>
            <div className="flex items-center">
              <Thermometer className="text-red-500 mr-2" size={20} />
              <span className="text-lg md:text-xl font-bold">{Math.round(forecastData.temperature + 3)}°C</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-glass-sm"
          >
            <h3 className="text-gray-700 text-xs md:text-sm mb-2">Min Temperature</h3>
            <div className="flex items-center">
              <Thermometer className="text-blue-500 mr-2" size={20} />
              <span className="text-lg md:text-xl font-bold">{Math.round(forecastData.temperature - 4)}°C</span>
            </div>
          </motion.div>
        </div>

        {/* Forecast display */}
        {view === 'week' ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-glass">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-xs md:text-sm font-medium text-gray-500">Date</th>
                    <th className="py-3 px-4 text-center text-xs md:text-sm font-medium text-gray-500">Weather</th>
                    <th className="py-3 px-4 text-center text-xs md:text-sm font-medium text-gray-500">Temperature</th>
                    <th className="py-3 px-4 text-center text-xs md:text-sm font-medium text-gray-500">Precipitation</th>
                    <th className="py-3 px-4 text-center text-xs md:text-sm font-medium text-gray-500">Wind</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-700">Mon, Jun 5</td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center items-center"><Cloud className="text-gray-500" size={18} /></div></td>
                    <td className="py-3 px-4 text-center text-xs md:text-sm font-medium">24°C / 18°C</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center"><Droplets className="text-blue-500" size={18} /></div>
                      <span className="text-xs text-gray-500">20%</span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs md:text-sm">12 km/h</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-700">Tue, Jun 6</td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center items-center"><Cloud className="text-gray-500" size={18} /></div></td>
                    <td className="py-3 px-4 text-center text-xs md:text-sm font-medium">26°C / 17°C</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center"><Droplets className="text-blue-500" size={18} /></div>
                      <span className="text-xs text-gray-500">10%</span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs md:text-sm">8 km/h</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-700">Wed, Jun 7</td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center items-center"><Cloud className="text-gray-500" size={18} /></div></td>
                    <td className="py-3 px-4 text-center text-xs md:text-sm font-medium">25°C / 16°C</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center"><Droplets className="text-blue-500" size={18} /></div>
                      <span className="text-xs text-gray-500">30%</span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs md:text-sm">15 km/h</td>
                  </tr>
                  {/* More rows would be here */}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-glass-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs md:text-sm text-gray-500">{`${(i + 8) % 12 || 12}:00 ${i + 8 < 12 || i + 8 >= 24 ? 'AM' : 'PM'}`}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">Now {i === 0 ? '(Now)' : ''}</span>
                </div>
                <div className="flex justify-center my-3">
                  <Cloud className="text-gray-600" size={i === 2 || i === 5 ? 30 : 24} />
                </div>
                <div className="text-center font-medium">{`${Math.round(22 - i * 0.5)}°C`}</div>
                <div className="flex justify-between items-center mt-3 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Droplets className="mr-1 text-blue-500" size={14} />
                    <span>{`${10 + i * 5}%`}</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="mr-1 text-gray-400" size={14} />
                    <span>{`${8 + i}km/h`}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Forecast;
