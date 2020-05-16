// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { RelativeDatePicker, RelativeRangePicker } from "@ant-extensions/super-date";
import { Input, InputNumber, Select, Switch } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import {
  EnumFieldType,
  EnumOperator,
  FieldValue,
  IFilterField,
  OperatorValueType
} from "../../utils/types";

export const FilterValue: React.FC<{
  field?: IFilterField;
  operator?: EnumOperator;
  value?: AnyObject;
  onChange?: (value: AnyObject) => void;
}> = React.memo(({ field, operator, value, onChange }) => {
  const type = useMemo(() => field && field.type, [field]);
  const valueType = useMemo(
    () => operator && operator !== EnumOperator.EXISTS && OperatorValueType[operator],
    [operator]
  );

  const [values, setValues] = useState<FieldValue[]>(field && field.values ? field.values : []);
  const [searching, setSearching] = useState(false);
  const doSearch = useCallback(
    (search) => {
      if (field && field.onSearch) {
        setSearching(true);
        field
          .onSearch(search)
          .then((data) => {
            setValues(data);
            setSearching(false);
          })
          .catch(() => setSearching(false));
      }
    },
    [field]
  );

  if (type === EnumFieldType.BOOLEAN) {
    return <Switch checked={value} onChange={onChange} />;
  }

  if (field && valueType) {
    if (type === EnumFieldType.INT || type === EnumFieldType.FLOAT) {
      if (valueType === "double") {
        return (
          <Input.Group>
            <InputNumber
              value={value ? value[0] : undefined}
              max={value ? value[1] : undefined}
              onChange={(v) => onChange && onChange([v, value ? value[1] : undefined])}
            />
            <InputNumber
              value={value ? value[1] : undefined}
              min={value ? value[0] : undefined}
              onChange={(v) => onChange && onChange([value ? value[0] : undefined, v])}
            />
          </Input.Group>
        );
      } else {
        return <InputNumber value={value} onChange={onChange} />;
      }
    }
    if (type === EnumFieldType.STRING) {
      if (valueType === "single" && !field.values && !field.onSearch) {
        return <Input value={value} onChange={onChange} />;
      }
      return (
        <Select
          showSearch
          value={value}
          onChange={onChange}
          onSearch={doSearch}
          loading={searching}
          tokenSeparators={[","]}
          mode={valueType === "multiple" ? "tags" : undefined}
        >
          {values.map((ob, index) => (
            <Select.Option key={index} value={typeof ob === "string" ? ob : ob.value}>
              {typeof ob === "string" ? ob : ob.label}
            </Select.Option>
          ))}
        </Select>
      );
    }
    if (type === EnumFieldType.DATE) {
      return valueType === "double" ? (
        <RelativeRangePicker value={value} onChange={onChange} />
      ) : (
        <RelativeDatePicker value={value} onChange={onChange} />
      );
    }
  }

  return null;
});
FilterValue.displayName = "FilterValue";
