// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : $date.year
// @license   : MIT

import { Tag } from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "../../utils/i18nKey";
import { EnumFieldType, IFilterField } from "../../utils/types";

export const FieldOption: React.FC<{ field: IFilterField }> = React.memo(
  ({ field: { name, type } }) => {
    const { t } = useTranslation(I18nKey);
    const tagColor = useMemo(() => {
      switch (type) {
        case EnumFieldType.INT:
          return "gold";
        case EnumFieldType.FLOAT:
          return "orange";
        case EnumFieldType.BOOLEAN:
          return "red";
        case EnumFieldType.DATE:
          return "blue";
        case EnumFieldType.GEO:
          return "purple";
        case EnumFieldType.STRING:
          return "green";
        default:
          return "gray";
      }
    }, [type]);
    return (
      <>
        <span>{name}</span>
        <Tag color={tagColor}>{t(`type.${type}`)}</Tag>
      </>
    );
  }
);
