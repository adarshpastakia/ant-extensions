// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";
import { EnumTypes, PageConfig, PageMaker, WidgetObject } from "@ant-extensions/page-maker";
import "@mdi/font/css/materialdesignicons.css";
import { actions } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { ConfigProvider } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const widgets: WidgetObject[] = [
  {
    id: "widget-1",
    icon: <PieChartOutlined />,
    title: "Test Widget"
  }
];

const config: PageConfig = [
  {
    id: "head-1",
    type: EnumTypes.HEADING,
    title: "Heading",
    color: "#487eb0",
    size: 18
  },
  {
    id: "row-1",
    type: EnumTypes.ROW,
    height: "auto",
    children: [
      {
        id: "col-1",
        type: EnumTypes.COL,
        colSpan: 3,
        children: [
          {
            id: "tile-1",
            widgetId: widgets[0].id,
            type: EnumTypes.TILE,
            title: "Tile head",
            bordered: true,
            expandable: false,
            color: "#227093"
          }
        ]
      }
    ]
  },
  {
    id: "div-1",
    type: EnumTypes.DIVIDER
  },
  {
    id: "row-2",
    type: EnumTypes.ROW,
    height: 400,
    children: [
      {
        id: "col-2",
        type: EnumTypes.COL,
        colSpan: 6,
        children: [
          {
            id: "tile-2",
            widgetId: widgets[0].id,
            type: EnumTypes.TILE,
            title: "Tile head",
            bordered: true,
            expandable: true,
            color: "#227093",
            info:
              "<b>Information Card</b>\nThis tooltip can display information for the <u>widget</u>\nCan include <em>HTML tags</em>",
            iconCls: "mdi mdi-chart-pie"
          }
        ]
      },
      {
        id: "col-3",
        type: EnumTypes.COL,
        colSpan: 6,
        children: []
      }
    ]
  }
];

const addNew = (callback: AnyObject) => {
  const newWidget = { id: "widget-2", title: "Widget New", icon: <BarChartOutlined /> };
  widgets.push(newWidget);
  callback({ id: "widget-2", title: "Widget New", icon: <BarChartOutlined /> });
};

export const Example = () => {
  const { i18n } = useTranslation();

  const eventsFromNames = actions("onChange");

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
        <PageMaker
          config={config}
          isEditing={boolean("Edit", true)}
          widgets={widgets}
          onAdd={addNew}
          renderWidget={(widget) => <div>Widget here - {widget}</div>}
          {...eventsFromNames}
        />
      </div>
    </ConfigProvider>
  );
};
