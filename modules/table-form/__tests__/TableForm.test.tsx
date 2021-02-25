// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../../../jest/TestWrapper";

describe("PageMaker", () => {
  let fragment: RenderResult;

  beforeEach(() => {
    fragment = render(<div />, {
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
