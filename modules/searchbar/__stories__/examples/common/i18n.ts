// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const I18nKey = "searchbar";
i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        [I18nKey]: {}
      },
      ar: {
        [I18nKey]: {
          label: "Basic-AR"
        }
      }
    },
    defaultNS: "core",
    fallbackLng: ["en"],
    keySeparator: ".",

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });
