import React from "react";
import { Doughnut } from "react-chartjs-2";

interface graphBreakdownProps {
  colors: string[];
  labels: string[];
  allocations: number[];
}

const AllocationGraph: React.FC<graphBreakdownProps> = ({
  colors,
  labels,
  allocations,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: allocations,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
      <u>
        <b>Notes</b>
      </u>
      : <br />
      Unallocated Remaining (Monthly): $
      {(allocations[allocations.length - 1] / 12).toFixed(2)}
    </div>
  );
};

export default AllocationGraph;
