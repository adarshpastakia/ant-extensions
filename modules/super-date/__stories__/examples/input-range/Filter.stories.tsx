// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { DateUtils } from "@ant-extensions/super-date";
import { boolean, select } from "@storybook/addon-knobs";
import { ConfigProvider, Form } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeFilterPicker } from "../../../src/components/TimeFilterPicker";

export const Filter = () => {
  const { i18n, t } = useTranslation();
  const [value, onChange] = useState<string | undefined>("$now|$now");

  const size = select<AnyObject>("size", [undefined, "small", "middle", "large"], undefined);

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div style={{ padding: "2em", maxWidth: 450, margin: "auto" }}>
        <Form layout="vertical" size={size}>
          <Form.Item label={t("labelInputRange")}>
            <TimeFilterPicker
              value={value}
              onChange={onChange}
              disabled={boolean("disabled", false)}
              readOnly={boolean("readOnly", false)}
              size={size}
            />
          </Form.Item>
          <Form.Item label="DateUtils.isValid">{DateUtils.isValid(value) ? "Yes" : "No"}</Form.Item>
          <Form.Item label="DateUtils.toString">{DateUtils.toString(value)}</Form.Item>
          <Form.Item label="DateUtils.toISOString">
            {DateUtils.toISOString(value)?.toString()}
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};
