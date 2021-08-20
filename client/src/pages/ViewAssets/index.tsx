import React from "react";
import { useSelector } from "react-redux";
import CardViewAssetsTable from "../../components/CardViewAssetsTable";
import { selectHasBenchmark } from "../../redux/Benchmarks/Selectors";

interface ViewAssetsProps {}

const ViewAssets: React.FC<ViewAssetsProps> = () => {
  const hasBenchmarks = useSelector(selectHasBenchmark);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {hasBenchmarks && <CardViewAssetsTable />}
      </div>
    </div>
  );
};

export default ViewAssets;
