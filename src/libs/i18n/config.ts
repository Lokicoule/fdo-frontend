import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import common_en from "./en/common.json";
import common_fr from "./fr/common.json";
import auth_en from "./en/auth.json";
import auth_fr from "./fr/auth.json";

import LanguageDetector from "i18next-browser-languagedetector";

export const defaultNS = "common";

export const resources = {
  en: {
    auth: auth_en,
    common: common_en,
  },
  fr: {
    auth: auth_fr,
    common: common_fr,
  },
};

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "fr",
  debug: true,
  defaultNS,
});
