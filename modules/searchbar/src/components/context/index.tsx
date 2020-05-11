// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import i18next from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { IFilterField, IFilterObject, IFilterProps, ISearchProps } from "../../utils/types";

interface IContext {
  fields: IFilterField[];
  filters: IFilterObject[];
  query: string;

  doSearch: () => void;
  updateQuery: (query: string) => void;

  updateFilter: (index: number, filter: Partial<IFilterObject>) => void;
  removeFilter: (index: number) => void;
  addFilter: (filter: IFilterObject) => void;

  enableAll: (value: boolean) => void;
  toggleExclude: () => void;
  removeAll: () => void;
}

export const Context = React.createContext<IContext>({ filters: [], query: "" } as AnyObject);

export const ContextProvider: React.FC<Partial<ISearchProps & IFilterProps>> = ({
  children,
  fields = [],
  filters: _filters = [],
  query: _query = "",
  onQueryChange,
  onFilterAdded,
  onFilterUpdate,
  onFilterRemoved,
  onFilterChanged,
  onSearch
}) => {
  const [filters, setFilters] = useState<IFilterObject[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    Array.isArray(_filters) && setFilters(_filters);
  }, [_filters]);
  useEffect(() => {
    setQuery(_query);
  }, [_query]);

  const updateQuery = useCallback(
    (q: string) => {
      setQuery(q);
      onQueryChange && onQueryChange(q);
    },
    [onQueryChange]
  );

  const doSearch = () => {
    onSearch &&
      onSearch({
        filters,
        query
      });
  };

  const addFilter = (filter: IFilterObject) => {
    const newFilters = [...filters, filter];
    setFilters([...filters, filter]);
    onFilterAdded && onFilterAdded(filter);
    onFilterChanged && onFilterChanged(newFilters);
  };

  const updateFilter = (index: number, filter: Partial<IFilterObject>) => {
    const newFilters = [...filters];
    const oldFilter = filters[index];
    newFilters.splice(index, 1, {
      ...oldFilter,
      ...filter
    });
    setFilters(newFilters);
    onFilterUpdate &&
      onFilterUpdate({
        ...oldFilter,
        ...filter
      });
    onFilterChanged && onFilterChanged(newFilters);
  };

  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    const [filter] = newFilters.splice(index, 1);
    setFilters(newFilters);
    onFilterRemoved && onFilterRemoved(filter);
    onFilterChanged && onFilterChanged(newFilters);
  };

  const enableAll = (value: boolean) => {
    const newFilters = filters.map((f) => (f.required ? f : { ...f, active: value }));
    setFilters(newFilters);
    onFilterChanged && onFilterChanged(newFilters);
  };

  const toggleExclude = () => {
    const newFilters = filters.map((f) => (f.required ? f : { ...f, negative: !f.negative }));
    setFilters(newFilters);
    onFilterChanged && onFilterChanged(newFilters);
  };

  const removeAll = () => {
    const newFilters = filters.filter((f) => f.required || f.isTimeField);
    setFilters(newFilters);
    onFilterChanged && onFilterChanged(newFilters);
  };

  return (
    <I18nextProvider i18n={i18next}>
      <Context.Provider
        value={{
          filters,
          fields,
          query,
          updateQuery,
          doSearch,
          addFilter,
          updateFilter,
          removeFilter,
          enableAll,
          toggleExclude,
          removeAll
        }}
      >
        {children}
      </Context.Provider>
    </I18nextProvider>
  );
};
