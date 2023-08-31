import i18next from "i18next";
import fsBackend from "i18next-fs-backend";

i18next.use(fsBackend).init({
  lng: "en",
  fallbackLng: "en",
  preload: ["en", "hi"], 
  ns: ["translations"],
  defaultNS: "translations",
  backend: {
    loadPath: "./translations/en.json", 
  },
});

export default i18next;
