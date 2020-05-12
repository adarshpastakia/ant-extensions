// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { Dropdown, Tag } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { CompareForm } from "./CompareForm";

export const AddCompare: React.FC<{ disabled: boolean }> = React.memo(({ disabled }) => {
  const { t } = useTranslation(I18nKey);
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      overlay={open ? <CompareForm onCancel={() => setOpen(false)} /> : <div />}
      trigger={["click"]}
      disabled={disabled}
      visible={open}
      overlayStyle={{ zIndex: 1010 }}
      onVisibleChange={(visible) => setOpen(visible)}
    >
      <Tag className="ant-ext-sb__addFilter">{t("label.addCompare")}</Tag>
    </Dropdown>
  );
});
AddCompare.displayName = "AddCompare";
