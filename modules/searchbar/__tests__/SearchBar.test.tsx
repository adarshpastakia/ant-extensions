// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../../../jest/TestWrapper";
import { EnumFieldType, EnumOperator, IFilterObject, SearchBar } from "../src";

describe("SearchBar", () => {
  let fragment: RenderResult;
  const fields = [
    {
      key: "string",
      type: EnumFieldType.STRING,
      defaultOperator: EnumOperator.IN,
      name: "String"
    }
  ];
  const filters: IFilterObject[] = [
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
  ];

  beforeEach(() => {
    fragment = render(<SearchBar collapsed={false} filters={filters} fields={fields} />, {
      wrapper: TestWrapper
    });
  });

  afterAll(() => {
    fragment.unmount();
  });

  it("should render", (done) => {
    expect(fragment.container).toMatchSnapshot();
    done();
  });

  it("should show menu", (done) => {
    const tagEl = fragment.container.querySelector(".ant-ext-sb__filterTag--label");
    if (tagEl) {
      fireEvent.click(tagEl);
      expect(fragment.baseElement.querySelector(".ant-dropdown-menu")).not.toBeNull();
    }
    done();
  });

  it("should show edit", (done) => {
    const tagEl = fragment.container.querySelector(".ant-ext-sb__filterTag--label");
    if (tagEl) {
      fireEvent.click(tagEl);

      const menuEl = fragment.baseElement.querySelector(".ant-dropdown-menu");
      if (menuEl && menuEl.firstElementChild) {
        fireEvent.click(menuEl.firstElementChild);
        expect(fragment.baseElement.querySelector(".ant-ext-sb__filterForm")).not.toBeNull();
      }
    }
    done();
  });

  it.todo("should fire change event");
});
