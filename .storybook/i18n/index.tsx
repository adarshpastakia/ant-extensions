// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2019
// @license   : MIT
import React, { useEffect } from "react";
import i18next from "i18next";

export const I18nProvider: React.FC<{ locale: string }> = ({ children, locale }) => {
  useEffect(() => {
    console.log("=====> change locale", locale);
    i18next.changeLanguage(locale).then(() => {
      document.documentElement.lang = locale;
      document.documentElement.dir = i18next.dir();
    });
  }, [locale]);
  return <>{children}</>;
};
