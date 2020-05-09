// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Input } from "antd";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { Context } from "../context";

export const SearchInput: React.FC = React.memo(() => {
  const { t } = useTranslation(I18nKey);
  const { query, updateQuery, doSearch } = useContext(Context);

  const doUpdate = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(evt.target.value);
  }, []);

  return (
    <Input.Group className="ant-ext-sb__searchInput" compact>
      <Input.Search
        type="search"
        value={query}
        enterButton
        onChange={doUpdate}
        onSearch={doSearch}
        placeholder={t("placeholder")}
      />
    </Input.Group>
  );
});
SearchInput.displayName = "SearchInput";
