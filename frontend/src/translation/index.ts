import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';

export const resources: Resource = {
  en,
  ru,
};

export const initI18next = async () => {
  await i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
  });
};
