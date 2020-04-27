// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { MenuOutlined } from "@ant-design/icons";
import { Button, Input, Menu, Select } from "antd";
import i18next from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { IFilterObject, IQueryObject } from "../utils/types";
import { FilterToggle } from "./searchbar/FilterToggle";
import { SearchInput } from "./searchbar/SearchInput";

export interface IProps {
  /**
   * Query string
   */
  query?: string;
  /**
   * Filters list, pass false to hide filter bar
   * @default false
   */
  filters?: IFilterObject[] | false;
  /**
   * Search input placeholder
   */
  placeholder?: string;

  /**
   * Add-on before search input
   */
  addonPrefix?: JSX.Element;
  /**
   * Add-on after search input
   */
  addonSuffix?: JSX.Element;

  /**
   * Additional actions menu
   */
  actions?: Menu;

  /**
   * Disable component
   */
  disabled?: boolean;

  /**
   * Collapse filters
   * @default true
   */
  collapsed?: boolean;
  /**
   * On filter collapsed
   * @param collapsed
   */
  onCollapsed?: (collapsed: boolean) => void;

  /**
   * On search event
   * @param queryObject
   */
  onSearch?: (queryObject: IQueryObject) => void;
  /**
   * On query string change event
   * @param query
   */
  onQueryChange?: (query: string) => void;
}

/**
 * Search bar
 */
export const SearchBar: React.FC<IProps> = ({ query = "", collapsed = true, filters = false }) => {
  const [_filters, setFilters] = useState<IFilterObject[]>([]);
  const [_collapsed, setCollapsed] = useState(collapsed);

  useEffect(() => {
    Array.isArray(filters) && setFilters(filters);
  }, [filters]);
  useEffect(() => {
    setCollapsed(collapsed);
  }, [collapsed]);

  const toggleFilters = useCallback(() => {
    setCollapsed(!_collapsed);
  }, [_collapsed]);

  return (
    <I18nextProvider i18n={i18next}>
      <div className="ant-ext-sb__wrapper">
        <div className="ant-ext-sb__searchBar">
          <Input.Group className="ant-ext-sb__inputGroup" compact>
            <FilterToggle count={_filters.length} collapsed={_collapsed} onToggle={toggleFilters} />
            <Input.Group className="ant-ext-sb__addonPrefix" compact>
              <Select />
            </Input.Group>
            <SearchInput query={query} />
          </Input.Group>
          <Input.Group className="ant-ext-sb__addonSuffix" compact>
            <Select />
            <Select />
          </Input.Group>
          <Button className="ant-ext-sb__actions" icon={<MenuOutlined />} />
        </div>
      </div>
    </I18nextProvider>
  );
};
