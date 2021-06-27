import {v4 as uuidv4} from 'uuid';
import {pickRandomFromArr, removeItemFromArray} from '../utils/array';
import {fromArrToRgb, interpolateColors, RgbArray} from '../utils/colors';

export type Item = {
  id: string;
  label: string;
  color: string;
};

export type Items = {
  byId: Record<string, Item>;
  allIds: Array<string>;
  draftedIds: Array<string>;
  undraftedIds: Array<string>;
};

const firstItemColorArr: RgbArray = [252, 119, 83];
const lastItemColorArr: RgbArray = [219, 213, 110];

export const initialItems = {
  byId: {
    'item-1': {
      id: 'item-1',
      label: 'Heads',
      color: fromArrToRgb(firstItemColorArr),
    },
    'item-2': {
      id: 'item-2',
      label: 'Tails',
      color: fromArrToRgb(lastItemColorArr),
    },
  },
  allIds: ['item-1', 'item-2'],
  draftedIds: [],
  undraftedIds: ['item-1', 'item-2'],
};

export const getIndexOfLastDrafted = (items: Items) => {
  const lastDraftedItemId = items.draftedIds.slice(-1).pop();

  if (lastDraftedItemId === undefined) {
    return -1;
  }

  return items.allIds.indexOf(lastDraftedItemId);
};

export const updateItemLabel = (
  label: Item['label'],
  itemId: Item['id'],
  items: Items,
): Items => {
  return {
    ...items,
    byId: {
      ...items.byId,
      [itemId]: {
        ...items.byId[itemId],
        label,
      },
    },
  };
};

export const addNewItem = (items: Items) => {
  const newItemId = uuidv4();

  return updateItemColors({
    ...items,
    byId: {
      ...items.byId,
      [newItemId]: {
        id: newItemId,
        label: '',
        color: '#ff0',
      },
    },
    allIds: [...items.allIds, newItemId],
    undraftedIds: [...items.undraftedIds, newItemId],
  });
};

export const updateItemColors = (items: Items) => {
  const colors = interpolateColors(
    firstItemColorArr,
    lastItemColorArr,
    items.allIds.length,
  );

  return items.allIds.reduce((updatedItems, itemId, index) => {
    return {
      ...updatedItems,
      byId: {
        ...updatedItems.byId,
        [itemId]: {
          ...updatedItems.byId[itemId],
          color: fromArrToRgb(colors[index]),
        },
      },
    };
  }, items);
};

export const pickItem = (items: Items) => {
  const itemDrafted = pickRandomFromArr<Item['id']>(items.undraftedIds);
  return {
    ...items,
    draftedIds: [...items.draftedIds, itemDrafted],
    undraftedIds: removeItemFromArray<Item['id']>(itemDrafted, items.undraftedIds),
  };
};

export const resetItemsPicks = (items: Items) => ({
  ...items,
  draftedIds: [],
  undraftedIds: items.allIds,
});

export const areAllItemsPicked = (items: Items) => {
  return items.allIds.every(itemId => items.draftedIds.includes(itemId));
};
