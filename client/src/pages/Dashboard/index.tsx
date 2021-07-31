import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardTotals from "../../components/CardTotals";
import { initSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSnapshotsAction());
  }, []);

  return (
    <>
      <div className="row row-cards">
        <CardTotals accountType={"Traditional"} color={"purple"} />
        <CardTotals accountType={"Roth"} color={"green"} />
        <CardTotals accountType={"Taxable"} color={"yellow"} />
        <CardTotals accountType={"Net Worth"} color={"blue"} />
      </div>
    </>
  );
};

export default Dashboard;
