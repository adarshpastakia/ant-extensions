// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Button, Col, Row } from "antd";
import moment, { Moment } from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseDate } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { isDate } from "../../utils/predicates";
import { BaseProps } from "../../utils/types";
import { InlineRangePicker } from "../InlineRangePicker";

export const RangePicker: React.FC<BaseProps> = React.memo(({ value, onChange }) => {
  const { t } = useTranslation(I18nKey);

  const [_value, setValue] = useState<[Moment, Moment]>();

  useEffect(() => {
    if (value && value.includes("|")) {
      const [start, end] = value.split("|");
      if (isDate(start) && isDate(end)) {
        setValue([moment(parseDate(start)), moment(parseDate(end))]);
      }
    }
  }, [value]);

  const doUpdate = useCallback((dt: [Moment, Moment]) => {
    setValue(dt);
  }, []);

  const applyRange = useCallback(() => {
    if (_value && onChange) {
      onChange(`${_value[0].startOf("day").toISOString()}|${_value[1].endOf("day").toISOString()}`);
    }
  }, [_value]);

  const applyButton = useCallback(
    () => (
      <Row justify="end">
        <Col>
          <Button size="small" type="primary" disabled={!_value} onClick={applyRange}>
            {t("label.apply")}
          </Button>
        </Col>
      </Row>
    ),
    [_value, applyRange]
  );

  return (
    <InlineRangePicker
      value={_value}
      onChange={doUpdate as AnyObject}
      renderExtraFooter={applyButton}
      className="ant-ext-sd__picker ant-ext-sd__picker--range"
    />
  );
});
