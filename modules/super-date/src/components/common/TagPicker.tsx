// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { FieldTimeOutlined } from "@ant-design/icons";
import { Popover, Tag, Tooltip } from "antd";
import i18next from "i18next";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { DateUtils } from "../..";
import { parseDateLabel } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { DateValue } from "../../utils/types";

export const TagPicker: React.FC<AnyObject> = ({
  value,
  onChange,
  onVisibleChange,
  readOnly,
  disabled,
  pickerEl: E
}) => {
  const {
    i18n: { language }
  } = useTranslation(I18nKey);

  const refDropdown = useRef<Popover>(null);
  const [visible, setVisible] = useState(false);

  const [_value, setValue] = useState(value);

  const isDisabled = useMemo(() => disabled || readOnly, [disabled, readOnly]);

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
      if (!isDisabled) {
        setVisible(v);
        onVisibleChange && onVisibleChange(v);
      }
    },
    [readOnly, onVisibleChange]
  );
  const displayLabel = useMemo(() => (value ? parseDateLabel(value.toString()) : ""), [
    value,
    language
  ]);

  return (
    <I18nextProvider i18n={i18next}>
      <Tooltip overlayClassName="ant-ext-sd__tooltip" title={DateUtils.toString(_value)}>
        <Popover
          ref={refDropdown}
          visible={visible}
          destroyTooltipOnHide
          onVisibleChange={toggleVisible}
          overlayClassName="ant-ext-sd__popover"
          content={!readOnly && <E dropdown={refDropdown} value={value} onChange={doUpdate} />}
          trigger="click"
          placement="bottomLeft"
        >
          <Tag color="blue" icon={<FieldTimeOutlined />} className="ant-ext-sd__tag">
            {displayLabel}
          </Tag>
        </Popover>
      </Tooltip>
    </I18nextProvider>
  );
};
TagPicker.displayName = "TagPicker";
