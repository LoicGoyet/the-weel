export const pickRandomFromArr = <T = unknown>(arr: Array<T>) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const removeItemFromArray = <T = unknown>(
  itemToRm: T,
  arr: Array<T>,
): Array<T> => {
  return arr.filter(item => item !== itemToRm);
};
