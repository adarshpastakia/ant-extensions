// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import React from "react";
import { IFilterProps } from "../utils/types";
import { ContextProvider } from "./context";
import { FilterbarWrapper } from "./filterbar/Wrapper";

/**
 * Filter bar
 */
export const FilterBar: React.FC<IFilterProps> = React.memo(
  ({
    filters = [],
    disabled = false,
    fields = [],
    onFilterAdded,
    onFilterChanged,
    onFilterRemoved,
    onFilterUpdate
  }) => {
    return (
      <ContextProvider
        {...{ filters, fields, onFilterAdded, onFilterChanged, onFilterRemoved, onFilterUpdate }}
      >
        <FilterbarWrapper {...{ disabled, fields }} />
      </ContextProvider>
    );
  }
);
