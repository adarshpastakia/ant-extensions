// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Input, Popover, Tooltip } from "antd";
import i18next from "i18next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { DateUtils } from "../..";
import { DateValue } from "../../utils/types";
import { withinDropdown } from "../../utils/withinDropdown";
import { DateInput } from "./DateInput";

export const BasePicker = React.forwardRef<Input, AnyObject>(
  ({ value, onChange, onVisibleChange, readOnly, pickerEl: E, ...props }, ref) => {
    const refDropdown = useRef<Popover>(null);
    const [visible, setVisible] = useState(false);

    const [_value, setValue] = useState(value);

    useEffect(() => {
      setValue(value);
    }, [value]);
    const doUpdate = useCallback(
      (v: DateValue) => {
        setValue(v);
        setVisible(false);
        onChange && onChange(v);
      },
      [onChange]
    );

    const toggleVisible = useCallback(
      (v) => {
        if (!readOnly) {
          setVisible(v);
          onVisibleChange && onVisibleChange(v);
        }
      },
      [readOnly, onVisibleChange]
    );

    return (
      <I18nextProvider i18n={i18next}>
        <div className="ant-ext-sd__input">
          <Tooltip overlayClassName="ant-ext-sd__tooltip" title={DateUtils.toString(_value)}>
            <Popover
              ref={refDropdown}
              visible={visible}
              onVisibleChange={toggleVisible}
              overlayClassName="ant-ext-sd__popover"
              content={!readOnly && <E dropdown={refDropdown} value={value} onChange={doUpdate} />}
              trigger="click"
              placement="bottomLeft"
            >
              <DateInput
                ref={ref}
                {...props}
                value={value}
                onBlur={(e) => !withinDropdown(e.relatedTarget as HTMLElement) && setVisible(false)}
              />
            </Popover>
          </Tooltip>
        </div>
      </I18nextProvider>
    );
  }
);
BasePicker.displayName = "BasePicker";
