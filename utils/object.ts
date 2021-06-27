export const removeKeyFromObject = <K extends keyof Record<string, unknown>, V>(
  keyToRm: K,
  object: Record<K, V>,
) => {
  return Object.entries(object).reduce((updatedObj, [key, value]) => {
    if (key === keyToRm) {
      return updatedObj;
    }

    return {
      ...updatedObj,
      [key]: value,
    };
  }, {}) as Record<K, V>;
};
