// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React from "react";
import { ChangeHandler, DateValue, IInputProps } from "../utils/types";
import { TagPicker } from "./common/TagPicker";
import { RangeDropdown } from "./range/RangeDropdown";

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
 * Date selector for selecting relative date range
 */
export const TimeFilterPicker: React.FC<IProps> = (props) => {
  return <TagPicker {...props} pickerEl={RangeDropdown} />;
};

TimeFilterPicker.displayName = "TimeFilterPicker";
