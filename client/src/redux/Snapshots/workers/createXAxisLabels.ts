const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Creates Date Labels spanning 2 years starting from the current date
export const createXAxisLabels = (): string[] => {
  const startDate = new Date();
  let monthIndex = startDate.getMonth();
  const dateLabels = [];

  for (let m = 0; m < 24; m++) {
    dateLabels.push(MONTHS[monthIndex]);
    monthIndex++;
    if (monthIndex > 11) {
      monthIndex = 0;
    }
  }

  return dateLabels;
};
