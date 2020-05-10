// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { TimeFilterPicker } from "@ant-extensions/super-date";
import React, { useContext, useEffect, useMemo } from "react";
import { IFilterProps } from "../../utils/types";
import { Context } from "../context";
import { AddButton } from "./AddButton";
import { FilterTag } from "./FilterTag";
import { GlobalMenu } from "./GlobalMenu";

export const FilterbarWrapper: React.FC<IFilterProps> = React.memo(
  ({ disabled = false, fields = [] }) => {
    const { filters, updateFilter } = useContext(Context);

    useEffect(() => {
      if (!fields || fields.length === 0) {
        throw new Error("Field list is required for filters");
      }
    }, [fields]);

    const sorted = useMemo(
      () =>
        filters.sort((a, b) => {
          if (a.isTimeField) return -1;
          if (b.isTimeField) return 1;
          if (a.required) return -1;
          if (b.required) return 1;
          return 0;
        }),
      [filters]
    );

    return (
      <div className="ant-ext-sb__filterBar">
        <GlobalMenu disabled={disabled} />
        {sorted.map((filter, index) =>
          filter.isTimeField ? (
            <TimeFilterPicker
              value={filter.value ? filter.value.toString() : "$now"}
              onChange={(v) => updateFilter(index, { value: v })}
            />
          ) : (
            <FilterTag key={index} index={index} filter={filter} />
          )
        )}
        <AddButton disabled={disabled} />
      </div>
    );
  }
);
