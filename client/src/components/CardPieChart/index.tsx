import React from "react";
import { Pie } from "react-chartjs-2";
import { DEFAULT_COLOR_PALETTE } from "./constants";

interface CardPieChartProps {
  cardTitle: string;
  titles: string[] | undefined;
  ratios: number[] | undefined;
}

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

const CardPieChart: React.FC<CardPieChartProps> = ({
  cardTitle,
  ratios,
  titles,
}) => {
  let data;

  if (titles) {
    data = {
      data: {
        labels: titles,
        datasets: [
          {
            data: ratios,
            backgroundColor: DEFAULT_PIE_COLORS.slice(0, titles.length),
            hoverBackgroundColor: DEFAULT_PIE_COLORS.slice(0, titles.length),
          },
        ],
      },
    };
  } else {
    data = DEFAULT_PIE_DATA;
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{cardTitle}</h3>
        </div>
        <div className="card-body">
          <Pie data={data.data} />
        </div>
      </div>
    </div>
  );
};

export default CardPieChart;
