// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React, { useEffect, useState } from "react";
import { getNodeConfig } from "../../utils/dnd";
import {
  EnumTypes,
  IDragObject,
  IProps,
  IWidgetObject,
  PageConfig,
  PageItem
} from "../../utils/types";

interface DropObject {
  item: PageItem;
  index: number;
  move?: string;
  id?: string;
}

interface IContext {
  isEditing: boolean;
  config: PageConfig;
  widgets: IWidgetObject[];

  selected?: AnyObject;

  dragging?: AnyObject;
  setDragging: (d?: IDragObject) => void;

  editConfig: (id?: string) => void;
  removeConfig: (id: string) => void;
  addItem: (opt?: DropObject) => void;
  updateConfig: (id: string, key: keyof PageItem, value: AnyObject) => void;

  addWidget: (colId: string) => void;
  editWidget: (widgetId: string) => void;
  findWidget: (widgetId: string) => IWidgetObject | undefined;
  renderWidget: (widgetId: string) => JSX.Element;
}

const findDeep = (obj: PageItem[], id: string): PageItem | undefined => {
  const find = obj.find((o) => o.id === id);
  if (find) {
    return find;
  } else {
    for (let i = 0; i < obj.length; i++) {
      if ("children" in obj[i] && Array.isArray(obj[i].children)) {
        const _inner = findDeep(obj[i].children, id);
        if (_inner) {
          return _inner;
        }
      }
    }
  }
  return undefined;
};

const removeDeep = (obj: PageItem[], id: string): PageItem[] => {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id === id) {
      return obj.filter((o) => o.id !== id);
    }
    if ("children" in obj[i]) {
      if (Array.isArray(obj[i].children)) {
        obj[i] = { ...obj[i], children: removeDeep(obj[i].children, id) } as AnyObject;
      }
    }
  }
  return [...obj];
};

export const Context = React.createContext<IContext>({} as IContext);

export const ContextProvider: React.FC<IProps> = ({
  children,
  onEdit,
  onAdd,
  renderWidget,
  onChange,
  widgets = [],
  isEditing: _isEditing = false,
  config: _config
}) => {
  const [dragging, setDragging] = useState<IDragObject | undefined>();
  const [selected, setSelected] = useState<PageItem | undefined>();

  const [isEditing, setIsEditing] = useState(_isEditing);
  const [config, setConfig] = useState(_config);

  useEffect(() => {
    setConfig(_config);
  }, [_config]);
  useEffect(() => {
    setIsEditing(_isEditing);
  }, [_isEditing]);

  const editConfig = (id?: string) => {
    setSelected(id ? findDeep(config, id) : undefined);
  };

  const removeConfig = (id: string) => {
    const newConfig = [...(removeDeep(config, id) as AnyObject)];
    setConfig(newConfig);
    onChange && onChange(newConfig);
  };

  const updateConfig = (id: string, key: keyof PageItem, value: AnyObject) => {
    const _o = findDeep(config, id);
    if (_o) {
      _o[key] = value;
      setSelected({ ..._o });
      setConfig([...config]);
      onChange && onChange([...config]);
    }
  };

  const addItem = (opt?: DropObject) => {
    if (opt) {
      const { id, item, index, move } = opt;
      let newConfig = [...config];
      if (move) {
        newConfig = removeDeep(newConfig, move) as AnyObject;
      }
      if (id) {
        const _o = findDeep(newConfig, id);
        if (_o && Array.isArray(_o.children)) {
          _o.children.splice(index, 0, item as AnyObject);
        }
        if (_o && !_o.children) {
          _o.children = [item];
        }
      } else {
        newConfig.splice(index, 0, item as AnyObject);
      }
      setDragging(undefined);
      setConfig(newConfig);
      onChange && onChange(newConfig);
    }
  };

  const addWidget = (colId: string) => {
    onAdd &&
      onAdd((widget) => {
        const newTile = getNodeConfig(
          {
            widgetId: widget.id,
            title: widget.title,
            type: EnumTypes.TILE
          },
          EnumTypes.COL
        );
        updateConfig(colId, "children", [newTile]);
        setSelected(newTile);
      });
  };

  const editWidget = (widgetId: string) => {
    onEdit && onEdit(widgetId);
  };

  const findWidget = (widgetId: string) => {
    return widgets.find(({ id }) => id === widgetId);
  };

  return (
    <Context.Provider
      value={{
        selected,
        isEditing,
        dragging,
        setDragging,
        editConfig,
        removeConfig,
        updateConfig,
        addItem,
        renderWidget,
        addWidget,
        editWidget,
        findWidget,
        widgets,
        config
      }}
    >
      {children}
    </Context.Provider>
  );
};
ContextProvider.displayName = "ContextProvider";
