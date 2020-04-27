// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Input, InputNumber, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDateParts } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { isDate } from "../../utils/predicates";
import { BaseProps, DateParts, IDatePart } from "../../utils/types";

export const RelativeInput: React.FC<BaseProps> = React.memo(({ value, onChange }) => {
  const { t } = useTranslation(I18nKey);
  const [parts, setParts] = useState<IDatePart>({ part: DateParts.HOUR, diff: 1, op: "-" });

  useEffect(() => {
    if (!isDate(value)) {
      setParts(getDateParts(value) || { part: DateParts.HOUR, diff: 1, op: "-" });
    }
  }, [value]);

  const setPart = useCallback(
    (key: keyof IDatePart, value: AnyObject) => {
      const newParts = { ...parts, [key]: value };
      setParts(newParts);
      onChange && onChange(`${newParts.part}${newParts.op}${newParts.diff}`);
    },
    [parts]
  );

  return (
    <Input.Group compact>
      <InputNumber
        min={1}
        onChange={(v) => setPart("diff", v)}
        value={parts.diff}
        style={{ width: 80 }}
      />
      <Select
        onChange={(v) => setPart("part", v.toString())}
        value={parts.part}
        style={{ width: 120 }}
      >
        {Object.values(DateParts)
          .slice(1)
          .map((key) => (
            <Select.Option key={key} value={key}>
              {t(`label.${key}`)}
            </Select.Option>
          ))}
      </Select>
      <Select onChange={(v) => setPart("op", v.toString())} value={parts.op} style={{ width: 120 }}>
        <Select.Option value="-">{t("label.-")}</Select.Option>
        <Select.Option value="+">{t("label.+")}</Select.Option>
      </Select>
    </Input.Group>
  );
});
