# Ant Extensions - Page Maker

### Page maker for building dashboards

---

### Install

```shell
# Using npm
npm install @ant-extensions/page-maker

# Using yarn
yarn add @ant-extensions/page-maker
```

---

### Basic Usage

- `Widget list`

```tsx
import { WidgetObject } from "@ant-extensions/page-maker";

export const widgets: WidgetObject[] = [
  {
    id: "widget",
    icon: <PieChartOutlined />,
    title: "Test Widget"
  }
];
```

- `Page layout`

```tsx
import { PageConfig, EnumTypes } from "@ant-extensions/page-maker";

export const config: PageConfig = [
  {
    id: "head",
    type: EnumTypes.HEADING,
    title: "Heading",
    color: "#487eb0",
    size: 18
  },
  {
    id: "div",
    type: EnumTypes.DIVIDER
  },
  {
    id: "row",
    type: EnumTypes.ROW,
    height: 400,
    children: [
      {
        id: "col-with-tile",
        type: EnumTypes.COL,
        colSpan: 6,
        children: [
          {
            id: "tile",
            widgetId: "widget",
            type: EnumTypes.TILE,
            title: "Tile head",
            bordered: true,
            expandable: true,
            color: "#227093",
            info:
              "<b>Information Card</b>\n" +
              "This tooltip can display information for the <u>widget</u>\n" +
              "Can include <em>HTML tags</em>",
            iconCls: "mdi mdi-chart-pie"
          }
        ]
      },
      {
        id: "col-no-tile",
        type: EnumTypes.COL,
        colSpan: 6,
        children: []
      }
    ]
  }
];
```

```tsx
import { PageMaker } from "@ant-extensions/page-maker";

export const Tester = () => {
  const addNew = (callback: AnyObject) => {
    const newWidget = { id: "widget-2", title: "Widget New", icon: <BarChartOutlined /> };
    // append new widget to widget list
    callback({ id: "widget-2", title: "Widget New", icon: <BarChartOutlined /> });
  };
  const editWidget = (id: string) => {
    // Edit widget by id
  };

  return (
    <div style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
      <PageMaker
        config={config}
        widgets={widgets}
        isEditing={doEdit ? true : false}
        onAdd={addNew}
        onEdit={editWidget}
        renderWidget={(widget) => <div>Widget here - {widget}</div>}
      />
    </div>
  );
};
```
