export const checkMinMaxValue = (value: number, min?: number, max?: number) => {
  return max && value > max ? max : min && value < min ? min : value;
};
