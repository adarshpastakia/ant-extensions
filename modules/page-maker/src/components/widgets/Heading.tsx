// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React, { useMemo } from "react";
import { IHeadingConfig } from "../../utils/types";
import { Item } from "./Item";

export const Heading: React.FC<IHeadingConfig> = React.memo((item) => {
  const { title, size, color, iconCls } = item;
  const style = useMemo(
    () => ({
      color: color || "inherit",
      fontSize: size || 13
    }),
    [color, size]
  );

  return (
    <Item item={item}>
      <div style={style}>
        {iconCls && <i className={iconCls} />}
        <div>{title}</div>
      </div>
    </Item>
  );
});
Heading.displayName = "Heading";
