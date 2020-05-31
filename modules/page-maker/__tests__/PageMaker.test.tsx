// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { PieChartOutlined } from "@ant-design/icons";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../../../jest/TestWrapper";
import { EnumTypes, PageConfig, PageMaker, WidgetObject } from "../src";

describe("PageMaker", () => {
  let fragment: RenderResult;

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
          colSpan: 3,
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
          children: [
            {
              id: "head-2",
              type: EnumTypes.HEADING,
              title: "Heading",
              color: "#487eb0",
              size: 18
            },
            {
              id: "div-2",
              type: EnumTypes.DIVIDER
            },
            {
              id: "row-2",
              type: EnumTypes.ROW,
              height: 400,
              children: []
            }
          ]
        },
        {
          id: "col-4",
          type: EnumTypes.COL,
          colSpan: 3,
          children: []
        }
      ]
    }
  ];

  beforeEach(() => {
    fragment = render(
      <PageMaker config={config} widgets={widgets} renderWidget={(widgetId) => <div />} />,
      {
        wrapper: TestWrapper
      }
    );
  });

  afterAll(() => {
    fragment.unmount();
  });

  it("should render", (done) => {
    expect(fragment.container).toMatchSnapshot();
    done();
  });

  it("should be editable", (done) => {
    fragment.rerender(
      <PageMaker config={config} widgets={widgets} renderWidget={(widgetId) => <div />} isEditing />
    );
    expect(fragment.container).toMatchSnapshot();

    const headEl = fragment.container.querySelector(`[data-type="${EnumTypes.HEADING}"]`);
    if (headEl) {
      fireEvent.click(headEl);
    }

    const divEl = fragment.container.querySelector(`[data-type="${EnumTypes.DIVIDER}"]`);
    if (divEl) {
      fireEvent.click(divEl);
    }

    const rowEl = fragment.container.querySelector(`[data-type="${EnumTypes.ROW}"]`);
    if (rowEl) {
      fireEvent.click(rowEl);
    }

    const colEl = fragment.container.querySelector(`[data-type="${EnumTypes.COL}"]`);
    if (colEl) {
      fireEvent.click(colEl);
    }

    const tileEl = fragment.container.querySelector(`[data-type="${EnumTypes.TILE}"]`);
    if (tileEl) {
      fireEvent.click(tileEl);
    }
    done();
  });

  it.todo("should fire change event");
});
