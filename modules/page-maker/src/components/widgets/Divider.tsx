// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Divider as AntDivider } from "antd";
import React, { useMemo } from "react";
import { IDividerConfig } from "../../utils/types";
import { Item } from "./Item";

export const Divider: React.FC<IDividerConfig> = React.memo((item) => {
  const { title, color, iconCls, size } = item;
  const style = useMemo(
    () => ({
      color: color || "inherit",
      fontSize: size || 13
    }),
    [color, size]
  );

  return (
    <Item item={item}>
      <AntDivider style={style}>
        {iconCls || title ? (
          <>
            {iconCls && <i className={iconCls} />}
            {title && <span>{title}</span>}
          </>
        ) : null}
      </AntDivider>
    </Item>
  );
});
Divider.displayName = "Divider";
