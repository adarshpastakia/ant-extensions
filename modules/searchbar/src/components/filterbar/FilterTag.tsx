// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { DateUtils } from "@ant-extensions/super-date";
import { Checkbox, Dropdown, Menu, Tag, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { EnumFieldType, IFilterObject } from "../../utils/types";
import { Context } from "../context";
import { FilterForm } from "./FilterForm";
import { TwoTone } from "./TwoTone";

export const FilterTag: React.FC<{
  filter: IFilterObject;
  index: number;
  disabled: boolean;
}> = React.memo(({ index, filter, disabled }) => {
  const { t } = useTranslation(I18nKey);

  const { field, operator, type, value, label, compare, active, negative, required } = filter;

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(required);
  const { fields, updateFilter, removeFilter } = useContext(Context);

  const displayValue = useMemo(() => {
    const _field = fields.find((f) => f.key === field);
    const _compare = fields.find((f) => f.key === compare);
    let _value = value ? `"${value.toString()}"` : "";
    if (type === "compare") {
      _value = _compare ? _compare.name : compare || "";
    }
    return _value ? (
      <span className="ant-ext-sb__filterTag--clip">
        {_field && value && _field.type === EnumFieldType.DATE
          ? DateUtils.label(value.toString())
          : _value}
      </span>
    ) : undefined;
  }, [field, value, fields, t]);

  const displayLabel = useMemo(() => {
    const _field = fields.find((f) => f.key === field);
    return (
      <>
        <span className="ant-ext-sb__filterTag--clip">{_field ? _field.name : field}</span>
        <b>&nbsp;{t(`operator.${operator}`)}&nbsp;</b>
        {displayValue}
      </>
    );
  }, [field, operator, displayValue, fields, t]);

  const menuOverlay = useMemo(
    () => (
      <Menu className="ant-ext-sb__dropdown">
        <Menu.Item onClick={() => setEditing(true)}>
          <EditOutlined /> {t(`label.edit`)}
        </Menu.Item>
        <Menu.Item onClick={() => updateFilter(index, { active: !active })}>
          {active ? <EyeOutlined /> : <EyeInvisibleOutlined />}{" "}
          {t(`label.${active ? "disable" : "enable"}`)}
        </Menu.Item>
        <Menu.Item onClick={() => updateFilter(index, { negative: !negative })}>
          <Icon component={TwoTone} /> {t(`label.${negative ? "include" : "exclude"}`)}
        </Menu.Item>
        <Menu.Item
          className="ant-typography ant-typography-danger"
          onClick={() => removeFilter(index)}
        >
          <DeleteOutlined /> {t("label.remove")}
        </Menu.Item>
      </Menu>
    ),
    [active, negative, index, removeFilter, t, updateFilter]
  );

  const formOverlay = useMemo(
    () => (
      <div className="ant-ext-sb__dropdown" data-for-required={required}>
        <FilterForm
          filter={filter}
          index={index}
          onCancel={() => [setOpen(false), setEditing(required)]}
        />
      </div>
    ),
    [filter, index, required]
  );

  const color = useMemo(
    () =>
      negative ? (type === "filter" ? "red" : "orange") : type === "filter" ? "blue" : "geekblue",
    [negative, type]
  );

  return (
    <Tag
      className="ant-ext-sb__filterTag"
      color={color}
      data-active={active && !disabled}
      data-negative={negative}
      closable={!required}
      onClose={() => removeFilter(index)}
    >
      {!required && (
        <Checkbox
          style={{ gridArea: "check" }}
          checked={active}
          disabled={disabled}
          onChange={(e) => updateFilter(index, { active: e.target.checked })}
        />
      )}
      <Tooltip overlay={displayLabel} trigger="hover">
        <Dropdown
          overlay={editing ? formOverlay : menuOverlay}
          trigger={["click"]}
          visible={open}
          disabled={disabled}
          overlayStyle={{ zIndex: 1010 }}
          onVisibleChange={(visible) => [setOpen(visible), !visible && setEditing(required)]}
        >
          <span className="ant-ext-sb__filterTag--label" onClick={() => setOpen(true)}>
            {label ? label : displayLabel}
          </span>
        </Dropdown>
      </Tooltip>
    </Tag>
  );
});
FilterTag.displayName = "FilterTag";
