// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { SearchBar } from "@ant-extensions/searchbar";
import { ConfigProvider } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "./common/i18n";

export const Example = () => {
  const { i18n } = useTranslation(I18nKey);
  return (
    <ConfigProvider direction={i18n.dir()}>
      <div style={{ padding: "2em", margin: "auto" }}>
        <SearchBar />
      </div>
    </ConfigProvider>
  );
};
