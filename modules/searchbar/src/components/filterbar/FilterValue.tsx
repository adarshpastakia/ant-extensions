// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { RelativeDatePicker, RelativeRangePicker } from "@ant-extensions/super-date";
import { Input, InputNumber, Select, Switch } from "antd";
import React, { useMemo } from "react";
import { EnumFieldType, EnumOperator, IFilterField, OperatorValueType } from "../../utils/types";

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
      if (valueType === "single" && !field.values) {
        return <Input value={value} onChange={onChange} />;
      }
      return (
        <Select
          showSearch
          value={value}
          onChange={onChange}
          tokenSeparators={[","]}
          mode={valueType === "multiple" ? "tags" : undefined}
        />
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
