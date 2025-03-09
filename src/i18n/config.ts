import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      forecast: 'Forecast',
      maps: 'Maps',
      alerts: 'Alerts',
      premium: 'Premium',
      
      // Weather Card
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      
      // City Selector
      selectCity: 'Select City',
      searchCity: 'Search for a city...',
      popularCities: 'Popular Cities',
      
      // Weather Stats
      pressure: 'Pressure',
      visibility: 'Visibility',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      rainChance: 'Rain Chance',
      
      // Alerts
      weatherAlerts: 'Weather Alerts',
      activeAlerts: 'Active Weather Alerts',
      stayInformed: 'Stay informed about important weather events and hazards in your area',
      allAlerts: 'All Alerts',
      highSeverity: 'High Severity',
      mediumSeverity: 'Medium Severity',
      lowSeverity: 'Low Severity',
      activeOnly: 'Active Only',
      noAlerts: 'No alerts found',
      noAlertsDesc: 'There are no alerts matching your current filter.',
      
      // Theme
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      
      // Language
      language: 'Language',
      english: 'English',
      french: 'French',
      kabye: 'Kabye',
      ewe: 'Ewe'
    }
  },
  fr: {
    translation: {
      // Navigation
      dashboard: 'Tableau de bord',
      forecast: 'Prévisions',
      maps: 'Cartes',
      alerts: 'Alertes',
      premium: 'Premium',
      
      // Weather Card
      feelsLike: 'Ressenti',
      humidity: 'Humidité',
      wind: 'Vent',
      
      // City Selector
      selectCity: 'Sélectionner une ville',
      searchCity: 'Rechercher une ville...',
      popularCities: 'Villes populaires',
      
      // Weather Stats
      pressure: 'Pression',
      visibility: 'Visibilité',
      uvIndex: 'Indice UV',
      sunrise: 'Lever du soleil',
      sunset: 'Coucher du soleil',
      rainChance: 'Risque de pluie',
      
      // Alerts
      weatherAlerts: 'Alertes météo',
      activeAlerts: 'Alertes météo actives',
      stayInformed: 'Restez informé des événements météorologiques importants dans votre région',
      allAlerts: 'Toutes les alertes',
      highSeverity: 'Gravité élevée',
      mediumSeverity: 'Gravité moyenne',
      lowSeverity: 'Gravité faible',
      activeOnly: 'Actives uniquement',
      noAlerts: 'Aucune alerte trouvée',
      noAlertsDesc: 'Il n\'y a aucune alerte correspondant à votre filtre actuel.',
      
      // Theme
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre',
      
      // Language
      language: 'Langue',
      english: 'Anglais',
      french: 'Français',
      kabye: 'Kabye',
      ewe: 'Ewe'
    }
  },
  kby: {
    translation: {
      // Navigation (Kabye)
      dashboard: 'Takayaɣ',
      forecast: 'Tɔm kpeekpe',
      maps: 'Tɛtʋ',
      alerts: 'Kpandaʋ',
      premium: 'Premium',
      
      // Weather Card
      feelsLike: 'Ɛzɩ pɩwɛ',
      humidity: 'Tɔnɔʋ',
      wind: 'Hehu',
      
      // City Selector
      selectCity: 'Lɛ ɖɔɔyɩ',
      searchCity: 'Cɔlɔ ɖɔɔyɩ...',
      popularCities: 'Ɖɔɔyɩnaa kʋnʋmɖɛ',
      
      // Basic translations for other sections
      // Note: These are approximate translations and should be verified by native speakers
      language: 'Tɔm',
      english: 'Anglais',
      french: 'Français',
      kabye: 'Kabɩyɛ',
      ewe: 'Eʋɛ'
    }
  },
  ee: {
    translation: {
      // Navigation (Ewe)
      dashboard: 'Nuŋɔŋlɔ',
      forecast: 'Yame ŋuti gbeƒãɖeɖe',
      maps: 'Anyigbata',
      alerts: 'Nuxɔxlɔ̃',
      premium: 'Premium',
      
      // Weather Card
      feelsLike: 'Ele abe',
      humidity: 'Tsitsi',
      wind: 'Ya',
      
      // City Selector
      selectCity: 'Tia du',
      searchCity: 'Di du aɖe...',
      popularCities: 'Du siwo ŋkɔ ɖi',
      
      // Basic translations for other sections
      // Note: These are approximate translations and should be verified by native speakers
      language: 'Gbe',
      english: 'Eŋlisi',
      french: 'Fransegbe',
      kabye: 'Kabiyegbe',
      ewe: 'Eʋegbe'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;