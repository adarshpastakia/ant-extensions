// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { DatePicker } from "antd";
import { DatePickerProps } from "antd/lib/date-picker";
import React, { useLayoutEffect, useRef } from "react";

export const InlineDatePicker: React.FC<DatePickerProps> = React.forwardRef<
  React.Component,
  DatePickerProps
>((props, ref) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refPicker = useRef<HTMLDivElement>(document.createElement("div"));

  useLayoutEffect(() => {
    if (refContainer.current) {
      refContainer.current.appendChild(refPicker.current);
    }
  }, []);

  return (
    <div ref={refContainer} className="ant-ext-sd__inlinePicker">
      <DatePicker
        {...props}
        ref={ref}
        open
        inputReadOnly
        getPopupContainer={() => refPicker.current}
      />
    </div>
  );
});
InlineDatePicker.displayName = "InlineDatePicker";
