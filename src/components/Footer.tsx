
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Github, Twitter, Facebook, Instagram, ExternalLink, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/70 border-t border-gray-200/50 dark:border-gray-800/50 py-8",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div 
                whileHover={{ rotate: 20 }}
                className="text-weather-blue"
              >
                <MapPin size={24} className="text-weather-blue" />
              </motion.div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-blue-gradient">
                SkyStats
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Votre application météo complète, avec des prévisions détaillées, des alertes et des cartes interactives pour planifier vos journées en toute confiance.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://github.com" icon={<Github size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Tableau de bord</FooterLink>
              <FooterLink href="/forecast">Prévisions</FooterLink>
              <FooterLink href="/maps">Cartes</FooterLink>
              <FooterLink href="/alerts">Alertes</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="/premium">Premium</FooterLink>
              <FooterLink href="/api">API</FooterLink>
              <FooterLink href="/widgets">Widgets</FooterLink>
              <FooterLink href="/business">Solutions Pro</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin size={16} className="text-weather-blue" />
                <span>123 Rue de la Météo, Paris</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Mail size={16} className="text-weather-blue" />
                <a href="mailto:contact@skystats.com" className="hover:text-weather-blue transition-colors">
                  contact@skystats.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Phone size={16} className="text-weather-blue" />
                <a href="tel:+33123456789" className="hover:text-weather-blue transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} SkyStats. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                Fait avec <Heart size={14} className="mx-1 text-red-500" /> en France
              </span>
              <a 
                href="/terms" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-weather-blue transition-colors"
              >
                Mentions légales
              </a>
              <a 
                href="/privacy" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-weather-blue transition-colors"
              >
                Confidentialité
              </a>
            </div>
          </div>

          {/* Special mapbox attribution for the Maps page */}
          <div className="mt-4 text-xs text-center text-gray-400 flex justify-center items-center">
            <span>Données cartographiques © </span>
            <a 
              href="https://www.mapbox.com/" 
              className="ml-1 flex items-center hover:text-weather-blue transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Mapbox
              <ExternalLink size={10} className="ml-1" />
            </a>
            <span className="mx-1"> • </span>
            <a 
              href="https://www.openstreetmap.org/" 
              className="flex items-center hover:text-weather-blue transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              OpenStreetMap
              <ExternalLink size={10} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

// Helper component for social media links
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-weather-blue hover:text-white transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

// Helper component for footer links
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-sm text-gray-600 dark:text-gray-300 hover:text-weather-blue transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
