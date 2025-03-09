
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, MapPin, Bell, BellOff, AlertCircle, Shield, Wind, Thermometer } from 'lucide-react';
import Navbar from '@/components/Navbar';

const alertsData = [
  {
    id: 1,
    type: 'severe',
    title: 'Severe Thunderstorm Warning',
    location: 'Paris',
    time: '2h ago',
    description: 'Severe thunderstorms with potential for damaging winds and large hail.',
    active: true,
    icon: <AlertTriangle size={20} className="text-red-500" />
  },
  {
    id: 2,
    type: 'warning',
    title: 'Heat Advisory',
    location: 'New York',
    time: '5h ago',
    description: 'Temperatures expected to reach 95°F (35°C) with high humidity.',
    active: true,
    icon: <Thermometer size={20} className="text-orange-500" />
  },
  {
    id: 3,
    type: 'info',
    title: 'Air Quality Alert',
    location: 'Tokyo',
    time: '1d ago',
    description: 'Air quality index has reached moderate levels. Sensitive groups should limit outdoor activity.',
    active: true,
    icon: <Info size={20} className="text-blue-500" />
  },
  {
    id: 4,
    type: 'warning',
    title: 'Wind Advisory',
    location: 'London',
    time: '6h ago',
    description: 'Strong winds with gusts up to 45 mph expected throughout the day.',
    active: false,
    icon: <Wind size={20} className="text-yellow-500" />
  },
  {
    id: 5,
    type: 'severe',
    title: 'Flood Warning',
    location: 'Sydney',
    time: '2d ago',
    description: 'Heavy rainfall causing rising water levels in rivers and streams.',
    active: false,
    icon: <AlertCircle size={20} className="text-red-500" />
  }
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState('all');

  const toggleAlertActive = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : filter === 'active' 
      ? alerts.filter(alert => alert.active) 
      : alerts.filter(alert => !alert.active);

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
            Weather Alerts
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-weather-darkBlue">Active Alerts</h1>
          <p className="text-gray-600 mt-2">Stay informed about severe weather and other hazardous conditions</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? "bg-weather-blue text-white shadow-md"
                : "bg-white/50 backdrop-blur-sm hover:bg-white/80"
            }`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'active'
                ? "bg-weather-blue text-white shadow-md"
                : "bg-white/50 backdrop-blur-sm hover:bg-white/80"
            }`}
          >
            Active Alerts
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'inactive'
                ? "bg-weather-blue text-white shadow-md"
                : "bg-white/50 backdrop-blur-sm hover:bg-white/80"
            }`}
          >
            Dismissed Alerts
          </button>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`glass-card p-5 border-l-4 ${
                alert.type === 'severe' 
                  ? 'border-red-500' 
                  : alert.type === 'warning' 
                    ? 'border-yellow-500' 
                    : 'border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {alert.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-weather-darkBlue">{alert.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {alert.location}
                      <span className="mx-2">•</span>
                      {alert.time}
                    </div>
                    <p className="mt-2 text-gray-600">{alert.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleAlertActive(alert.id)}
                  className="text-gray-400 hover:text-weather-blue transition-colors"
                >
                  {alert.active ? <Bell size={20} /> : <BellOff size={20} />}
                </button>
              </div>
            </motion.div>
          ))}

          {filteredAlerts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Shield size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-weather-darkBlue">No Alerts Found</h3>
              <p className="text-gray-500 mt-2">There are no weather alerts matching your current filter.</p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 glass-card p-6"
        >
          <h2 className="text-xl font-bold text-weather-darkBlue mb-4">Stay Informed</h2>
          <p className="text-gray-600 mb-6">
            Weather alerts are issued by meteorological services when hazardous weather conditions are expected. 
            Stay safe by keeping track of active alerts in your area.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 rounded-lg p-4 flex flex-col items-center text-center">
              <AlertTriangle size={32} className="text-red-500 mb-2" />
              <h3 className="font-bold text-weather-darkBlue">Severe Alerts</h3>
              <p className="text-sm text-gray-500 mt-1">
                Immediate action required for life-threatening situations
              </p>
            </div>
            
            <div className="bg-white/50 rounded-lg p-4 flex flex-col items-center text-center">
              <AlertCircle size={32} className="text-yellow-500 mb-2" />
              <h3 className="font-bold text-weather-darkBlue">Warnings</h3>
              <p className="text-sm text-gray-500 mt-1">
                Hazardous weather expected - take precautions
              </p>
            </div>
            
            <div className="bg-white/50 rounded-lg p-4 flex flex-col items-center text-center">
              <Info size={32} className="text-blue-500 mb-2" />
              <h3 className="font-bold text-weather-darkBlue">Advisories</h3>
              <p className="text-sm text-gray-500 mt-1">
                Weather conditions that may cause inconvenience
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Alerts;
