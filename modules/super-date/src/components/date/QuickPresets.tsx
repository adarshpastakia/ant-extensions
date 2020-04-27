// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Button, Typography } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { parseDateLabel } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { BaseProps, DateParts } from "../../utils/types";

const Presets: string[][] = [["$now", "$day-1", "$day+1"]];

export const QuickPresets: React.FC<BaseProps> = React.memo(({ onChange }) => {
  const { t } = useTranslation(I18nKey);

  const selectPreset = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { preset = DateParts.NOW } = e.currentTarget.dataset;
      onChange && onChange(`${preset}`);
    },
    [onChange]
  );

  return (
    <>
      <Typography.Text strong>{t("label.preset")}</Typography.Text>
      {Presets.map((p, i) => (
        <div className="ant-ext-sd__presetRow" key={i}>
          {p.map((key) => (
            <Button key={key} data-preset={key} size="small" type="link" onClick={selectPreset}>
              {t(parseDateLabel(key))}
            </Button>
          ))}
        </div>
      ))}
    </>
  );
});
