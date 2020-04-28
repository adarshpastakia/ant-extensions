// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Button, Col, Form, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeSuperDate, superDateType } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { BaseProps, DateValue, Type } from "../../utils/types";
import { RelativeInput } from "../common/RelativeInput";

const fieldProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export const RelativeForm: React.FC<BaseProps> = React.memo(({ value, onChange }) => {
  const { t } = useTranslation(I18nKey);

  const [_start, setStart] = useState<DateValue>("$hour-1");
  const [_end, setEnd] = useState<DateValue>("$hour-1");

  useEffect(() => {
    if (value && superDateType(value) === Type.RELATIVE) {
      const [start, end] = value.split("|");
      setStart(start);
      setEnd(end);
    }
  }, [value]);

  const applyRelative = useCallback(() => {
    if (_start && _end) {
      onChange && onChange(makeSuperDate(_start, _end));
    }
  }, [_start, _end, onChange]);

  return (
    <div className="ant-ext-sd__relativeForm">
      <Form>
        <Form.Item {...fieldProps} label={t("label.from")}>
          <RelativeInput value={_start} onChange={setStart} />
        </Form.Item>
        <Form.Item {...fieldProps} label={t("label.to")}>
          <RelativeInput value={_end} onChange={setEnd} />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button size="small" type="primary" onClick={applyRelative}>
              {t("label.apply")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
});
RelativeForm.displayName = "RelativeForm";
