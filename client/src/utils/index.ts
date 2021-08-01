export const convertToDollarString = (number: number): string => {
  return parseFloat(number.toString()).toFixed(2);
};

// Returns the number of months in between two Dates
export const monthDifference = (d1: Date, d2: Date): number => {
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};
