const fromAngleToRadiant = (angle: number) => {
  return angle * (Math.PI / 180);
};

export const getTriangleHypotenuse = (base: number, angle: number) => {
  return base / Math.cos(fromAngleToRadiant(angle));
};

export const getTriangleHeight = (base: number, hypotenuse: number) => {
  return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2));
};
