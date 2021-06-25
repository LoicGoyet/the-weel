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

export const getIndexOfLastDrafted = (items: Items) => {
  const lastDraftedItemId = items.draftedIds.slice(-1).pop();

  if (lastDraftedItemId === undefined) {
    return -1;
  }

  return items.allIds.indexOf(lastDraftedItemId);
};
