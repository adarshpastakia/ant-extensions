// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2019
// @license   : MIT

const TypeColors = {
  info: "color: #2B95D6;font-weight:bold;",
  debug: "color: #5C7080;font-weight:bold;",
  error: "color: #F55656;font-weight:bold;",
  warning: "color: #F29D49;font-weight:bold;"
};

const TagColors = {
  info: "color: #106BA3;",
  debug: "color: #394B59;",
  error: "color: #C23030;",
  warning: "color: #BF7326;"
};

export const getLogger = (base: string) => ({
  debug(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.debug(`%cDEBUG::%c${base} - ${msg}\n`, TypeColors.debug, TagColors.debug, ...rest);
    }
  },

  info(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.info(`%cINFO::%c${base} - ${msg}\n`, TypeColors.info, TagColors.info, ...rest);
    }
  },

  error(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.error(`%cERROR::%c${base} - ${msg}\n`, TypeColors.error, TagColors.error, ...rest);
    }
  },

  warning(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.warn(`%cWARNING::%c${base} - ${msg}\n`, TypeColors.warning, TagColors.warning, ...rest);
    }
  }
});
