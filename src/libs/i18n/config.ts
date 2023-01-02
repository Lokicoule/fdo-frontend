import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import common_en from "./locales/en/common.json";
import common_fr from "./locales/fr/common.json";
import auth_en from "./locales/en/auth.json";
import auth_fr from "./locales/fr/auth.json";
import product_en from "./locales/en/product.json";
import product_fr from "./locales/fr/product.json";
import validations_en from "./locales/en/validations.json";
import validations_fr from "./locales/fr/validations.json";

import "./adapters/yup.adapter";

import LanguageDetector from "i18next-browser-languagedetector";

export const defaultNS = "common";

export const resources = {
  en: {
    auth: auth_en,
    common: common_en,
    product: product_en,
    validations: validations_en,
  },
  fr: {
    auth: auth_fr,
    common: common_fr,
    product: product_fr,
    validations: validations_fr,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    debug: true,
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });
