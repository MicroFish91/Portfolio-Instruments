export const convertToDollarString = (number: number): string => {
  return parseFloat(number.toString()).toFixed(2);
};
