
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Menu, X, Map, AlertTriangle, BarChart2, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';


interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { t, i18n } = useTranslation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm",
        className
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div 
            whileHover={{ rotate: 20 }}
            className="text-weather-blue"
          >
            <Cloud size={28} className="text-weather-blue" />
          </motion.div>
          <Link to="/">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-blue-gradient"
            >
              SkyStats
            </motion.span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" active={currentPath === "/"}>
            <BarChart2 size={16} className="mr-1" />
            {t('dashboard')}
          </NavLink>
          <NavLink to="/forecast" active={currentPath === "/forecast"}>
            <Cloud size={16} className="mr-1" />
            {t('forecast')}
          </NavLink>
          <NavLink to="/maps" active={currentPath === "/maps"}>
            <Map size={16} className="mr-1" />
            {t('maps')}
          </NavLink>
          <NavLink to="/alerts" active={currentPath === "/alerts"}>
            <AlertTriangle size={16} className="mr-1" />
            {t('alerts')}
          </NavLink>
        </div>
        
        <div className="flex items-center space-x-3">

          <button className="p-2 rounded-full bg-gradient-to-r from-weather-blue to-weather-darkBlue text-white hidden md:flex items-center justify-center">
            <span className="text-sm font-medium px-2">{t('premium')}</span>
          </button>
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
              <MobileNavLink to="/" active={currentPath === "/"} onClick={() => setIsMenuOpen(false)}>
                <BarChart2 size={18} className="mr-2" />
                Tableau de bord
              </MobileNavLink>
              <MobileNavLink to="/forecast" active={currentPath === "/forecast"} onClick={() => setIsMenuOpen(false)}>
                <Cloud size={18} className="mr-2" />
                Prévisions
              </MobileNavLink>
              <MobileNavLink to="/maps" active={currentPath === "/maps"} onClick={() => setIsMenuOpen(false)}>
                <Map size={18} className="mr-2" />
                Cartes
              </MobileNavLink>
              <MobileNavLink to="/alerts" active={currentPath === "/alerts"} onClick={() => setIsMenuOpen(false)}>
                <AlertTriangle size={18} className="mr-2" />
                Alertes
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

interface NavLinkProps {
  to: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link 
      to={to}
      className={cn(
        "relative px-1 py-2 text-sm font-medium transition-colors flex items-center",
        active 
          ? "text-weather-darkBlue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-weather-blue after:rounded-full" 
          : "text-gray-600 hover:text-weather-darkBlue"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, active, children, onClick }: NavLinkProps) => {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center p-3 rounded-lg transition-colors",
        active 
          ? "bg-weather-blue/10 text-weather-darkBlue" 
          : "text-gray-600 hover:bg-gray-100 hover:text-weather-darkBlue"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
