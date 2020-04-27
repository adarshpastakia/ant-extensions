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
import { InlineDatePicker } from "../InlineDatePicker";

export const DatePicker: React.FC<BaseProps> = React.memo(({ value, onChange }) => {
  const { t } = useTranslation(I18nKey);

  const [_value, setValue] = useState<Moment>();

  useEffect(() => {
    if (value && isDate(value)) {
      setValue(moment(parseDate(value)));
    }
  }, [value]);

  const doUpdate = useCallback((dt: Moment) => {
    setValue(dt);
  }, []);

  const applyDate = useCallback(() => {
    if (_value && onChange) {
      onChange(`${_value.startOf("day").toISOString()}`);
    }
  }, [_value]);

  const applyButton = useCallback(
    () => (
      <Row justify="end">
        <Col>
          <Button size="small" type="primary" disabled={!_value} onClick={applyDate}>
            {t("label.apply")}
          </Button>
        </Col>
      </Row>
    ),
    [_value, applyDate]
  );

  return (
    <InlineDatePicker
      value={_value}
      showToday={false}
      onChange={doUpdate as AnyObject}
      renderExtraFooter={applyButton}
      className="ant-ext-sd__picker ant-ext-sd__picker--date"
    />
  );
});
