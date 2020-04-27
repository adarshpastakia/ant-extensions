// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Divider } from "antd";
import React from "react";
import { BaseProps } from "../../utils/types";
import { QuickPresets } from "./QuickPresets";
import { QuickSelect } from "./QuickSelect";

export const DatePresets: React.FC<BaseProps> = React.memo((props) => {
  return (
    <div className="ant-ext-sd__quickForm">
      <QuickSelect {...props} />
      <Divider />
      <QuickPresets {...props} />
    </div>
  );
});
