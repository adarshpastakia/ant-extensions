// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { IItem } from "../../utils/types";
import { Context } from "../context";
import { EditHead } from "./EditHead";

export const Item: React.FC<{
  item: IItem;
  expanded?: boolean;
  style?: CSSProperties;
  itemRef?: MutableRefObject<HTMLDivElement | null>;
}> = React.memo(({ item, children, style, itemRef, expanded = false }) => {
  const [hover, setHover] = useState(false);
  const { isEditing, editConfig, selected, removeConfig, setDragging } = useContext(Context);
  const { id, type } = item;

  const isSelected = useMemo(() => selected && id === selected.id, [id, selected]);

  const onClick = useCallback(
    (e) => {
      if (isEditing) {
        editConfig(id);
        e.stopPropagation();
      }
    },
    [isEditing, editConfig]
  );

  const onMouseOver = useCallback(
    (e) => {
      if (isEditing) {
        setHover(true);
        e.stopPropagation();
      }
    },
    [isEditing]
  );

  return (
    <div
      ref={itemRef}
      className={`ant-ext-pm__item`}
      data-id={id}
      data-type={type}
      data-hover={hover}
      data-expanded={expanded}
      data-selected={isSelected}
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={() => setHover(false)}
    >
      {children}
      {isEditing && (
        <EditHead
          title={type}
          onRemove={() => removeConfig(id)}
          onDragStart={(e) => [setDragging({ type, item }), e.stopPropagation()]}
        />
      )}
    </div>
  );
});
