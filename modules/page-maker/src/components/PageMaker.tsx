// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React from "react";
import { IProps } from "../utils/types";
import { ContextProvider } from "./context";
import { Aside } from "./widgets/Aside";
import { Page } from "./widgets/Page";

/**
 * Page maker
 */
export const PageMaker: React.FC<IProps> = React.memo((props) => {
  return (
    <ContextProvider {...props}>
      <div className="ant-ext-pm__container">
        <Page />

        {props.isEditing && <Aside />}
      </div>
    </ContextProvider>
  );
});
PageMaker.displayName = "PageMaker";
