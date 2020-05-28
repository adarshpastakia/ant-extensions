// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { CloseOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { Context } from "../context";
import { Config } from "./Config";
import { WidgetList } from "./WidgetList";

export const Aside: React.FC = React.memo(() => {
  const { t } = useTranslation(I18nKey);
  const { selected, editConfig } = useContext(Context);

  const [active, setActive] = useState<string | string[]>(["widgets"]);

  useLayoutEffect(() => {
    setActive(selected ? ["config", ...active] : ["widgets"]);
  }, [selected]);

  return (
    <div className="ant-ext-pm__aside">
      <Collapse activeKey={active} onChange={setActive}>
        {selected && (
          <Collapse.Panel
            key="config"
            header={t("label.config")}
            extra={<CloseOutlined onClick={() => editConfig(undefined)} />}
          >
            <Config />
          </Collapse.Panel>
        )}
        <Collapse.Panel key="widgets" header={t("label.widgets")}>
          <WidgetList />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});
