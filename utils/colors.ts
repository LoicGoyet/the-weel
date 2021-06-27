import {createCountArray} from './array';

export type RgbArray = [number, number, number];
type Rgb = `rgb(${number}, ${number}, ${number})`;

const interpolateColor = (
  color1: RgbArray,
  color2: RgbArray,
  factor: number,
): RgbArray => {
  const getColorItem = (index: 0 | 1 | 2) => {
    return Math.round(color1[index] + factor * (color2[index] - color1[index]));
  };

  return [getColorItem(0), getColorItem(1), getColorItem(2)];
};

export const fromArrToRgb = (rgbArr: RgbArray): Rgb => {
  return `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
};

export const interpolateColors = (
  color1: RgbArray,
  color2: RgbArray,
  steps: number,
): Array<RgbArray> => {
  const stepFactor = 1 / (steps - 1);

  return createCountArray(steps).map(index => {
    return interpolateColor(color1, color2, stepFactor * index);
  });
};
