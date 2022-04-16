import { CagFormConverted } from "../../../validation/types";

// Safe Withdrawal Amounts Projected into the Future Adjusted for Inflation
export function getSWRBreakdown(
  annualExpenses: number,
  inflationRate: number,
  swr: number,
  years: number
): number[] {
  const swrNetWorth = parseFloat((annualExpenses / swr).toFixed(2));
  const swrPoints = [swrNetWorth];

  for (let t = 0; t < years; t++) {
    const newPoint = parseFloat(
      (swrPoints[swrPoints.length - 1] * (1 + inflationRate)).toFixed(2)
    );
    swrPoints.push(newPoint);
  }

  return swrPoints;
}

// @return ["x-axis labels", "lowerBound", "middleBound", "upperBound"]
export function getYearlyProjectionData({
  annualInflation: ai,
  annualReturn: ar,
  numberOfYears: t,
  periodsPerYear: n,
  principal: p,
  recurringInvestment: ri,
  stdDeviation: sd,
}: CagFormConverted): [number[], number[], number[], number[]] {
  let currentYear = new Date().getFullYear();
  const xAxisLabels = [currentYear];
  const [lBounds, mBounds, uBounds] = [[p], [p], [p]];

  const [lNthRate, nthRate, hNthRate] = getAllNthRates(ar, ai, sd, n);

  for (let i = 0; i < t; i++) {
    currentYear += 1;
    xAxisLabels.push(currentYear);

    if (i === 0) {
      // Initial interval since it might already be the middle of the year
      const si = computeStartInterval(n);
      lBounds.push(computeAG(lBounds[lBounds.length - 1], ri, lNthRate, n, si));
      mBounds.push(computeAG(mBounds[mBounds.length - 1], ri, nthRate, n, si));
      uBounds.push(computeAG(uBounds[uBounds.length - 1], ri, hNthRate, n, si));
      ri *= 1 + ai;
      continue;
    }

    lBounds.push(computeAG(lBounds[lBounds.length - 1], ri, lNthRate, n));
    mBounds.push(computeAG(mBounds[mBounds.length - 1], ri, nthRate, n));
    uBounds.push(computeAG(uBounds[uBounds.length - 1], ri, hNthRate, n));
    ri *= 1 + ai;
  }

  return [xAxisLabels, lBounds, mBounds, uBounds];
}

function getAllNthRates(
  ar: number,
  ai: number,
  sd: number,
  n: number
): [number, number, number] {
  const average = ar - ai;

  return [
    convertNthRate(average - sd + ai, n),
    convertNthRate(ar, n),
    convertNthRate(average + sd + ai, n),
  ];
}

function convertNthRate(ar: number, n: number): number {
  return (1 + ar) ** (1 / n);
}

// Compute annual gain
// si = start interval (0 means start on interval from beginning of the year)
function computeAG(
  p: number,
  ri: number,
  nthRate: number,
  n: number,
  si: number = 0
): number {
  for (let i = si; i < n; i++) {
    p = p * nthRate + ri;
  }

  return parseFloat(p.toFixed(2));
}

function computeStartInterval(n: number): number {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const numOfDays = Math.floor(
    (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)
  );
  const divisor = 365 / n;

  return Math.floor(numOfDays / divisor);
}
