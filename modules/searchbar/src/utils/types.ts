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
  CONTAINS = "CONTAINS",
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
    EnumOperator.CONTAINS,
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
  [EnumOperator.CONTAINS]: "single",
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
  onSearch?: (q: string) => FieldValue[];
}

export interface IFilterObject {
  field: string;
  operator: EnumOperator;
  value: FilterValue;
  label?: string;
  active?: boolean;
  isTimeField?: boolean;
  negative?: boolean;
  required?: boolean;
}

export interface IQueryObject {
  query?: string;
  filters: IFilterObject[];
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
  filters?: IFilterObject[];

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
  onFilterAdded?: (queryObject: IQueryObject) => void;
  /**
   * On update filter
   * @param filter
   */
  onFilterUpdate?: (filter: IFilterObject) => void;
  /**
   * On remove filter
   * @param filter
   */
  onFilterRemoved?: (queryObject: IQueryObject) => void;

  /**
   * On filters change, (add/update/delete)
   * @param filters
   */
  onFilterChanged?: (filters: IFilterObject[]) => void;
}
