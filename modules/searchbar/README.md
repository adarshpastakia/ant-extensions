# Ant Extensions - Search Bar

### Kibana style searchbar with filters

---

### Install

```shell
# Using npm
npm install @ant-extensions/searchbar

# Using yarn
yarn add @ant-extensions/searchbar
```

---

### Basic Usage

```tsx
import React, { useState } from "react";
import { SearchBar } from "@ant-extensions/searchbar";

export const Tester = () => {
  return <SearchBar collapsed={false} filters={[]} fields={[]} emptyField={"Message when fields list is empty"} />;
};
```

```tsx
import React, { useState } from "react";
import { FilterBar } from "@ant-extensions/searchbar";

export const Tester = () => {
  return <FilterBar filters={[]} fields={[]} emptyField={"Message when fields list is empty"} />;
};
```

---

> `FieldSelect`
> Select input for fields, to maintain consistency throughout the application
>
> ```tsx
> import React, { useState } from "react";
> import { Form } from "antd";
> import { FieldSelect } from "@ant-extensions/searchbar";
> 
> export const Tester = () => {
>   return (
>     <Form.Item name="field">
>       <FieldSelect value={"fieldKey"} onChange={(fieldKey) => "do something"} fields={[]} />;
>     </Form.Item>
>   );
> };
> ```
