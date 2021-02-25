// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { FontSizeOutlined, MinusOutlined, PicCenterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EnumTypes } from "../..";
import { I18nKey } from "../../utils/i18nKey";
import { IWidgetObject } from "../../utils/types";
import { Context } from "../context";
import { Card } from "./Card";

export const WidgetList: React.FC = React.memo(() => {
  const { t } = useTranslation(I18nKey);
  const { widgets } = useContext(Context);

  const [search, setSearch] = useState("");
  const [list, setList] = useState<IWidgetObject[]>([]);

  useEffect(() => {
    if (widgets.length) {
      setList(widgets.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase())));
    }
  }, [widgets]);

  useLayoutEffect(() => {
    if (widgets.length) {
      const newList = widgets.sort((a, b) =>
        a.title.toUpperCase().localeCompare(b.title.toUpperCase())
      );

      if (search) {
        setList(newList.filter((w) => w.title.toUpperCase().includes(search.toUpperCase())));
      } else {
        setList(newList);
      }
    }
  }, [search, widgets]);

  return (
    <div className="ant-ext-pm__widgetList">
      <Input.Search allowClear onChange={(e) => setSearch(e.target.value)} />
      <div className="ant-ext-pm__widgetList--grid">
        <Card type={EnumTypes.ROW}>
          <PicCenterOutlined />
          <div>{t("label.row")}</div>
        </Card>
        <Card type={EnumTypes.COL}>
          <PicCenterOutlined rotate={90} />
          <div>{t("label.col")}</div>
        </Card>
        <Card type={EnumTypes.HEADING}>
          <FontSizeOutlined />
          <div>{t("label.heading")}</div>
        </Card>
        <Card type={EnumTypes.DIVIDER}>
          <MinusOutlined />
          <div>{t("label.divider")}</div>
        </Card>
      </div>
      <div className="ant-ext-pm__widgetList--grid">
        {list.length === 0 && (
          <span style={{ gridColumnEnd: "span 2" }}>{t("label.noWidgets")}</span>
        )}
        {list.map((widget) => (
          <Card key={widget.id} type={EnumTypes.TILE} widgetId={widget.id} title={widget.title}>
            {widget.icon}
            <div>{widget.title}</div>
          </Card>
        ))}
      </div>
    </div>
  );
});
WidgetList.displayName = "WidgetList";
