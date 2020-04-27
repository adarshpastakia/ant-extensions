// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeSuperDate } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { BaseProps, DateParts, DateValue } from "../../utils/types";
import { RelativeInput } from "../common/RelativeInput";

export const QuickSelect: React.FC<BaseProps> = React.memo(({ value, onChange }) => {
  const { t } = useTranslation(I18nKey);
  const [_value, setValue] = useState<DateValue>("$hour-1");

  useEffect(() => {
    if (value && value.includes("|") && value.includes(DateParts.NOW)) {
      const [start, end] = value.split("|");
      if (start !== DateParts.NOW) {
        setValue(start);
      }
      if (end !== DateParts.NOW) {
        setValue(end);
      }
    }
  }, [value]);

  const applyRelative = useCallback(() => {
    if (_value) {
      onChange && onChange(makeSuperDate(_value));
    }
  }, [_value, onChange]);

  return (
    <Form.Item label={t("label.quick")} labelCol={{ span: 24 }}>
      <Input.Group compact>
        <RelativeInput value={_value} onChange={setValue} />
        <Button type="primary" onClick={applyRelative}>
          {t("label.apply")}
        </Button>
      </Input.Group>
    </Form.Item>
  );
});
QuickSelect.displayName = "QuickSelect";
