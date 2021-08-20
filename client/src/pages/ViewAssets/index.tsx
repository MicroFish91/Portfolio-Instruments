import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardViewAssetsTable from "../../components/CardViewAssetsTable";
import { selectHasBenchmark } from "../../redux/Benchmarks/Selectors";

interface ViewAssetsProps {}

const ViewAssets: React.FC<ViewAssetsProps> = () => {
  const hasBenchmark = useSelector(selectHasBenchmark);
  const history = useHistory();

  useEffect(() => {
    if (!hasBenchmark) {
      history.push("/gettingStarted");
    }
  }, [hasBenchmark]);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {hasBenchmark && <CardViewAssetsTable />}
      </div>
    </div>
  );
};

export default ViewAssets;
