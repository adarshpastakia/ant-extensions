// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Button, Checkbox, Col, Form, Input, InputNumber, Popover, Row, Switch } from "antd";
import React, { useContext } from "react";
import { BlockPicker } from "react-color";
import { useTranslation } from "react-i18next";
import { EnumTypes } from "../..";
import { I18nKey } from "../../utils/i18nKey";
import { Context } from "../context";

const colors = [
  "#40407a",
  "#706fd3",
  "#f7f1e3",
  "#34ace0",
  "#33d9b2",
  "#2c2c54",
  "#474787",
  "#aaa69d",
  "#227093",
  "#218c74",
  "#ff5252",
  "#ff793f",
  "#d1ccc0",
  "#ffb142",
  "#ffda79",
  "#b33939",
  "#cd6133",
  "#84817a",
  "#cc8e35",
  "#ccae62"
];

export const Config: React.FC = React.memo(() => {
  const { t } = useTranslation(I18nKey);
  const { selected, updateConfig } = useContext(Context);

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="ant-ext-pm__aside--form">
      <Form layout="vertical" size="small">
        {[EnumTypes.TILE, EnumTypes.DIVIDER, EnumTypes.HEADING].includes(selected.type) && (
          <>
            <Form.Item label={t("config.title")}>
              <Input
                value={selected.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Form.Item>
            <Row>
              <Col flex="auto">
                <label>{t("config.color")}</label>
              </Col>
              <Col>
                <Popover
                  placement="leftTop"
                  trigger="click"
                  overlayStyle={{ color: selected.color }}
                  overlayClassName="ant-ext-pm__colorPicker"
                  content={
                    <BlockPicker
                      colors={colors}
                      color={selected.color}
                      onChangeComplete={(c) => updateField("color", c.hex)}
                    />
                  }
                >
                  <Button>
                    <div style={{ width: 24, height: 16, backgroundColor: selected.color }} />
                  </Button>
                </Popover>
              </Col>
            </Row>
            <Row>
              <Col flex="auto">
                <label>{t("config.icon")}</label>
              </Col>
              <Col>{selected.iconCls && <i className={selected.iconCls} />}</Col>
            </Row>
            <Form.Item>
              <Input
                value={selected.iconCls}
                onChange={(e) => updateField("iconCls", e.target.value)}
              />
            </Form.Item>
          </>
        )}
        {[EnumTypes.DIVIDER, EnumTypes.HEADING].includes(selected.type) && (
          <Form.Item label={t("config.size")}>
            <InputNumber
              min={8}
              max={42}
              value={selected.size || 13}
              onChange={(e) => updateField("size", e)}
            />
          </Form.Item>
        )}
        {selected.type === EnumTypes.COL && (
          <Form.Item label={t("config.colSpan")}>
            <InputNumber
              min={1}
              max={12}
              value={selected.colSpan}
              onChange={(e) => updateField("colSpan", e)}
            />
          </Form.Item>
        )}
        {selected.type === EnumTypes.ROW && (
          <Form.Item label={t("config.height")}>
            <Input.Group>
              <Checkbox
                checked={selected.height === "auto"}
                onChange={(e) => [updateField("height", e.target.checked ? "auto" : 32)]}
              >
                Auto
              </Checkbox>
              <InputNumber
                min={32}
                max={800}
                disabled={selected.height === "auto"}
                value={selected.height}
                onChange={(e) => updateField("height", e)}
              />
            </Input.Group>
          </Form.Item>
        )}
        {selected.type === EnumTypes.TILE && (
          <>
            <Form.Item label={t("config.info")}>
              <Input.TextArea
                rows={5}
                value={selected.info}
                onChange={(e) => updateField("info", e.target.value)}
              />
            </Form.Item>
            <Row>
              <Col flex="auto">
                <label>{t("config.expand")}</label>
              </Col>
              <Col>
                <Switch
                  checked={selected.expandable}
                  onChange={(checked) => updateField("expandable", checked)}
                />
              </Col>
            </Row>
          </>
        )}
      </Form>
    </div>
  ) : null;
});
Config.displayName = "Config";
