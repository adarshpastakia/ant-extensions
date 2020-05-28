// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../../../jest/TestWrapper";
import { DateUtils, TimeFilterPicker } from "../src";

describe("TimeFilterPicker", () => {
  let fragment: RenderResult;
  const initialValue = "$day|$day";

  beforeEach(() => {
    fragment = render(<TimeFilterPicker value={initialValue} />, {
      wrapper: TestWrapper
    });
  });

  afterAll(() => {
    fragment.unmount();
  });

  it("should render", (done) => {
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByText(DateUtils.label(initialValue))).not.toBeNull();
    done();
  });

  it("should set quick value", (done) => {
    const newValue = "$week|$now";
    fragment.rerender(<TimeFilterPicker value={newValue} />);
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByText(DateUtils.label(newValue))).not.toBeNull();

    const inputEl = fragment.getByTestId("input-el");
    fireEvent.click(inputEl);
    expect(fragment.baseElement.querySelector(".ant-tabs")).not.toBeNull();
    expect(fragment.getByTestId("tab-quick")).toHaveClass("ant-tabs-tabpane-active");

    done();
  });

  it("should set relative value", (done) => {
    const newValue = "$week-4|$week+4";
    fragment.rerender(<TimeFilterPicker value={newValue} />);
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByText(DateUtils.label(newValue))).not.toBeNull();

    const inputEl = fragment.getByTestId("input-el");
    fireEvent.click(inputEl);
    expect(fragment.baseElement.querySelector(".ant-tabs")).not.toBeNull();
    expect(fragment.getByTestId("tab-relative")).toHaveClass("ant-tabs-tabpane-active");

    done();
  });

  it("should set absolute value", (done) => {
    const newValue = "2020-01-01T00:00:00.000Z|2020-01-31T11:59:59.000Z";
    fragment.rerender(<TimeFilterPicker value={newValue} />);
    expect(fragment.container).toMatchSnapshot();
    expect(fragment.queryByText(DateUtils.label(newValue))).not.toBeNull();

    const inputEl = fragment.getByTestId("input-el");
    fireEvent.click(inputEl);
    expect(fragment.baseElement.querySelector(".ant-tabs")).not.toBeNull();
    expect(fragment.getByTestId("tab-absolute")).toHaveClass("ant-tabs-tabpane-active");

    done();
  });

  it.todo("should fire change event");
});
