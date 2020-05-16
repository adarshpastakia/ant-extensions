// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React from "react";
import { ISearchProps } from "../../utils/types";
import { SearchInput } from "./SearchInput";

export const SearchbarWrapper: React.FC<ISearchProps> = React.memo(
  ({ addonPrefix, addonSuffix, actions, children }) => {
    return (
      <div className="ant-ext-sb__searchBar">
        <Input.Group className="ant-ext-sb__inputGroup" compact>
          {children}
          {addonPrefix && (
            <Input.Group className="ant-ext-sb__addonPrefix" compact>
              {addonPrefix}
            </Input.Group>
          )}
          <SearchInput />
        </Input.Group>
        {addonSuffix && (
          <Input.Group className="ant-ext-sb__addonSuffix" compact>
            {addonSuffix}
          </Input.Group>
        )}
        {actions && (
          <Dropdown overlay={actions} trigger={["click"]}>
            <Button className="ant-ext-sb__actions" icon={<MenuOutlined />} />
          </Dropdown>
        )}
      </div>
    );
  }
);
SearchbarWrapper.displayName = "SearchbarWrapper";
