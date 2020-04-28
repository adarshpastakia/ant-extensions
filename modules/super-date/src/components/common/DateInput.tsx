// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { CalendarOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { InputProps } from "antd/es/input";
import React, { useMemo } from "react";
import { parseDateLabel } from "../../utils/dateUtils";

export const DateInput = React.forwardRef<Input, Omit<InputProps, "onChange">>(
  ({ value, disabled, readOnly, ...props }, ref) => {
    const displayLabel = useMemo(() => (value ? parseDateLabel(value.toString()) : ""), [value]);

    const isDisabled = useMemo(() => disabled || readOnly, [disabled, readOnly]);

    return (
      <Input
        {...props}
        readOnly
        ref={ref}
        data-testid="input-el"
        disabled={isDisabled}
        value={displayLabel || ""}
        suffix={<CalendarOutlined />}
      />
    );
  }
);
DateInput.displayName = "DateInput";
