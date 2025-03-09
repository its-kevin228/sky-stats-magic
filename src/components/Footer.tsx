
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
        "w-full backdrop-blur-md bg-white/98 border-t border-gray-200/50 py-4 md:py-6 text-gray-700",
        className
      )}
    >
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Logo and description */}
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 20 }}
                className="text-weather-blue"
              >
                <MapPin size={20} className="text-weather-blue" />
              </motion.div>
              <span className="text-base font-bold bg-clip-text text-transparent bg-blue-gradient">
                SkyStats
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              Votre application météo complète, avec des prévisions détaillées, des alertes et des cartes interactives.
            </p>
            <div className="flex space-x-2 pt-1">
              <SocialLink href="https://github.com" icon={<Github size={14} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={14} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={14} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={14} />} />
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-xs sm:text-sm">Navigation</h3>
            <ul className="space-y-1">
              <FooterLink href="/">Tableau de bord</FooterLink>
              <FooterLink href="/forecast">Prévisions</FooterLink>
              <FooterLink href="/maps">Cartes</FooterLink>
              <FooterLink href="/alerts">Alertes</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-xs sm:text-sm">Contact</h3>
            <ul className="space-y-1">
              <li className="flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-400">
                <MapPin size={12} className="text-weather-blue flex-shrink-0" />
                <span>Lepigeon, Lomé</span>
              </li>
              <li className="flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-400">
                <Mail size={12} className="text-weather-blue flex-shrink-0" />
                <a href="mailto:contact@skystats.com" className="hover:text-weather-blue transition-colors truncate">
                  pekpelignimdoukevin@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-400">
                <Phone size={12} className="text-weather-blue flex-shrink-0" />
                <a href="tel:+22893158801" className="hover:text-weather-blue transition-colors">
                  +228 93 15 88 01
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {currentYear} SkyStats. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                Fait avec <Heart size={10} className="mx-1 text-red-500" /> au Togo
              </span>
              <a
                href="/terms"
                className="text-xs text-weather-darkBlue/60 dark:text-weather-blue/60 hover:text-weather-blue transition-colors"
              >
                Mentions légales
              </a>
              <a
                href="/privacy"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-weather-blue transition-colors"
              >
                Confidentialité
              </a>
            </div>
          </div>

          {/* Special mapbox attribution for the Maps page */}
          <div className="mt-2 md:mt-3 text-[10px] text-center text-gray-400 flex flex-wrap justify-center items-center gap-1">
            <span>Données cartographiques © </span>
            <a
              href="https://www.mapbox.com/"
              className="flex items-center hover:text-weather-blue transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapbox
              <ExternalLink size={8} className="ml-0.5" />
            </a>
            <span className="mx-1"> • </span>
            <a
              href="https://www.openstreetmap.org/"
              className="flex items-center hover:text-weather-blue transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
              <ExternalLink size={8} className="ml-0.5" />
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
      className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-weather-blue hover:text-white transition-colors"
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
        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-weather-blue transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
