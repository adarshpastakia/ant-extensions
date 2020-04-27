# Ant Extensions - Date Selector

### Date Selector for relative dates with DateMath

---

### Install


```shell
# Using npm
npm install @ant-extensions/super-date

# Using yarn
yarn add @ant-extensions/super-date
```

---

### Basic Usage

- RelativeRangePicker

```tsx
import React, { useState } from "react";
import { Form } from "antd";
import { ReactDateSelector } from "@ant-extensions/super-date";

export const Tester = () => {
  const [date, setDate] = useState<string | undefined>("$week|$now");

  return (
    <Form layout="inline">
      <Form.Item label="Date Selector">
        <ReactDateSelector value={date} onDateChange={setDate} allowClear />
      </Form.Item>
    </Form>
  );
};
```

> Component uses basic ant.design InputProps
>
> Props
>
> - `value`: `string`
> - `onDateChange`: `(date: string) => void`
> - `open`: `boolean`
> - `onVisibleChange`: `(open: boolean) => void`

---

- Util to parse date values and labels

```ts
import { DateUtils } from "@ant-extensions/super-date";

// Last 7 Days
DateUtils.label("$day-7");

// Last 7 Days ~ Now
DateUtils.label("$day-7|$now");

/**
 * @return [iso_date, iso_date]
 * Return string array of [start, end]
 */
DateUtils.parse("$day-7|$now");

/**
 * @return iso_date
 * Return single date string
 */
DateUtils.parse("$day-7");
```
