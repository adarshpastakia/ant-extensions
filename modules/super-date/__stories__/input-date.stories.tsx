// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { RelativeDatePicker } from "../src";
import "./examples/common/i18n";

export default {
  title: "Date Selector/RelativeDatePicker",
  component: RelativeDatePicker,
  parameters: {
    jest: ["RelativeDatePicker.test.tsx"]
  }
};

export { Example } from "./examples/input-date/Example.stories";
