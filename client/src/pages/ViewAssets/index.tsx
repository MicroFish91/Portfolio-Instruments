import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardViewAssetsTable from "../../components/ViewAssetsTable";
import { selectHasBenchmark } from "../../redux/Benchmarks/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";

interface ViewAssetsProps {}

const ViewAssets: React.FC<ViewAssetsProps> = () => {
  const hasBenchmark = useSelector(selectHasBenchmark);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const history = useHistory();

  useEffect(() => {
    if (!hasBenchmark || !hasSnapshots) {
      history.push("/gettingStarted");
    }
  }, [hasBenchmark]);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {hasBenchmark && hasSnapshots && <CardViewAssetsTable />}
      </div>
    </div>
  );
};

export default ViewAssets;
