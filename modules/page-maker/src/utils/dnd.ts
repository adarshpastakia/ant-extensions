// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

/** @internal */
import { EnumTypes, IDragObject } from "./types";

/**
 * Ghost element
 */
const ghost: HTMLElement = document.createElement("div");
ghost.classList.add("ant-ext-pm__ghost");

/**
 * generate element id
 */
const generateId = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

/**
 * get config from drag object
 */
export const getNodeConfig = (dragging: IDragObject, parentType?: EnumTypes) => {
  let newConfig: AnyObject = dragging.item;

  if (!newConfig) {
    newConfig = {
      type: dragging.type,
      title: dragging.title,
      id: generateId()
    };
    if (dragging.type === EnumTypes.TILE)
      newConfig = {
        ...newConfig,
        bordered: true,
        expandable: true,
        widgetId: dragging.widgetId
      };
    else if (dragging.type === EnumTypes.COL)
      newConfig = {
        ...newConfig,
        colSpan: 3
      };
    else if (dragging.type === EnumTypes.ROW)
      newConfig = {
        ...newConfig,
        height: 32
      };
  }

  if (newConfig.type === EnumTypes.TILE && parentType !== EnumTypes.COL) {
    newConfig = {
      ...getNodeConfig({ type: EnumTypes.COL }, EnumTypes.ROW),
      children: [newConfig]
    };
  }
  if (newConfig.type === EnumTypes.COL && parentType !== EnumTypes.ROW) {
    newConfig = {
      ...getNodeConfig({ type: EnumTypes.ROW }),
      children: [newConfig]
    };
  }
  return newConfig;
};

const getCorrectParent = (target: HTMLElement, dragId: string) => {
  let parent = target;
  while (parent && parent.dataset.id !== dragId) {
    parent = parent.parentElement as HTMLElement;
  }
  return (parent ? parent.parentElement : target) as HTMLElement;
};

const getNearestNode = (target: HTMLElement, types?: EnumTypes[]) => {
  const typeCheck = types || [
    EnumTypes.ROW,
    EnumTypes.COL,
    EnumTypes.TILE,
    EnumTypes.HEADING,
    EnumTypes.DIVIDER
  ];
  while (target && !typeCheck.includes(target.dataset.type as EnumTypes)) {
    target = target.parentElement as HTMLElement;
  }
  return target;
};

const calculatePosition = (evt: React.DragEvent, neighbor: HTMLElement, isRow: boolean) => {
  const rect = neighbor.getBoundingClientRect();
  if (neighbor.parentElement) {
    if (isRow && evt.clientY < rect.top + rect.height / 2) {
      neighbor.parentElement.insertBefore(ghost, neighbor);
    } else if (!isRow && evt.clientX < rect.left + rect.width / 2) {
      neighbor.parentElement.insertBefore(ghost, neighbor);
    } else {
      if (neighbor.nextElementSibling) {
        neighbor.parentElement.insertBefore(ghost, neighbor.nextElementSibling);
      } else {
        neighbor.parentElement.appendChild(ghost);
      }
    }
  }
};

const getRowNeighbor = (evt: React.DragEvent, neighbor: HTMLElement) => {
  const nodeType = neighbor.dataset.type as EnumTypes;
  const child = neighbor.firstElementChild as HTMLElement;

  if (
    nodeType === EnumTypes.TILE ||
    (nodeType === EnumTypes.COL && child.dataset.type === EnumTypes.TILE)
  ) {
    neighbor = getNearestNode(neighbor, [EnumTypes.ROW]);
  }

  if (neighbor.dataset.type === EnumTypes.COL) {
    neighbor.appendChild(ghost);
  } else {
    calculatePosition(evt, neighbor, true);
  }
};

const getColNeighbor = (evt: React.DragEvent, neighbor: HTMLElement) => {
  const nodeType = neighbor.dataset.type as EnumTypes;

  if (nodeType === EnumTypes.TILE) {
    neighbor = getNearestNode(neighbor, [EnumTypes.COL]);
  }

  if (neighbor.dataset.type === EnumTypes.ROW && neighbor.firstElementChild) {
    neighbor.firstElementChild.appendChild(ghost);
  } else {
    calculatePosition(evt, neighbor, false);
  }
};

const getTilePosition = (evt: React.DragEvent, neighbor: HTMLElement) => {
  const nodeType = neighbor.dataset.type as EnumTypes;
  const child = neighbor.firstElementChild as HTMLElement;

  if (
    nodeType === EnumTypes.TILE ||
    (nodeType === EnumTypes.COL && child.dataset.type === EnumTypes.TILE)
  ) {
    neighbor = getNearestNode(neighbor, [EnumTypes.ROW]);
  }

  if (neighbor.dataset.type === EnumTypes.COL) {
    neighbor.appendChild(ghost);
  } else if (neighbor.dataset.type === EnumTypes.ROW && neighbor.firstElementChild) {
    neighbor.firstElementChild.appendChild(ghost);
  } else {
    calculatePosition(evt, neighbor, false);
  }
};

/**
 * Element drag over
 */
export const onDragOver = (evt: React.DragEvent, dragging: IDragObject) => {
  evt.preventDefault();
  const target = evt.target as HTMLElement;
  if (target !== ghost) {
    const node = getNearestNode(
      dragging.item ? getCorrectParent(target, dragging.item.id) : target
    );
    if (node) {
      switch (dragging.type) {
        case EnumTypes.ROW:
        case EnumTypes.HEADING:
        case EnumTypes.DIVIDER:
          return getRowNeighbor(evt, node);
        case EnumTypes.COL:
          return getColNeighbor(evt, node);
        case EnumTypes.TILE:
          return getTilePosition(evt, node);
      }
    } else {
      target.appendChild(ghost);
    }
  }
};

export const onDrop = (dragging: IDragObject) => {
  const parent = ghost.parentElement;
  if (parent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const index = [...parent.children].indexOf(ghost);
    const nearest = getNearestNode(ghost);
    const { id, type } = nearest ? nearest.dataset : { id: undefined, type: undefined };
    ghost.remove();
    return {
      index,
      id: id,
      move: dragging.item ? dragging.item.id : undefined,
      item: getNodeConfig(dragging, type as EnumTypes)
    };
  }
};

export const onDragLeave = (evt: React.DragEvent) => {
  if (evt.relatedTarget && (evt.relatedTarget as HTMLElement).dataset.type === EnumTypes.PAGE) {
    ghost.remove();
    return true;
  }
  return false;
};
