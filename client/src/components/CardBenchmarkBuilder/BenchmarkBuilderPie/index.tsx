import React from "react";
import { Pie } from "react-chartjs-2";
import { DEFAULT_COLOR_PALETTE } from "../../CardPieChart/constants";

interface benchmarkBuilderPieProps {
  assetCategories: string[];
  assetPercentages: number[];
}

const BenchmarkBuilderPie: React.FC<benchmarkBuilderPieProps> = ({
  assetCategories,
  assetPercentages,
}) => {
  const DEFAULT_PIE_DATA = {
    data: {
      labels: [""],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    },
  };
  const DEFAULT_PIE_COLORS = DEFAULT_COLOR_PALETTE;
  let data;

  if (assetCategories) {
    data = {
      data: {
        labels: assetCategories,
        datasets: [
          {
            data: assetPercentages,
            backgroundColor: DEFAULT_PIE_COLORS.slice(
              0,
              assetCategories.length
            ),
            hoverBackgroundColor: DEFAULT_PIE_COLORS.slice(
              0,
              assetCategories.length
            ),
          },
        ],
      },
    };
  } else {
    data = DEFAULT_PIE_DATA;
  }

  return (
    <div>
      <Pie data={data.data} />
    </div>
  );
};

export default BenchmarkBuilderPie;
