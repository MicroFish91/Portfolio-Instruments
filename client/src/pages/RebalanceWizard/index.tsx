import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RebalanceResults from "../../components/RebalanceResults";
import { selectHasBenchmark } from "../../redux/Benchmarks/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";

const RebalanceWizard = () => {
  const hasBenchmark = useSelector(selectHasBenchmark);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const history = useHistory();

  useEffect(() => {
    if (!hasBenchmark || !hasSnapshots) {
      history.push("/gettingStarted");
    }
  }, [hasBenchmark, hasSnapshots]);

  return <>{hasBenchmark && hasSnapshots && <RebalanceResults />}</>;
};

export default RebalanceWizard;
