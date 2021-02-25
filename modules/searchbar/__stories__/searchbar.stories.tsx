// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { FilterBar, SearchBar } from "../src";

export default {
  title: "Search Bar/Example",
  component: SearchBar,
  subcomponents: { FilterBar },
  parameters: {
    jest: ["SearchBar.test.tsx"]
  }
};

export { Example as SearchBar } from "./examples/SearchBar.stories";
export { Example as FilterBar } from "./examples/FilterBar.stories";
