import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { resources as authResources } from "~/features/auth";
import { resources } from "./locales/index";

import "./adapters/yup.adapter";

export const defaultNS = "common";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        ...resources.en,
        ...authResources.en,
      },
      fr: {
        ...resources.fr,
        ...authResources.fr,
      },
    },
    fallbackLng: "fr",
    debug: true,
    defaultNS,
  });
