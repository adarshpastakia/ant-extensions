// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../../../jest/TestWrapper";
import { EnumFieldType, EnumOperator, SearchBar } from "../src";

describe("RelativeDatePicker", () => {
  let fragment: RenderResult;
  const fields = [
    {
      key: "string",
      type: EnumFieldType.STRING,
      defaultOperator: EnumOperator.IN,
      name: "String"
    }
  ];

  beforeEach(() => {
    fragment = render(<SearchBar collapsed={false} filters={[]} fields={fields} />, {
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

  it.todo("should fire change event");
});
