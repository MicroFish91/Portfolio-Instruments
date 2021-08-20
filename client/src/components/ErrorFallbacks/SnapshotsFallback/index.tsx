import { useSelector } from "react-redux";
import { selectSnapshotErrors } from "../../../redux/Snapshots/Selectors";

const SnapshotsFallback = () => {
  const error = useSelector(selectSnapshotErrors);
  return <h1>Error: {error.message}</h1>;
};

export default SnapshotsFallback;
