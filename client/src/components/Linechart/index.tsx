import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  selectLineChartValuesRangeOne,
  selectLineChartValuesRangeTwo,
  selectXAxisLabels,
  selectYearRangeOne,
  selectYearRangeTwo,
} from "../../redux/Snapshots/snapshotSelector";

interface LinechartProps {}

const Linechart: React.FC<LinechartProps> = ({}) => {
  const xAxisLabels = useSelector(selectXAxisLabels);
  const yearRangeOne = useSelector(selectYearRangeOne);
  const yearRangeTwo = useSelector(selectYearRangeTwo);
  const monthlyDatasetOne = useSelector(selectLineChartValuesRangeOne);
  const monthlyDatasetTwo = useSelector(selectLineChartValuesRangeTwo);

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: yearRangeTwo,
        borderWidth: "1",
        fill: true,
        borderColor: "rgba(0,0,0,.2)",
        backgroundColor: "rgba(0,0,0,.07)",
        data: monthlyDatasetTwo,
      },
      {
        label: yearRangeOne,
        fill: true,
        borderColor: "rgba(137, 207, 240, 0.7)",
        backgroundColor: "rgba(137, 207, 240, 0.6)",
        data: monthlyDatasetOne,
      },
    ],
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: true,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  console.log(monthlyDatasetOne);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Net Worth</h3>
            </div>
            <div className="card-body">
              {monthlyDatasetOne !== undefined &&
              monthlyDatasetTwo !== undefined ? (
                <Line data={data} options={options} height={100} />
              ) : (
                <Line data={undefined} height={100} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linechart;
