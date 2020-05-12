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
import { Checkbox, Dropdown, Menu, Tag, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { ICompareObject } from "../../utils/types";
import { Context } from "../context";
import { CompareForm } from "./CompareForm";
import { TwoTone } from "./TwoTone";

export const CompareTag: React.FC<{ filter: ICompareObject; index: number }> = React.memo(
  ({ index, filter }) => {
    const { t } = useTranslation(I18nKey);

    const { field, operator, compare, active, negative, required } = filter;

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(required);
    const { fields, updateFilter, removeFilter } = useContext(Context);

    const displayLabel = useMemo(() => {
      const _field = fields.find((f) => f.key === field);
      const _compare = fields.find((f) => f.key === compare);
      return (
        <>
          <span className="ant-ext-sb__filterTag--clip">{_field ? _field.name : field}</span>
          <b>&nbsp;{t(`operator.${operator}`)}&nbsp;</b>
          <span className="ant-ext-sb__filterTag--clip">{_compare ? _compare.name : compare}</span>
        </>
      );
    }, [field, operator, compare, fields, t]);

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
          <CompareForm
            filter={filter}
            index={index}
            onCancel={() => [setOpen(false), setEditing(required)]}
          />
        </div>
      ),
      [filter, index]
    );

    return (
      <Tag
        className="ant-ext-sb__filterTag"
        color={negative ? "orange" : "geekblue"}
        data-active={active}
        data-negative={negative}
        closable={!required}
        onClose={() => removeFilter(index)}
      >
        {!required && (
          <Checkbox
            style={{ gridArea: "check" }}
            checked={active}
            onChange={(e) => updateFilter(index, { active: e.target.checked })}
          />
        )}
        <Tooltip overlay={displayLabel} trigger="hover">
          <Dropdown
            overlay={editing ? formOverlay : menuOverlay}
            trigger={["click"]}
            visible={open}
            overlayStyle={{ zIndex: 1010 }}
            onVisibleChange={(visible) => [setOpen(visible), !visible && setEditing(required)]}
          >
            <span className="ant-ext-sb__filterTag--label" onClick={() => setOpen(true)}>
              {displayLabel}
            </span>
          </Dropdown>
        </Tooltip>
      </Tag>
    );
  }
);
CompareTag.displayName = "CompareTag";
