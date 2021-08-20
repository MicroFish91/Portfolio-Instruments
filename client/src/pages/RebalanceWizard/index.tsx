import { useSelector } from "react-redux";
import RebalanceResults from "../../components/RebalanceResults";
import { selectHasBenchmark } from "../../redux/Benchmarks/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";

const RebalanceWizard = () => {
  const hasBenchmarks = useSelector(selectHasBenchmark);
  const hasSnapshots = useSelector(selectHasSnapshots);

  return <>{hasBenchmarks && hasSnapshots && <RebalanceResults />}</>;
};

export default RebalanceWizard;
