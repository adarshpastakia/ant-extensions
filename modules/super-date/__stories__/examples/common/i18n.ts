// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        core: {
          labelDate: "Inline Date",
          labelRange: "Inline Range",
          labelInputDate: "Relative Date",
          labelInputRange: "Relative Range"
        },
        SuperDate: {
          now: {
            $week: "Current Week"
          }
        }
      },
      ar: {
        core: {
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
