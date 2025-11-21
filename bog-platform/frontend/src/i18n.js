import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      tagline: 'Make Your Wishes Come True',
      heroHeadline: 'The Internet Below the Waves.',
      joinPresale: 'Join Pre-Sale',
      readWhitepaper: 'Read Whitepaper',
      watchVideo: 'Watch Video'
    }
  },
  el: {
    translation: {
      tagline: 'Κάντε τις ευχές σας πραγματικότητα',
      heroHeadline: 'Το Διαδίκτυο κάτω από τα κύματα.',
      joinPresale: 'Συμμετοχή στην Προπώληση',
      readWhitepaper: 'Λευκή Βίβλος',
      watchVideo: 'Παρακολουθήστε το Βίντεο'
    }
  },
  es: {
    translation: {
      tagline: 'Haz que tus deseos se hagan realidad',
      heroHeadline: 'El Internet bajo las olas.',
      joinPresale: 'Únete a la Preventa',
      readWhitepaper: 'Leer Whitepaper',
      watchVideo: 'Ver Video'
    }
  },
  zh: {
    translation: {
      tagline: '让愿望成真',
      heroHeadline: '海浪之下的互联网。',
      joinPresale: '加入预售',
      readWhitepaper: '阅读白皮书',
      watchVideo: '观看视频'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
