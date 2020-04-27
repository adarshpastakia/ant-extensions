import { isValid, parseISO } from "date-fns";

export const isUndefined = (value: AnyObject): value is undefined => {
  return value === undefined;
};

export const isNull = (value: AnyObject): value is null => {
  return value === null;
};

export const isNil = (value: AnyObject): value is null | undefined => {
  return isUndefined(value) || isNull(value);
};

export const isString = (value: AnyObject): value is string => {
  return typeof value === "string";
};

export const isDate = (value: AnyObject): value is Date => {
  try {
    const parsed = parseISO(value);
    return !isNaN(parsed.valueOf());
  } catch {
    //
  }
  return isValid(value);
};

export const isDateLike = (value: AnyObject) => {
  return !!value.match(/^\$(now|minute|hour|day|week|month|quarter|year|decade)([-+]\d*)?$/);
};
