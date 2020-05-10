// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { Select } from "antd";
import { SelectProps, SelectValue } from "antd/es/select";
import React from "react";
import { IFilterField } from "../utils/types";
import { FieldOption } from "./filterbar/FieldOption";

export interface IProps extends SelectProps<SelectValue> {
  fields: IFilterField[];
}

export const FieldSelect = React.memo(
  React.forwardRef<Select, IProps>(({ className, fields, ...props }, ref) => {
    return (
      <Select {...props} ref={ref} showSearch className={`ant-ext-sb__selectField ${className}`}>
        {fields
          .sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
          .map((f) => (
            <Select.Option value={f.key} key={f.key} className="ant-ext-sb__fieldOption">
              <FieldOption field={f} />
            </Select.Option>
          ))}
      </Select>
    );
  })
);
