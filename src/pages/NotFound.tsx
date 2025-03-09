import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-weather-bg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-weather-darkBlue mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
          <Link to="/" className="bg-weather-blue hover:bg-weather-darkBlue text-white font-bold py-2 px-4 rounded">
            Go back to homepage
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
