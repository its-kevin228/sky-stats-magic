
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Minus, Plus, MapPin, Zap, Droplets, Cloud, Wind } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import mapboxgl from 'mapbox-gl';
import { mapboxToken } from '@/constants/mapboxToken';
import 'mapbox-gl/dist/mapbox-gl.css';

const Maps = () => {
  const [mapType, setMapType] = useState<'temperature' | 'precipitation' | 'cloud' | 'wind'>('temperature');
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (!mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [1.2255, 6.1319], // Lomé coordinates
      zoom: zoom,
      attributionControl: true
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    // Wait for map to load before adjusting zoom
    map.on('load', () => {
      map.resize(); // Ensure proper sizing
      map.setZoom(zoom);
    });

    // Cleanup on unmount
    return () => map.remove();
  }, [zoom, mapboxToken]); // Add mapboxToken to dependency array

  // Remove the second useEffect since we handle zoom in the main effect
  const handleZoomIn = () => {
    if (zoom < 20) setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-weather-blue/10 text-weather-blue text-xs md:text-sm font-medium">
            Cartes Météo
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-weather-darkBlue mb-2">Cartes Météo Interactives</h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">Explorez les conditions météorologiques en temps réel à travers le monde avec nos cartes interactives</p>
        </div>

        {/* Map type selection */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex flex-wrap justify-center bg-white/50 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setMapType('temperature')}
              className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all flex items-center space-x-1 ${mapType === 'temperature'
                ? 'bg-weather-blue text-white font-medium'
                : 'text-gray-700 hover:bg-white/50'
                }`}
            >
              <Zap size={14} className={mapType === 'temperature' ? 'text-white' : 'text-orange-500'} />
              <span className="hidden xs:inline">Temperature</span>
            </button>
            <button
              onClick={() => setMapType('precipitation')}
              className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all flex items-center space-x-1 ${mapType === 'precipitation'
                ? 'bg-weather-blue text-white font-medium'
                : 'text-gray-700 hover:bg-white/50'
                }`}
            >
              <Droplets size={14} className={mapType === 'precipitation' ? 'text-white' : 'text-blue-500'} />
              <span className="hidden xs:inline">Precipitation</span>
            </button>
            <button
              onClick={() => setMapType('cloud')}
              className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all flex items-center space-x-1 ${mapType === 'cloud'
                ? 'bg-weather-blue text-white font-medium'
                : 'text-gray-700 hover:bg-white/50'
                }`}
            >
              <Cloud size={14} className={mapType === 'cloud' ? 'text-white' : 'text-gray-500'} />
              <span className="hidden xs:inline">Cloud</span>
            </button>
            <button
              onClick={() => setMapType('wind')}
              className={`px-3 py-2 rounded-full text-xs md:text-sm transition-all flex items-center space-x-1 ${mapType === 'wind'
                ? 'bg-weather-blue text-white font-medium'
                : 'text-gray-700 hover:bg-white/50'
                }`}
            >
              <Wind size={14} className={mapType === 'wind' ? 'text-white' : 'text-gray-500'} />
              <span className="hidden xs:inline">Wind</span>
            </button>
          </div>
        </div>
        {/* Map container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/70 backdrop-blur-sm rounded-xl shadow-glass overflow-hidden h-[600px] w-full"
        >
          <div id="map" className="absolute inset-0 w-full h-full" />

          {/* Weather layer overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: mapType === 'temperature'
              ? 'linear-gradient(135deg, rgba(255,0,0,0.2) 0%, rgba(255,255,0,0.2) 50%, rgba(0,128,255,0.2) 100%)'
              : mapType === 'precipitation'
                ? 'linear-gradient(180deg, rgba(0,0,255,0.1) 0%, rgba(0,128,255,0.2) 100%)'
                : mapType === 'cloud'
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(200,200,200,0.1) 100%)'
                  : 'none'
          }} />
          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 transition-colors rounded-t-lg border-b border-gray-200"
              aria-label="Zoom in"
            >
              <Plus size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 transition-colors rounded-b-lg"
              aria-label="Zoom out"
            >
              <Minus size={18} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-2">
            <Layers size={18} className="mr-1 inline-block" />
            <span className="text-xs">Map layers</span>
          </div>

          {/* Weather pins for major Togolese cities */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group">
              <MapPin size={24} className="text-red-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white rounded-lg shadow-sm p-2 text-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="font-bold">Lomé</p>
                <p>{mapType === 'temperature' ? '32°C' : mapType === 'precipitation' ? '20%' : mapType === 'cloud' ? '25%' : '10 km/h'}</p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group">
              <MapPin size={24} className="text-blue-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white rounded-lg shadow-sm p-2 text-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="font-bold">Kara</p>
                <p>{mapType === 'temperature' ? '30°C' : mapType === 'precipitation' ? '25%' : mapType === 'cloud' ? '30%' : '12 km/h'}</p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group">
              <MapPin size={24} className="text-green-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white rounded-lg shadow-sm p-2 text-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="font-bold">Sokodé</p>
                <p>{mapType === 'temperature' ? '31°C' : mapType === 'precipitation' ? '22%' : mapType === 'cloud' ? '28%' : '11 km/h'}</p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group">
              <MapPin size={24} className="text-blue-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white rounded-lg shadow-sm p-2 text-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="font-bold">Kara</p>
                <p>{mapType === 'temperature' ? '30°C' : mapType === 'precipitation' ? '25%' : mapType === 'cloud' ? '30%' : '12 km/h'}</p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group">
              <MapPin size={24} className="text-green-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white rounded-lg shadow-sm p-2 text-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="font-bold">Sokodé</p>
                <p>{mapType === 'temperature' ? '31°C' : mapType === 'precipitation' ? '22%' : mapType === 'cloud' ? '28%' : '11 km/h'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-glass-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Map Legend</h3>
          <div className="flex flex-wrap gap-4">
            {mapType === 'temperature' && (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-red-500 mr-2"></div>
                  <span className="text-xs">Hot (≥30°C)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-orange-400 mr-2"></div>
                  <span className="text-xs">Warm (20-29°C)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-yellow-300 mr-2"></div>
                  <span className="text-xs">Mild (10-19°C)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-blue-300 mr-2"></div>
                  <span className="text-xs">Cool (0-9°C)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-blue-500 mr-2"></div>
                  <span className="text-xs">Cold (≤0°C)</span>
                </div>
              </>
            )}

            {mapType === 'precipitation' && (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-purple-700 mr-2"></div>
                  <span className="text-xs">Heavy (≥15mm)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-blue-600 mr-2"></div>
                  <span className="text-xs">Moderate (5-15mm)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-blue-400 mr-2"></div>
                  <span className="text-xs">Light (1-5mm)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-blue-200 mr-2"></div>
                  <span className="text-xs">Trace (≤1mm)</span>
                </div>
              </>
            )}

            {mapType === 'cloud' && (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-gray-700 mr-2"></div>
                  <span className="text-xs">Overcast (≥80%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-gray-500 mr-2"></div>
                  <span className="text-xs">Mostly Cloudy (60-80%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-gray-400 mr-2"></div>
                  <span className="text-xs">Partly Cloudy (30-60%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-gray-200 mr-2"></div>
                  <span className="text-xs">Mostly Clear (≤30%)</span>
                </div>
              </>
            )}

            {mapType === 'wind' && (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-red-500 mr-2"></div>
                  <span className="text-xs">Strong (≥50km/h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-orange-400 mr-2"></div>
                  <span className="text-xs">Moderate (30-50km/h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-yellow-300 mr-2"></div>
                  <span className="text-xs">Light (15-30km/h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded bg-blue-200 mr-2"></div>
                  <span className="text-xs">Calm (≤15km/h)</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Maps;
