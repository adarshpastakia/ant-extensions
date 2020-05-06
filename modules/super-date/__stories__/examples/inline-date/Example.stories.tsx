// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { InlineDatePicker } from "@ant-extensions/super-date";
import { ConfigProvider, Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const Example = () => {
  const { i18n, t } = useTranslation();
  return (
    <ConfigProvider direction={i18n.dir()}>
      <div style={{ padding: "2em", maxWidth: 450, margin: "auto" }}>
        <Form layout="vertical">
          <Form.Item label={t("labelDate")}>
            <InlineDatePicker />
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};
