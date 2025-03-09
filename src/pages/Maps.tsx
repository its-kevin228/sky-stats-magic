
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';

const Maps = () => {
  return (
    <div className="min-h-screen flex flex-col bg-weather-bg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-weather-blue/10 text-weather-blue text-sm font-medium">
            Cartes météo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-weather-darkBlue">Visualisez les conditions météorologiques</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Explorez des cartes interactives montrant les précipitations, températures, et autres données météorologiques en temps réel.
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-glass overflow-hidden mb-8">
          <div className="relative aspect-video w-full bg-gray-100 flex items-center justify-center">
            {/* Placeholder for the map */}
            <div className="text-center p-8">
              <MapPin size={48} className="mx-auto mb-4 text-weather-blue" />
              <h3 className="text-xl font-semibold text-weather-darkBlue">Carte Interactive</h3>
              <p className="text-gray-600 mt-2">
                La carte météo interactive sera chargée ici. Intégration avec Mapbox.
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 flex flex-wrap justify-between gap-2">
            <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              <Layers size={16} className="mr-2" />
              Couches
            </button>
            <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              <Navigation size={16} className="mr-2" />
              Ma position
            </button>
            <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              <Compass size={16} className="mr-2" />
              Vue satellite
            </button>
            <button className="flex items-center px-3 py-2 bg-weather-blue text-white hover:bg-weather-darkBlue rounded-lg text-sm font-medium transition-colors">
              <MapPin size={16} className="mr-2" />
              Rechercher un lieu
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MapOption 
            title="Précipitations" 
            description="Visualisez les précipitations en temps réel et les prévisions des prochaines heures."
            color="blue"
          />
          <MapOption 
            title="Températures" 
            description="Consultez les cartes de température avec différentes échelles de couleur."
            color="red"
          />
          <MapOption 
            title="Vent" 
            description="Visualisez la direction et la force du vent avec des animations fluides."
            color="green"
          />
          <MapOption 
            title="Radar" 
            description="Accédez aux images radar en temps réel pour suivre les systèmes météorologiques."
            color="purple"
          />
          <MapOption 
            title="Pression" 
            description="Consultez les cartes de pression atmosphérique et les systèmes frontaux."
            color="orange"
          />
          <MapOption 
            title="Satellite" 
            description="Explorez les images satellite montrant la couverture nuageuse globale."
            color="teal"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface MapOptionProps {
  title: string;
  description: string;
  color: "blue" | "red" | "green" | "purple" | "orange" | "teal";
}

const MapOption = ({ title, description, color }: MapOptionProps) => {
  const getColorClass = () => {
    switch (color) {
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      case "purple": return "bg-purple-500";
      case "orange": return "bg-orange-500";
      case "teal": return "bg-teal-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 hover:shadow-glass-hover transition-all"
    >
      <div className={`w-12 h-12 rounded-lg ${getColorClass()} flex items-center justify-center mb-4`}>
        <MapPin size={20} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold text-weather-darkBlue mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="mt-4">
        <button className="text-weather-blue hover:text-weather-darkBlue text-sm font-medium transition-colors flex items-center">
          Explorer
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default Maps;
