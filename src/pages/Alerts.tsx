
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, BellOff, Calendar, MapPin, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample alert data
const alertsData = [
  {
    id: 1,
    type: 'Severe Thunderstorm',
    location: 'Lomé, Maritime',
    date: '2023-06-05',
    time: '15:00',
    severity: 'high',
    description: 'Severe thunderstorms expected with potential for damaging winds and heavy rainfall. Stay indoors and avoid unnecessary travel.',
    active: true
  },
  {
    id: 2,
    type: 'Flood Warning',
    location: 'Kpalimé, Plateaux',
    date: '2023-06-06',
    time: '08:00',
    severity: 'medium',
    description: 'Potential flooding in low-lying areas following heavy rainfall. Residents should prepare for possible evacuation.',
    active: true
  },
  {
    id: 3,
    type: 'High Temperature',
    location: 'Sokodé, Centrale',
    date: '2023-06-07',
    time: '12:00',
    severity: 'medium',
    description: 'Temperatures expected to reach 35°C. Stay hydrated and avoid outdoor activities during peak hours.',
    active: true
  },
  {
    id: 4,
    type: 'Wind Advisory',
    location: 'Kara, Kara',
    date: '2023-06-08',
    time: '10:00',
    severity: 'low',
    description: 'Strong winds expected with gusts up to 45 km/h. Secure loose objects and exercise caution while driving.',
    active: false
  },
  {
    id: 5,
    type: 'Air Quality Alert',
    location: 'Atakpamé, Plateaux',
    date: '2023-06-09',
    time: '09:00',
    severity: 'medium',
    description: 'Poor air quality due to increased dust levels. Those with respiratory conditions should limit outdoor exposure.',
    active: true
  }
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
  
  // Filter alerts based on selected criteria
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return alert.active;
    return alert.severity === filter;
  });
  
  // Toggle alert active status
  const toggleAlertActive = (id: number) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-weather-blue/10 text-weather-blue text-xs md:text-sm font-medium">
            Alertes Météo
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-weather-darkBlue mb-2">Alertes Météo Actives</h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">Restez informé des événements météorologiques importants et des dangers dans votre région</p>
        </div>
        
        {/* Filters */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all ${
              filter === 'all'
                ? 'bg-weather-blue text-white font-medium'
                : 'bg-white/60 hover:bg-white/80 text-gray-700'
            }`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all ${
              filter === 'high'
                ? 'bg-red-500 text-white font-medium'
                : 'bg-white/60 hover:bg-white/80 text-gray-700'
            }`}
          >
            High Severity
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all ${
              filter === 'medium'
                ? 'bg-orange-500 text-white font-medium'
                : 'bg-white/60 hover:bg-white/80 text-gray-700'
            }`}
          >
            Medium Severity
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all ${
              filter === 'low'
                ? 'bg-yellow-500 text-white font-medium'
                : 'bg-white/60 hover:bg-white/80 text-gray-700'
            }`}
          >
            Low Severity
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all ${
              filter === 'active'
                ? 'bg-green-500 text-white font-medium'
                : 'bg-white/60 hover:bg-white/80 text-gray-700'
            }`}
          >
            Active Only
          </button>
        </div>
        
        {/* Alerts */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-glass-sm border-l-4 ${
                alert.severity === 'high' 
                  ? 'border-red-500' 
                  : alert.severity === 'medium'
                    ? 'border-orange-500'
                    : 'border-yellow-500'
              }`}
            >
              <div className="flex flex-wrap items-start gap-4">
                <div className={`flex-shrink-0 rounded-full p-3 ${
                  alert.severity === 'high' 
                    ? 'bg-red-100' 
                    : alert.severity === 'medium'
                      ? 'bg-orange-100'
                      : 'bg-yellow-100'
                }`}>
                  <AlertTriangle className={`h-6 w-6 ${
                    alert.severity === 'high' 
                      ? 'text-red-500' 
                      : alert.severity === 'medium'
                        ? 'text-orange-500'
                        : 'text-yellow-500'
                  }`} />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">{alert.type}</h3>
                    <button 
                      onClick={() => toggleAlertActive(alert.id)}
                      className={`flex items-center space-x-1 rounded-full px-3 py-1 text-xs transition-colors ${
                        alert.active 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {alert.active ? (
                        <>
                          <Bell size={12} />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <BellOff size={12} />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-700 mb-3">{alert.description}</p>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1 text-gray-500" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" />
                      <span>{alert.date} at {alert.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Info size={14} className="mr-1 text-gray-500" />
                      <span>Severity: {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-glass-sm text-center">
              <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No alerts found</h3>
              <p className="text-gray-500 text-sm md:text-base">There are no alerts matching your current filter.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Alerts;
