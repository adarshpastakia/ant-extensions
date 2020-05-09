// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { Button, Card, Checkbox, Col, Form, Input, Row, Select, Switch } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { EnumOperator, IFilterField, IFilterObject, TypeOperators } from "../../utils/types";
import { Context } from "../context";
import { FieldOption } from "./FieldOption";
import { FilterValue } from "./FilterValue";

export const FilterForm: React.FC<{
  filter?: IFilterObject;
  index?: number;
  onCancel: () => void;
}> = React.memo(({ filter = {}, index, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(I18nKey);
  const { fields, removeFilter, updateFilter, addFilter } = useContext(Context);

  const [fieldObject, setField] = useState<IFilterField | undefined>(undefined);
  const [operator, setOperator] = useState<EnumOperator | undefined>(undefined);
  const [hasLabel, toggleHasLabel] = useState(!!filter.label);
  useEffect(() => {
    form.setFieldsValue({
      ...filter
    });
    if (filter) {
      setOperator(filter.operator);
      setField(fields.find((f) => f.key === filter.field));
    }
  }, []);

  const fieldChanged = useCallback(
    (fieldKey) => {
      if (fieldKey) {
        const _fieldObject = fields.find((f) => f.key === fieldKey);
        const operator = form.getFieldValue("operator");
        if (_fieldObject && (!operator || !TypeOperators[_fieldObject.type].includes(operator))) {
          form.setFieldsValue({
            value: undefined,
            operator: _fieldObject.defaultOperator || EnumOperator.EXISTS
          });
          setOperator(_fieldObject.defaultOperator || EnumOperator.EXISTS);
        }
        setField(_fieldObject);
      }
    },
    [fields]
  );

  const doSave = useCallback(() => {
    form.validateFields().then((v: AnyObject) => {
      const newFilter = {
        field: "",
        operator: undefined,
        value: undefined,
        label: "",
        pinned: false,
        required: false,
        negative: false,
        ...filter,
        ...v,
        active: true
      };
      if (index !== undefined) {
        updateFilter(index, newFilter);
      } else {
        addFilter(newFilter);
      }
      onCancel();
    });
  }, []);

  return (
    <Card className="ant-ext-sb__filterForm">
      <Form form={form} layout="vertical" size="small" onFinish={doSave}>
        {!filter.required && (
          <Row gutter={[8, 8]}>
            <Col flex="auto">
              <Form.Item
                name="field"
                label={t("label.field")}
                rules={[
                  {
                    required: true,
                    message: t("validate.field")
                  }
                ]}
              >
                <Select showSearch className="ant-ext-sb__selectField" onSelect={fieldChanged}>
                  {fields.map((f) => (
                    <Select.Option value={f.key} key={f.key} className="ant-ext-sb__fieldOption">
                      <FieldOption field={f} />
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Form.Item name="negative" label={t("label.exclude")} valuePropName="checked">
                <Switch className="ant-ext-sb__excludeSwitch" checkedChildren="NOT" />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item
                name="operator"
                label={t("label.operator")}
                rules={[
                  {
                    required: true,
                    message: t("validate.operator")
                  }
                ]}
              >
                <Select onSelect={(v) => setOperator(v as AnyObject)}>
                  <Select.Option value={EnumOperator.EXISTS}>
                    {t(`operator.${EnumOperator.EXISTS}`)}
                  </Select.Option>
                  {fieldObject &&
                    TypeOperators[fieldObject.type].map((op) => (
                      <Select.Option value={op} key={op}>
                        {t(`operator.${op}`)}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        {operator && operator !== EnumOperator.EXISTS && (
          <Form.Item
            label={t("label.value")}
            name="value"
            rules={[
              {
                required: true,
                message: t("validate.value")
              }
            ]}
          >
            <FilterValue field={fieldObject} operator={operator} />
          </Form.Item>
        )}

        <Form.Item
          name="label"
          label={t("label.label")}
          rules={[
            {
              required: hasLabel,
              message: t("validate.label")
            }
          ]}
        >
          <Input
            disabled={!hasLabel}
            addonBefore={
              <Checkbox
                checked={hasLabel}
                onChange={(e) => [
                  form.setFieldsValue({ label: "" }),
                  toggleHasLabel(e.target.checked)
                ]}
              />
            }
          />
        </Form.Item>
      </Form>
      <Row justify="space-between">
        <Col>
          {index !== undefined && !filter.required && !filter.pinned && (
            <Button size="small" type="danger" onClick={() => removeFilter(index)}>
              {t("label.delete")}
            </Button>
          )}
        </Col>
        <Col>
          <Button size="small" onClick={onCancel}>
            {t("label.cancel")}
          </Button>
          &nbsp;
          <Button size="small" type="primary" onClick={doSave}>
            {t("label.apply")}
          </Button>
        </Col>
      </Row>
    </Card>
  );
});
