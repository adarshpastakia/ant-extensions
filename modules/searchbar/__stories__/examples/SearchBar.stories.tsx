// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { EnumFieldType, EnumOperator, SearchBar } from "@ant-extensions/searchbar";
import { actions } from "@storybook/addon-actions";
import { ConfigProvider, Menu, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "./common/i18n";

export const Example = () => {
  const { i18n } = useTranslation(I18nKey);

  const eventsFromNames = actions("onQueryChange", "onSearch", "onCollapsed");

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div style={{ padding: "2em", margin: "auto" }}>
        <SearchBar
          collapsed={false}
          filters={[
            {
              active: true,
              field: "string",
              label: "My Label87",
              negative: true,
              operator: EnumOperator.CONTAINS,
              pinned: false,
              required: false,
              value: "test"
            },
            {
              active: true,
              field: "string",
              label: "My Label",
              negative: false,
              operator: EnumOperator.CONTAINS,
              pinned: true,
              required: false,
              value: "test"
            },
            {
              active: true,
              field: "date",
              negative: false,
              operator: EnumOperator.BETWEEN,
              pinned: false,
              required: true,
              value: "$week|$now"
            }
          ]}
          fields={[
            {
              key: "string",
              type: EnumFieldType.STRING,
              defaultOperator: EnumOperator.IN,
              name: "String"
            },
            {
              key: "number",
              type: EnumFieldType.INT,
              defaultOperator: EnumOperator.IS,
              name: "Number"
            },
            {
              key: "date",
              type: EnumFieldType.DATE,
              defaultOperator: EnumOperator.BETWEEN,
              name: "Date"
            }
          ]}
          addonPrefix={<Select />}
          addonSuffix={
            <>
              <Select />
              <Select />
            </>
          }
          actions={
            <Menu>
              <Menu.Item>Action Menu</Menu.Item>
            </Menu>
          }
          {...eventsFromNames}
        />
      </div>
    </ConfigProvider>
  );
};
