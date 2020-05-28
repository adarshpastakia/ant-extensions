// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2019
// @license   : MIT

import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import React, { useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {},
      ar: {}
    },
    defaultNS: "core",
    fallbackLng: ["en"],
    keySeparator: ".",

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export const I18nProvider: React.FC<{ locale: string }> = ({ children, locale }) => {
  useEffect(() => {
    console.log("=====> change locale", locale);
    i18next.changeLanguage(locale).then(() => {
      document.documentElement.lang = locale;
      document.documentElement.dir = i18next.dir();
    });
  }, [locale]);
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
