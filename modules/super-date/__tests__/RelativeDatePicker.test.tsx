// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../../../jest/TestWrapper";
import { DateUtils, RelativeDatePicker } from "../src";

describe("RelativeDatePicker", () => {
  let fragment: RenderResult;
  const initialValue = "$now";

  beforeEach(() => {
    fragment = render(<RelativeDatePicker value={initialValue} />, {
      wrapper: TestWrapper
    });
  });

  afterAll(() => {
    fragment.unmount();
  });

  it("should render", (done) => {
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByDisplayValue(DateUtils.label(initialValue))).not.toBeNull();
    done();
  });

  it("should set quick value", (done) => {
    const newValue = "$week";
    fragment.rerender(<RelativeDatePicker value={newValue} />);
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByDisplayValue(DateUtils.label(newValue))).not.toBeNull();

    const inputEl = fragment.getByTestId("input-el");
    fireEvent.click(inputEl);
    expect(fragment.baseElement.querySelector(".ant-tabs")).not.toBeNull();
    // expect(fragment.getByTestId("tab-quick")).toHaveClass("ant-tabs-tabpane-active");

    done();
  });

  it("should set absolute value", (done) => {
    const newValue = "2020-01-01T00:00:00.000Z";
    fragment.rerender(<RelativeDatePicker value={newValue} />);
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByDisplayValue(DateUtils.label(newValue))).not.toBeNull();

    const inputEl = fragment.getByTestId("input-el");
    fireEvent.click(inputEl);
    expect(fragment.baseElement.querySelector(".ant-tabs")).not.toBeNull();
    // expect(fragment.getByTestId("tab-absolute")).toHaveClass("ant-tabs-tabpane-active");

    done();
  });

  it.todo("should fire change event");
});
