// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import Icon, {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { Context } from "../context";
import { TwoTone } from "./TwoTone";

export const GlobalMenu: React.FC<{ disabled: boolean }> = React.memo(({ disabled }) => {
  const { t } = useTranslation(I18nKey);
  const { filters, enableAll, toggleExclude, removeAll } = useContext(Context);

  const menu = useMemo(() => {
    const someEnabled = filters.some((f) => !f.required && f.active);
    const someDisabled = filters.some((f) => !f.required && !f.active);
    const hasNotRequired = filters.some((f) => !f.required);

    return (
      <Menu>
        <h4 style={{ padding: "0 16px" }}>{t("label.all_filters")}</h4>
        <Menu.Item disabled={!someDisabled} onClick={() => enableAll(true)}>
          <EyeOutlined /> {t("label.enable_all")}
        </Menu.Item>
        <Menu.Item disabled={!someEnabled} onClick={() => enableAll(false)}>
          <EyeInvisibleOutlined /> {t("label.disable_all")}
        </Menu.Item>
        <Menu.Item disabled={!hasNotRequired} onClick={toggleExclude}>
          {<Icon component={TwoTone} />} {t("label.invert")}
        </Menu.Item>
        <Menu.Item
          className="ant-typography ant-typography-danger"
          disabled={!hasNotRequired}
          onClick={removeAll}
        >
          <DeleteOutlined /> {t("label.remove_all")}
        </Menu.Item>
      </Menu>
    );
  }, [filters, enableAll, removeAll, t, toggleExclude]);

  return (
    <Dropdown overlay={menu} trigger={["click"]} disabled={disabled || filters.length === 0}>
      <Button type="link" icon={<SettingOutlined />} />
    </Dropdown>
  );
});
GlobalMenu.displayName = "GlobalMenu";
