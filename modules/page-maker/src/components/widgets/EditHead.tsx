// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { DeleteOutlined, DragOutlined } from "@ant-design/icons";
import React from "react";

export const EditHead: React.FC<{
  title: string;
  onRemove: () => void;
  onDragStart: React.DragEventHandler;
}> = React.memo(({ title, onRemove, onDragStart }) => (
  <div className="ant-ext-pm__head" draggable onDragStart={onDragStart}>
    <small>{title}</small>
    <div>
      <button>
        <DragOutlined />
      </button>
      <button onClick={(e) => [onRemove(), e.stopPropagation()]}>
        <DeleteOutlined />
      </button>
    </div>
  </div>
));
EditHead.displayName = "EditHead";
