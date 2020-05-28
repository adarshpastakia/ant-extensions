// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React, { useContext } from "react";
import { EnumTypes } from "../../utils/types";
import { Context } from "../context";

export const Card: React.FC<{
  type: EnumTypes;
  widgetId?: string;
  title?: string;
}> = React.memo(({ children, type, widgetId, title }) => {
  const { setDragging } = useContext(Context);
  return (
    <div
      className="ant-ext-pm__widgetList--card"
      draggable
      onDragStart={() => setDragging({ type, title, widgetId })}
    >
      {children}
    </div>
  );
});
