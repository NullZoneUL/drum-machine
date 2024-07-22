export const checkMinMaxValue = (value: number, min?: number, max?: number) => {
  return typeof max === 'number' && value > max
    ? max
    : typeof min === 'number' && value < min
      ? min
      : value;
};
