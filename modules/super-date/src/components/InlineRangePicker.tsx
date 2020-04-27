// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const { RangePicker } = DatePicker;

export const InlineRangePicker: React.FC<RangePickerProps> = React.forwardRef<
  React.Component,
  RangePickerProps
>(({ value, ...props }, ref) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refRangePicker = useRef<AnyObject>(null);
  const refPicker = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    if (typeof ref === "function") {
      ref(refRangePicker.current);
    } else if (ref) {
      ref.current = refRangePicker.current;
    }
    // @ts-ignore
    window.testPicker = refRangePicker.current;
  }, [refRangePicker.current]);

  useLayoutEffect(() => {
    refContainer.current!.appendChild(refPicker.current!);
  }, [refContainer.current]);

  const [_value, setValue] = useState<AnyObject>([null, null]);
  useEffect(() => {
    setValue(value || [null, null]);
  }, [value]);
  const doUpdate = useCallback((v) => {
    setValue(v);
  }, []);

  const resetValue = useCallback(
    (e: AnyObject) => {
      if (
        _value[0] &&
        _value[1] &&
        (e.target.classList.contains("ant-picker-content") ||
          e.target.classList.contains("ant-picker-cell-inner"))
      ) {
        setValue([null, null]);
        setTimeout(() => refRangePicker.current && refRangePicker.current.focus(), 10);
      }
      return true;
    },
    [_value]
  );

  return (
    <div ref={refContainer} className="ant-ext-sd__inlinePicker" onMouseDownCapture={resetValue}>
      <RangePicker
        {...props}
        open
        ref={refRangePicker}
        inputReadOnly
        value={_value as AnyObject}
        onCalendarChange={doUpdate}
        getPopupContainer={() => refPicker.current}
      />
    </div>
  );
});
