// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { Dropdown, Tag } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { FilterForm } from "./FilterForm";

export const AddButton: React.FC<{ disabled: boolean }> = React.memo(({ disabled }) => {
  const { t } = useTranslation(I18nKey);
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      overlay={open ? <FilterForm onCancel={() => setOpen(false)} /> : <div />}
      trigger={["click"]}
      disabled={disabled}
      visible={open}
      onVisibleChange={(visible) => setOpen(visible)}
    >
      <Tag className="ant-ext-sb__addFilter">{t("label.add")}</Tag>
    </Dropdown>
  );
});
