// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import React, { useContext, useEffect, useMemo } from "react";
import { IFilterProps } from "../../utils/types";
import { Context } from "../context";
import { AddButton } from "./AddButton";
import { FilterTag } from "./FilterTag";
import { GlobalMenu } from "./GlobalMenu";

export const FilterbarWrapper: React.FC<IFilterProps> = React.memo(
  ({ disabled = false, fields = [] }) => {
    const { filters } = useContext(Context);

    useEffect(() => {
      if (!fields || fields.length === 0) {
        throw new Error("Field list is required for filters");
      }
    }, [fields]);

    const sorted = useMemo(
      () =>
        filters.sort((a, b) => {
          if (a.required) return -1;
          if (b.required) return 1;
          if (a.pinned) return -1;
          if (b.pinned) return 1;
          return 0;
        }),
      [filters]
    );

    return (
      <div className="ant-ext-sb__filterBar">
        <GlobalMenu disabled={disabled} />
        {sorted.map((filter, index) => (
          <FilterTag key={index} index={index} filter={filter} />
        ))}
        <AddButton disabled={disabled} />
      </div>
    );
  }
);
