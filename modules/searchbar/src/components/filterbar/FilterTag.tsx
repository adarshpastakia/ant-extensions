// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Checkbox, Dropdown, Menu, Tag } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { IFilterObject } from "../../utils/types";
import { Context } from "../context";
import { FilterForm } from "./FilterForm";
import { TwoTone } from "./TwoTone";

export const FilterTag: React.FC<{ filter: IFilterObject; index: number }> = React.memo(
  ({ index, filter }) => {
    const { t } = useTranslation(I18nKey);

    const { field, operator, value, label, active, negative, pinned, required } = filter;

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(required);
    const { fields, updateFilter, removeFilter } = useContext(Context);

    const displayLabel = useMemo(() => {
      if (label) return label;
      const _field = fields.find((f) => f.key === field);
      return (
        <span>
          {_field ? _field.name : field}&nbsp;<b>{t(`operator.${operator}`)}</b>&nbsp;
          {value ? value.toString() : ""}
        </span>
      );
    }, [label, field, operator, value]);

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
          {!pinned && (
            <Menu.Item
              className="ant-typography ant-typography-danger"
              onClick={() => removeFilter(index)}
            >
              <DeleteOutlined /> {t("label.remove")}
            </Menu.Item>
          )}
        </Menu>
      ),
      [active, negative, index]
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
      [filter, index, required, editing]
    );

    return (
      <Tag
        className="ant-ext-sb__filterTag"
        color={negative ? "red" : "blue"}
        data-active={active}
        data-negative={negative}
        closable={!required && !pinned}
        onClose={() => removeFilter(index)}
      >
        {!required && (
          <Checkbox
            style={{ gridArea: "check" }}
            checked={active}
            onChange={(e) => updateFilter(index, { active: e.target.checked })}
          />
        )}

        <Dropdown
          overlay={editing ? formOverlay : menuOverlay}
          trigger={["click"]}
          visible={open}
          onVisibleChange={(visible) => [setOpen(visible), !visible && setEditing(required)]}
        >
          <span className="ant-ext-sb__filterTag--label" onClick={() => setOpen(true)}>
            {displayLabel}
          </span>
        </Dropdown>
      </Tag>
    );
  }
);
