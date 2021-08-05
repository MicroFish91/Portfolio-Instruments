// Returns the number of months in between two Dates
export const monthDifference = (d1: Date, d2: Date): number => {
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const usdFormatter = () => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
};
