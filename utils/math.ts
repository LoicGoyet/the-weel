const fromAngleToRadiant = (angle: number) => {
  return angle * (Math.PI / 180);
};

export const getTriangleHypotenuse = (base: number, angle: number) => {
  return base / Math.cos(fromAngleToRadiant(angle));
};

export const getTriangleHeight = (base: number, hypotenuse: number) => {
  return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2));
};

export const getPointCoorInCircle = (angle: number) => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 * Math.cos(radians),
    y: -50 * Math.sin(radians),
  };
};
