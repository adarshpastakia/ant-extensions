// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React, { useCallback, useEffect, useState } from "react";
import { IFilterProps, ISearchProps } from "../utils/types";
import { ContextProvider } from "./context";
import { FilterbarWrapper } from "./filterbar/Wrapper";
import { FilterToggle } from "./searchbar/FilterToggle";
import { SearchbarWrapper } from "./searchbar/Wrapper";

/**
 * Search bar
 */
export const SearchBar: React.FC<ISearchProps & IFilterProps> = ({
  query = "",
  filters = [],
  fields = [],
  emptyFields,
  disabled = false,
  hideFilters = false,
  collapsed: _collapsed = true,
  addonSuffix,
  addonPrefix,
  actions,
  onSearch,
  onQueryChange,
  onFilterAdded,
  onFilterChanged,
  onFilterRemoved,
  onFilterUpdate,
  onCollapsed
}) => {
  const [collapsed, setCollapsed] = useState(_collapsed);

  useEffect(() => {
    setCollapsed(_collapsed);
  }, [_collapsed]);

  const toggleFilters = useCallback(() => {
    setCollapsed(!collapsed);
    onCollapsed && onCollapsed(!collapsed);
  }, [collapsed, onCollapsed]);

  return (
    <ContextProvider
      {...{
        filters,
        fields,
        query,
        onQueryChange,
        onSearch,
        onFilterAdded,
        onFilterChanged,
        onFilterRemoved,
        onFilterUpdate
      }}
    >
      <div className="ant-ext-sb__wrapper">
        <SearchbarWrapper {...{ addonSuffix, addonPrefix, actions, disabled }}>
          {!hideFilters && <FilterToggle collapsed={collapsed} onToggle={toggleFilters} />}
        </SearchbarWrapper>

        {!hideFilters && !collapsed && <FilterbarWrapper {...{ disabled, fields, emptyFields }} />}
      </div>
    </ContextProvider>
  );
};
SearchBar.displayName = "SearchBar";
