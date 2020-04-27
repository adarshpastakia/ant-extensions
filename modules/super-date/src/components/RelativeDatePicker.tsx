// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Input } from "antd";
import React from "react";
import { ChangeHandler, DateValue, IInputProps } from "../utils/types";
import { BasePicker } from "./common/BasePicker";
import { DateDropdown } from "./date/DateDropdown";

export interface IProps extends IInputProps {
  /**
   * Relative date | ISO date string
   */
  value: DateValue;
  /**
   * Date change event
   * @param value
   */
  onChange?: ChangeHandler;
  /**
   * Dropdown visibility event
   * @param visible
   */
  onVisibleChange?: (visible: boolean) => void;
}

/**
 * Date selector for selecting relative date
 */
export const RelativeDatePicker = React.forwardRef<Input, IProps>((props, ref) => {
  return <BasePicker {...props} ref={ref} pickerEl={DateDropdown} />;
});

RelativeDatePicker.displayName = "RelativeDatePicker";
