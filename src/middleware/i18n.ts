import i18next from "i18next";
import fsBackend from "i18next-fs-backend";

i18next.use(fsBackend).init({
  lng: "en",
  fallbackLng: "en", // Default language
  preload: ["en", "hi"], // Languages to preload
  ns: ["translations"],
  defaultNS: "translations",
  backend: {
    // Load translations directly based on language code
    loadPath: "./translations/{{lng}}.json", // Path to your translation files
  },
});

export default i18next;
