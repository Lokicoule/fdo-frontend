import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { resources as authResources } from "~/features/auth";
import { resources as customersResources } from "~/features/customers";
import { resources as productsResources } from "~/features/products";
import { resources as commonResources } from "./locales/index";

import "./adapters/yup.adapter";

export const defaultNS = "common";

export const resources = {
  en: {
    ...commonResources.en,
    ...authResources.en,
    ...customersResources.en,
    ...productsResources.en,
  },
  fr: {
    ...commonResources.fr,
    ...authResources.fr,
    ...customersResources.fr,
    ...productsResources.fr,
  },
};

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "fr",
  debug: true,
  defaultNS,
});
