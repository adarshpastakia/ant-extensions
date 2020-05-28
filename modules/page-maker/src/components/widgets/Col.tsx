// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { EnumTypes, IColConfig } from "../../utils/types";
import { Context } from "../context";
import { Divider } from "./Divider";
import { Heading } from "./Heading";
import { Item } from "./Item";
import { Row } from "./Row";
import { Tile } from "./Tile";

export const Col: React.FC<IColConfig> = React.memo((item) => {
  const { isEditing, updateConfig, addWidget } = useContext(Context);
  const { id, children, colSpan } = item;

  const refEl = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(colSpan);

  useLayoutEffect(() => {
    setSpan(span);
  }, [span]);

  const onResize = (evt: MouseEvent) => {
    const newX = evt.clientX;
    if (refEl.current && refEl.current.parentElement) {
      const box = refEl.current.getBoundingClientRect();
      const minWidth = Math.round(refEl.current.parentElement.offsetWidth / 12);
      let newSpan = Math.floor((newX - (box.left - minWidth)) / minWidth) || 1;
      if (newSpan > 12) newSpan = 12;
      setSpan(newSpan as AnyObject);
    }
  };

  const onResizeEnd = () => {
    if (refEl.current) {
      updateConfig(id, "span", colSpan);
    }
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  const onResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", onResizeEnd);
  };

  const isStretched = useMemo(() => {
    return children && children.length > 0 && children[0].type === EnumTypes.TILE;
  }, [children]);

  return (
    <Item
      item={item}
      itemRef={refEl}
      style={{ gridColumnEnd: `span ${span}`, gridAutoRows: isStretched ? "auto" : "max-content" }}
    >
      {Array.isArray(children) &&
        (children as AnyObject).map((item: AnyObject) => {
          switch (item.type) {
            case EnumTypes.HEADING:
              return <Heading key={item.id} {...item} />;
            case EnumTypes.DIVIDER:
              return <Divider key={item.id} {...item} />;
            case EnumTypes.ROW:
              return <Row key={item.id} {...item} />;
            case EnumTypes.TILE:
              return <Tile key={item.id} {...item} />;
            default:
              return null;
          }
        })}
      {isEditing && (!children || children.length === 0) && (
        <div style={{ placeSelf: "center" }}>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={(e) => [addWidget(item.id), e.stopPropagation()]}
          >
            Add New Widget
          </Button>
        </div>
      )}
      {isEditing && <div className="ant-ext-pm__resizer" onMouseDown={onResizeStart} />}
    </Item>
  );
});
Col.displayName = "Col";
