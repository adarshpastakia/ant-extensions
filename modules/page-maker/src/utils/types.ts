// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { ReactNode } from "react";

export enum EnumTypes {
  PAGE = "page",
  ROW = "row",
  COL = "col",
  DIVIDER = "divider",
  HEADING = "heading",
  TILE = "tile"
}

export interface IItem {
  id: string;
  type: EnumTypes;
  [key: string]: AnyObject;
}

export interface IHeadingConfig extends IItem {
  type: EnumTypes.HEADING;
  title: string;
  size?: number;
  color?: string;
  iconCls?: string;
}

export interface IDividerConfig extends IItem {
  type: EnumTypes.DIVIDER;
  title?: string;
  size?: number;
  color?: string;
  iconCls?: string;
}

export interface IRowConfig extends IItem {
  type: EnumTypes.ROW;
  height: number | "auto";
  children: IColConfig[];
}

export interface IColConfig extends IItem {
  type: EnumTypes.COL;
  colSpan: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children?: PageConfig | [ITileConfig];
}

export interface ITileConfig extends IItem {
  type: EnumTypes.TILE;
  title?: string;
  info?: string;
  color?: string;
  iconCls?: string;
  bordered?: boolean;
  expandable?: boolean;
  widgetId: string;
}

export interface IWidgetObject {
  id: string;
  icon: ReactNode;
  title: string;
}

export interface IDragObject {
  type: EnumTypes;
  item?: IItem;
  title?: string;
  widgetId?: string;
}

export type PageItem = IHeadingConfig | IDividerConfig | IRowConfig | IColConfig | ITileConfig;

export type PageConfig = Array<IDividerConfig | IHeadingConfig | IRowConfig>;

export type WidgetObject = IWidgetObject;

export interface IProps {
  /**
   * Edit mode
   */
  isEditing?: boolean;
  /**
   * Page config
   */
  config: PageConfig;
  /**
   * Widget list
   */
  widgets: WidgetObject[];
  /**
   * Render widget tile
   * @param id
   */
  renderWidget: (widgetId: string) => JSX.Element;
  /**
   * Add new widget
   */
  onAdd?: (callback: (widget: WidgetObject) => void) => void;
  /**
   * Edit widget
   */
  onEdit?: (widgetId: string) => void;
  /**
   * Config changed
   */
  onChange?: (config: PageConfig) => void;
}
