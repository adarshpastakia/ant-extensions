// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { EnumFieldType, EnumOperator, SearchBar } from "@ant-extensions/searchbar";
import { actions } from "@storybook/addon-actions";
import { ConfigProvider, Menu, Select, Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const Example = () => {
  const { i18n } = useTranslation();

  const eventsFromNames = actions("onQueryChange", "onFilterChanged", "onSearch", "onCollapsed");

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div style={{ padding: "2em", margin: "auto" }}>
        <SearchBar
          collapsed={false}
          filters={[
            {
              type: "filter",
              active: true,
              field: "string",
              label: "My Label87",
              negative: true,
              operator: EnumOperator.INCLUDES,
              isTimeField: false,
              required: false,
              value: "test"
            },
            {
              type: "filter",
              active: true,
              field: "string",
              label: "My Label",
              negative: false,
              operator: EnumOperator.INCLUDES,
              isTimeField: false,
              required: false,
              value: "test"
            },
            {
              type: "filter",
              active: true,
              field: "date",
              negative: false,
              operator: EnumOperator.BETWEEN,
              isTimeField: true,
              required: true,
              value: "$week|$week"
            },
            {
              type: "compare",
              field: "string",
              operator: EnumOperator.INCLUDES,
              compare: "string2",
              negative: false,
              active: true
            }
          ]}
          emptyFields="Select schema to enable filters"
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
        <hr />
        <div>
          <Tag color="blue">Active Filter</Tag>
          <Tag color="red">Negative Filter</Tag>
          <Tag color="geekblue">Active Comparator</Tag>
          <Tag color="orange">Negative Comparator</Tag>
        </div>
      </div>
    </ConfigProvider>
  );
};
