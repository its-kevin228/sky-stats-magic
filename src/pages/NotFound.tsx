
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-weather-bg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-weather-darkBlue mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">The page you are looking for does not exist.</p>
          <Link to="/" className="bg-weather-blue hover:bg-weather-darkBlue text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Go back to homepage
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
