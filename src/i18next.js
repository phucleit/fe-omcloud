import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const language = ['vi', 'en'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    debug: true,
    whitelist: language,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
