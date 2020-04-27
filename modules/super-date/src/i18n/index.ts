// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import i18next from "i18next";
import en from "./en.json";
import ar from "./ar.json";
import { I18nKey } from "../utils/i18nKey";

const callback = () => {
  i18next.addResourceBundle("en", I18nKey, en, true, false);
  i18next.addResourceBundle("ar", I18nKey, ar, true, false);
};

if (i18next.isInitialized) {
  callback();
} else {
  i18next.on("initialized", callback);
}
