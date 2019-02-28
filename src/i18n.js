import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import en from './translations/en.json';
import sk from './translations/sk.json';
import cs from './translations/cs.json';
import ro from './translations/ro.json';
import tr from './translations/tr.json';

i18n
  .use(reactI18nextModule)
  .use(LanguageDetector)
  .use(XHR)
  .init({
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    resources: {
      en,
      sk,
      ro,
      tr,
      cs,
    },
    nonExplicitWhitelist: true,
    debug: false,
  });

export default i18n;
