import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSnapshotsAction());
  }, []);

  return <>Dashboard Page</>;
};

export default Dashboard;
