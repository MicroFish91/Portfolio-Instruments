import { BarData } from "./types";

export const STD_BAR_OPTIONS = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

export function buildBarData(
  labels: number[],
  swrData: number[],
  lBounds: number[],
  mBounds: number[],
  uBounds: number[]
) {
  let barData: BarData[];

  if (lBounds[1] === mBounds[1] || mBounds[1] === uBounds[1]) {
    // No Inflation Data Present
    barData = [
      {
        label: "Average Return",
        data: mBounds,
        backgroundColor: "#3399FF",
      },
    ];
  } else {
    // Inflation Data Present
    barData = [
      {
        label: "Lower Prediction Limit",
        data: lBounds,
        backgroundColor: "#FF6666",
      },
      {
        label: "Average Prediction Limit",
        data: mBounds,
        backgroundColor: "#3399FF",
      },
      {
        label: "Upper Prediction Limit",
        data: uBounds,
        backgroundColor: "#00FF80",
      },
    ];
  }

  return {
    labels,
    datasets: [
      {
        type: "line",
        label: "Safe Withdrawal Threshold",
        borderColor: "#000000",
        borderWidth: 2,
        fill: false,
        data: swrData,
      },
      ...barData,
    ],
  };
}
