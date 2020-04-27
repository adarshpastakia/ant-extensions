// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";

interface IProps {
  query: string;
}
export const SearchInput: React.FC<IProps> = React.memo(({ query }) => {
  const { t } = useTranslation(I18nKey);

  const [_query, setQuery] = useState("");
  useEffect(() => {
    setQuery(query);
  }, [query]);

  const doUpdate = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
  }, []);

  return (
    <Input.Group className="ant-ext-sb__searchInput" compact>
      <Input.Search
        type="search"
        value={_query}
        onChange={doUpdate}
        enterButton
        placeholder={t("placeholder")}
      />
    </Input.Group>
  );
});
