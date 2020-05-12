// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { Button, Card, Col, Form, Row, Select, Switch } from "antd";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { EnumFieldType, EnumOperator, ICompareObject, IFilterField } from "../../utils/types";
import { Context } from "../context";
import { FieldSelect } from "../FieldSelect";

export const CompareForm: React.FC<{
  filter?: ICompareObject;
  index?: number;
  onCancel: () => void;
}> = React.memo(({ filter = {}, index, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(I18nKey);
  const { fields, removeFilter, updateFilter, addFilter } = useContext(Context);

  const [fieldObject, setField] = useState<IFilterField | undefined>(undefined);
  useEffect(() => {
    form.setFieldsValue({
      ...filter
    });
    if (filter) {
      setField(fields.find((f) => f.key === filter.field));
    }
  }, []);

  const operators = useMemo(() => {
    if (
      fieldObject &&
      fieldObject.type !== EnumFieldType.BOOLEAN &&
      fieldObject.type !== EnumFieldType.GEO
    ) {
      return fieldObject.type === EnumFieldType.STRING
        ? [EnumOperator.IS, EnumOperator.IN, EnumOperator.INCLUDES]
        : [
            EnumOperator.IS,
            EnumOperator.IN,
            EnumOperator.INCLUDES,
            EnumOperator.GT,
            EnumOperator.GTE,
            EnumOperator.LT,
            EnumOperator.LTE
          ];
    }
    return [];
  }, [fieldObject]);

  const fieldChanged = useCallback(
    (fieldKey) => {
      if (fieldKey) {
        const _fieldObject = fields.find((f) => f.key === fieldKey);
        setField(_fieldObject);
      }
    },
    [fields]
  );

  const doSave = useCallback(() => {
    form.validateFields().then((v: AnyObject) => {
      const newFilter = {
        type: "compare",
        field: "",
        operator: undefined,
        compare: undefined,
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
  }, [addFilter, updateFilter, onCancel, filter, form, index]);

  return (
    <Card className="ant-ext-sb__filterForm forCompare">
      <Form form={form} layout="vertical" size="small" onFinish={doSave}>
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
          <FieldSelect fields={fields} onSelect={fieldChanged} disabled={filter.required} />
        </Form.Item>
        <Row gutter={[8, 8]}>
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
              <Select>
                {operators.map((op) => (
                  <Select.Option value={op} key={op}>
                    {t(`operator.${op}`)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={t("label.compare")}
          name="compare"
          rules={[
            {
              required: true,
              message: t("validate.value")
            }
          ]}
        >
          <FieldSelect
            fields={fields.filter((f) => !fieldObject || f.key !== fieldObject.key)}
            disabled={filter.required}
          />
        </Form.Item>
      </Form>
      <Row justify="space-between">
        <Col>
          {index !== undefined && !filter.required && (
            <Button size="small" danger onClick={() => removeFilter(index)}>
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
CompareForm.displayName = "CompareForm";
