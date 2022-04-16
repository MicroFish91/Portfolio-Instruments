import { IncomeTaxFormConverted } from "../../../validation/types";
import { IntervalSize } from "../types";

const DOUGHNUT_COLORS = [
  "#B6D0E2",
  "#A7C7E7",
  "#ADD8E6",
  "#7393B3",
  "#6082B6",
  "#e183ec",
  "#d7f719",
  "#f03457",
  "#fb873a",
  "#19f4d5",
  "#f37070",
  "#f6b926",
  "#825ad8",
  "#8d83a4",
  "#e3ab9b",
  "#9eae96",
];

export function getColors(n: number): string[] {
  const colors = DOUGHNUT_COLORS.slice(0, n);
  colors.push("#67fc76");
  return colors;
}

export function getLabels(incomeBreakdown: Record<string, number>): string[] {
  const ib = { ...incomeBreakdown };
  const taxLabels = [];

  taxLabels.push("Federal Tax");
  taxLabels.push("FICA Tax");
  taxLabels.push("Medicare Tax");
  taxLabels.push("State Tax");
  taxLabels.push("Other Tax");

  return [...taxLabels, ...Object.keys(ib), "Unallocated"];
}

export function getNormalized(
  allocations: number[],
  size: IntervalSize
): number[] {
  return allocations.map((val) => parseFloat((val / size).toFixed(2)));
}

export function getValues(
  incomeBreakdown: Record<string, number>,
  taxBreakdown: IncomeTaxFormConverted
): number[] {
  const ib = { ...incomeBreakdown };
  const tb: Partial<IncomeTaxFormConverted> = { ...taxBreakdown };
  const taxValues: number[] = [];
  let unallocated = tb.grossPay;

  delete tb.grossPay;

  unallocated = Object.values(tb).reduce(
    (acc: number | undefined, nxt: number | undefined): number => {
      return <number>acc - <number>nxt;
    },
    unallocated
  );

  unallocated = Object.values(ib).reduce(
    (acc: number | undefined, nxt: number | undefined): number => {
      return <number>acc - <number>nxt;
    },
    unallocated
  );

  taxValues.push(tb.federalTax as number);
  taxValues.push(tb.fica as number);
  taxValues.push(tb.medicare as number);
  taxValues.push(tb.state as number);
  taxValues.push(tb.other as number);

  return [
    ...taxValues,
    ...(Object.values(ib) as number[]),
    unallocated as number,
  ];
}

export function getUnallocated(
  allocations: number[],
  grossLimit: number
): number {
  let allocated = allocations.reduce((acc, nxt) => {
    return acc + nxt;
  }, 0);

  allocated = allocated - allocations[allocations.length - 1];

  return grossLimit - allocated;
}
