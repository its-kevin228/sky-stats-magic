
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Moon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm",
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
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-blue-gradient"
          >
            SkyStats
          </motion.span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="#" active>Dashboard</NavLink>
          <NavLink href="#">Forecast</NavLink>
          <NavLink href="#">Maps</NavLink>
          <NavLink href="#">Alerts</NavLink>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-weather-gray/50 hover:bg-weather-gray/80 transition-colors">
            <Sun size={20} className="text-weather-darkBlue" />
          </button>
          <button className="p-2 rounded-full bg-gradient-to-r from-weather-blue to-weather-darkBlue text-white hidden md:flex items-center justify-center">
            <span className="text-sm font-medium px-2">Premium</span>
          </button>
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ 
  href, 
  active, 
  children 
}: { 
  href: string; 
  active?: boolean; 
  children: React.ReactNode 
}) => {
  return (
    <a 
      href={href}
      className={cn(
        "relative px-1 py-2 text-sm font-medium transition-colors",
        active 
          ? "text-weather-darkBlue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-weather-blue after:rounded-full" 
          : "text-gray-600 hover:text-weather-darkBlue"
      )}
    >
      {children}
    </a>
  );
};

export default Navbar;
