// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import i18next from "i18next";
import React from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {}
    },
    defaultNS: "core",
    fallbackLng: ["en"],
    keySeparator: ".",

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });
i18next.languages = ["en", "ar"];

export const TestWrapper: React.FC = ({ children }) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
