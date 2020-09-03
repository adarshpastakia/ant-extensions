// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { SizeType } from "antd/es/config-provider/SizeContext";
import * as React from "react";

export type ChangeHandler = (value: DateValue) => void;

export interface Popover {
  forceUpdate: () => void;
}

export interface BaseProps {
  value: DateValue;
  onChange?: ChangeHandler;
}

export interface IInputProps {
  allowClear?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  prefixCls?: string;
  className?: string;
  size?: SizeType;
  prefix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export enum Type {
  QUICK = "QUICK",
  RELATIVE = "RELATIVE",
  ABSOLUTE = "ABSOLUTE"
}

export enum DateParts {
  NOW = "$now",
  MINUTE = "$minute",
  HOUR = "$hour",
  DAY = "$day",
  WEEK = "$week",
  MONTH = "$month",
  QUARTER = "$quarter",
  YEAR = "$year",
  DECADE = "$decade"
}

export interface IDatePart {
  diff?: number | undefined;
  op?: string | undefined;
  part?: DateParts;
}

export type DateValue = string | undefined;
export type ParsedDate = Date | undefined;
