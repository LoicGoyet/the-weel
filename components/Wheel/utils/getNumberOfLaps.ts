import {Items, getIndexOfLastDrafted} from '../../../data/wheel';

export const getNumberOfLaps = (items: Items) => {
  const completeLaps = items.draftedIds.length * 10;
  const lastDraftedIndex = getIndexOfLastDrafted(items);

  if (lastDraftedIndex <= 0) {
    return completeLaps;
  }

  const partialLap = lastDraftedIndex / items.allIds.length;
  return completeLaps + partialLap;
};
