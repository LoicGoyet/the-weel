import {v4 as uuidv4} from 'uuid';
import {pickRandomFromArr, removeItemFromArray} from '../utils/array';
import {fromArrToRgb, interpolateColors, RgbArray} from '../utils/colors';
import {removeKeyFromObject} from '../utils/object';
import {z} from 'zod';

export const Item = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string(),
});
export type Item = z.infer<typeof Item>;

export const Items = z.object({
  byId: z.record(Item),
  allIds: z.array(z.string()),
  draftedIds: z.array(z.string()),
  undraftedIds: z.array(z.string()),
});
export type Items = z.infer<typeof Items>;

export const Presets = z.record(Items);
export type Presets = z.infer<typeof Presets>;

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

export const removeItem = (itemId: Item['id'], items: Items) => {
  return updateItemColors({
    ...items,
    byId: removeKeyFromObject(itemId, items.byId),
    allIds: removeItemFromArray(itemId, items.allIds),
    undraftedIds: removeItemFromArray(itemId, items.undraftedIds),
    draftedIds: removeItemFromArray(itemId, items.draftedIds),
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

export const getIsItemDrafted = (itemId: Item['id'], items: Items) => {
  return items.draftedIds.includes(itemId);
};

export const setItemAsDrafted = (itemId: Item['id'], items: Items) => {
  return {
    ...items,
    draftedIds: [...items.draftedIds, itemId],
    undraftedIds: removeItemFromArray(itemId, items.undraftedIds),
  };
};

export const setItemAsUndrafted = (itemId: Item['id'], items: Items) => {
  return {
    ...items,
    draftedIds: removeItemFromArray(itemId, items.draftedIds),
    undraftedIds: [...items.undraftedIds, itemId],
  };
};
