import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './resources/locales/en/en.json';
import translationUK from './resources/locales/uk/uk.json';

const resources = {
  en: {
    translation: translationEN
  },
  uk: {
    translation: translationUK
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    
  });

export default i18n;