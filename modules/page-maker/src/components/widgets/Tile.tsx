// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import {
  EditOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { ITileConfig } from "../../utils/types";
import { Context } from "../context";
import { Item } from "./Item";

export const Tile: React.FC<ITileConfig> = React.memo((item) => {
  const { isEditing, editWidget, renderWidget, findWidget } = useContext(Context);
  const style = useMemo(
    () => ({
      color: item.color || "inherit"
    }),
    [item.color]
  );

  const [expanded, setExpanded] = useState(false);

  const widget = useMemo(() => findWidget(item.widgetId), [item.widgetId]);

  return (
    <Item item={item} expanded={!isEditing && expanded}>
      <div className="ant-ext-pm__tileHead">
        <span style={style}>{item.iconCls && <i className={item.iconCls} />}</span>
        <label style={style}>{item.title}</label>
        <div>
          {item.info && (
            <Tooltip
              overlay={<pre dangerouslySetInnerHTML={{ __html: item.info }} />}
              overlayClassName="ant-ext-pm__tileInfo"
            >
              <button>
                <InfoCircleOutlined />
              </button>
            </Tooltip>
          )}
          {!isEditing && item.expandable && (
            <button className="ant-ext-pm__tileExpander" onClick={() => setExpanded(!expanded)}>
              {expanded ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </button>
          )}
          {isEditing && (
            <button onClick={() => editWidget(item.widgetId)}>
              <EditOutlined />
            </button>
          )}
        </div>
      </div>
      <div className="ant-ext-pm__tileBody">
        {!isEditing && renderWidget(item.widgetId)}
        {isEditing && widget && (
          <div style={{ placeSelf: "center", textAlign: "center" }}>
            {widget.icon}
            <div>{widget.title}</div>
          </div>
        )}
      </div>
    </Item>
  );
});
Tile.displayName = "Tile";
