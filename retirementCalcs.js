// Based off formula A = P(1 + r/n)^(nt)
// We can compute (1 + r/n) using function convertNthRate

// other variables
// annual expected costs in todays dollars
// swr
const annualExpenses = 80000;
const swr = 0.04;
console.log(annualExpenses / swr);

// User form variables
const p = 100000; // principal
const ar = 0.063; // annual return
const n = 26; // number of periods per year
const ri = 1500; // recurring investment amount per n
const t = 20; // number of years

const nthRate = convertNthRate(ar, n);
const yb = [p]; // yearly breakdown

for (let i = 0; i < t; i++) {
  yb.push(computeAG(yb[yb.length - 1], ri, nthRate, n));
}

console.log(yb);

function convertNthRate(annualRate, n) {
  return (1 + annualRate) ** (1 / n);
}

// principal = starting amount for that year
// nth rate = annual gain
// n = periods of per year (# of times investing per year)
function computeAG(p, ri, nthRate, n) {
  for (let i = 0; i < n; i++) {
    p = p * nthRate + ri;
  }

  return parseFloat(p.toFixed(2));
}
