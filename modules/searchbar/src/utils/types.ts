// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

export enum EnumFieldType {
  STRING = "string",
  INT = "int",
  FLOAT = "float",
  BOOLEAN = "boolean",
  DATE = "date",
  GEO = "geo"
}

export enum EnumOperator {
  EXISTS = "EXISTS",
  IS = "IS",
  IN = "IN",
  LT = "LT",
  GT = "GT",
  LTE = "LTE",
  GTE = "GTE",
  INCLUDES = "INCLUDES",
  STARTS = "STARTS",
  ENDS = "ENDS",
  WITHIN = "WITHIN",
  BETWEEN = "BETWEEN"
}

/**
 * @internal
 */
export const TypeOperators: { [key in EnumFieldType]: EnumOperator[] } = {
  [EnumFieldType.STRING]: [
    EnumOperator.IS,
    EnumOperator.IN,
    EnumOperator.INCLUDES,
    EnumOperator.STARTS,
    EnumOperator.ENDS
  ],
  [EnumFieldType.INT]: [
    EnumOperator.IS,
    EnumOperator.BETWEEN,
    EnumOperator.LT,
    EnumOperator.GT,
    EnumOperator.LTE,
    EnumOperator.GTE
  ],
  [EnumFieldType.FLOAT]: [
    EnumOperator.IS,
    EnumOperator.BETWEEN,
    EnumOperator.LT,
    EnumOperator.GT,
    EnumOperator.LTE,
    EnumOperator.GTE
  ],
  [EnumFieldType.BOOLEAN]: [EnumOperator.IS],
  [EnumFieldType.DATE]: [
    EnumOperator.BETWEEN,
    EnumOperator.LT,
    EnumOperator.GT,
    EnumOperator.LTE,
    EnumOperator.GTE
  ],
  [EnumFieldType.GEO]: []
};

/**
 * @internal
 */
export const OperatorValueType: { [key in EnumOperator]: "single" | "double" | "multiple" } = {
  [EnumOperator.EXISTS]: "single",
  [EnumOperator.IS]: "single",
  [EnumOperator.IN]: "multiple",
  [EnumOperator.BETWEEN]: "double",
  [EnumOperator.WITHIN]: "single",
  [EnumOperator.STARTS]: "single",
  [EnumOperator.ENDS]: "single",
  [EnumOperator.INCLUDES]: "single",
  [EnumOperator.LT]: "single",
  [EnumOperator.GT]: "single",
  [EnumOperator.LTE]: "single",
  [EnumOperator.GTE]: "single"
};

/**
 * @internal
 */
export type FilterValue =
  | undefined
  | boolean
  | string
  | string[]
  | number
  | [number, number]
  | KeyValue;

/**
 * @internal
 */
export type FieldValue = string | { value: string; label: string; icon?: AnyObject };

export interface IFilterField {
  key: string;
  name: string;
  type: EnumFieldType;
  values?: FieldValue[];
  defaultOperator?: EnumOperator;
  onSearch?: (q: string) => Promise<FieldValue[]>;
}

export interface IFilterObject {
  type: "filter";
  field: string;
  operator: EnumOperator;
  value: FilterValue;
  label?: string;
  active?: boolean;
  isTimeField?: boolean;
  negative?: boolean;
  required?: boolean;
}

export interface ICompareObject {
  type: "compare";
  field: string;
  operator: EnumOperator;
  compare: string;
  active?: boolean;
  negative?: boolean;
  required?: boolean;
}

export type FilterObject = IFilterObject | ICompareObject;

export interface IQueryObject {
  query?: string;
  filters: FilterObject[];
}

export interface ISearchProps {
  /**
   * Query string
   */
  query?: string;

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
  actions?: JSX.Element;

  /**
   * Hide filter bar
   */
  hideFilters?: boolean;

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

export interface IFilterProps {
  /**
   * Filters list
   * @default []
   */
  filters?: FilterObject[];

  /**
   * Field list
   * (Required when filter bar enabled)
   */
  fields?: IFilterField[];

  /**
   * Disable component
   */
  disabled?: boolean;

  /**
   * On add filter
   * @param filter
   */
  onFilterAdded?: (filter: FilterObject) => void;
  /**
   * On update filter
   * @param filter
   */
  onFilterUpdate?: (filter: FilterObject) => void;
  /**
   * On remove filter
   * @param filter
   */
  onFilterRemoved?: (filter: FilterObject) => void;

  /**
   * On filters change, (add/update/delete)
   * @param filters
   */
  onFilterChanged?: (filters: FilterObject[]) => void;
}
