// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

export enum Type {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  GEO = "geo"
}

export enum Operator {
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

export const TypeOperators: { [key in Type]: Operator[] } = {
  [Type.STRING]: [Operator.IS, Operator.IN, Operator.CONTAINS, Operator.STARTS, Operator.ENDS],
  [Type.NUMBER]: [
    Operator.IS,
    Operator.BETWEEN,
    Operator.LT,
    Operator.GT,
    Operator.LTE,
    Operator.GTE
  ],
  [Type.BOOLEAN]: [Operator.IS],
  [Type.DATE]: [Operator.BETWEEN, Operator.LT, Operator.GT, Operator.LTE, Operator.GTE],
  [Type.GEO]: []
};

export const OperatorValueType: { [key in Operator]: "single" | "double" | "multiple" } = {
  [Operator.EXISTS]: "single",
  [Operator.IS]: "single",
  [Operator.IN]: "multiple",
  [Operator.BETWEEN]: "double",
  [Operator.WITHIN]: "single",
  [Operator.STARTS]: "single",
  [Operator.ENDS]: "single",
  [Operator.CONTAINS]: "single",
  [Operator.LT]: "single",
  [Operator.GT]: "single",
  [Operator.LTE]: "single",
  [Operator.GTE]: "single"
};

export type FilterValue =
  | undefined
  | boolean
  | string
  | string[]
  | number
  | [number, number]
  | KeyValue;

export type FieldValue = string | { value: string; label: string; icon?: AnyObject };

export interface IFilterField {
  key: string;
  name: string;
  type: Type;
  values?: FieldValue[];
  defaultOperator?: Operator;
  onSearch?: (q: string) => FieldValue[];
}

export interface IFilterObject {
  field: string;
  operator: Operator;
  value: FilterValue;
  label?: string;
  active?: boolean;
  pinned?: boolean;
  negative?: boolean;
  required?: boolean;
}

export interface IQueryObject {
  query?: string;
  filters: IFilterObject[];
}

export interface ISearchProps {
  query?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: JSX.Element;
  actions?: JSX.Element;
  collapsed?: boolean;
  onCollapsed?: (collapsed: boolean) => void;
  onSearch?: (queryObject: IQueryObject) => void;
  onQueryChange?: (query: string) => void;
}

export interface IFilterProps {
  disabled?: boolean;
  filters?: IFilterObject[];
  fields: IFilterField[];
  onFilterChange?: (filters: IFilterObject[]) => void;
}
