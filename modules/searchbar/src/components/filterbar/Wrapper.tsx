// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { TimeFilterPicker } from "@ant-extensions/super-date";
import React, { useContext, useMemo } from "react";
import { IFilterProps } from "../../utils/types";
import { Context } from "../context";
import { AddButton } from "./AddButton";
import { FilterTag } from "./FilterTag";
import { GlobalMenu } from "./GlobalMenu";

export const FilterbarWrapper: React.FC<IFilterProps> = React.memo(
  ({ disabled = false, fields = [], emptyFields }) => {
    const { filters, updateFilter } = useContext(Context);

    const emptyList = useMemo(() => {
      return !fields || fields.length === 0;
    }, [fields]);

    const sorted = useMemo(
      () =>
        filters.sort((a, b) => {
          if (a.type === "filter" && a.isTimeField) return -1;
          if (b.type === "filter" && b.isTimeField) return 1;
          if (a.required) return -1;
          if (b.required) return 1;
          return 0;
        }),
      [filters]
    );

    return (
      <div className="ant-ext-sb__filterBar">
        <GlobalMenu disabled={disabled || emptyList} />
        {sorted.map((filter, index) =>
          filter.isTimeField ? (
            <TimeFilterPicker
              key={index}
              disabled={disabled || emptyList}
              value={filter.value ? filter.value.toString() : "$now"}
              onChange={(v) => updateFilter(index, { value: v })}
            />
          ) : (
            <FilterTag key={index} index={index} filter={filter} disabled={disabled || emptyList} />
          )
        )}
        <AddButton disabled={disabled || emptyList} />
        {emptyList && emptyFields && <div>{emptyFields}</div>}
      </div>
    );
  }
);
FilterbarWrapper.displayName = "FilterbarWrapper";
