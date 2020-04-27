// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Badge, Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";

interface IProps {
  count: number;
  collapsed: boolean;
  onToggle: () => void;
}

export const FilterToggle: React.FC<IProps> = React.memo(
  ({ collapsed = true, count = 0, onToggle }) => {
    const { t } = useTranslation(I18nKey);

    return (
      <Button
        className="ant-ext-sb__filterToggle"
        icon={
          <Badge showZero count={count} overflowCount={25} />
        }
        ghost={!collapsed}
        onClick={onToggle}
        type={collapsed ? "default" : "primary"}
        onFocusCapture={(e) => e.target.blur()}
      >
        <span className="ant-ext-sb__filterToggle--label">{t("label.filters")}&nbsp;</span>
      </Button>
    );
  }
);
