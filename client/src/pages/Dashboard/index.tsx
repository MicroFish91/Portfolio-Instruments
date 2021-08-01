import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardTotals from "../../components/CardTotals";
import {
  selectLineChartValuesRangeOne,
  selectLineChartValuesRangeTwo,
} from "../../redux/Snapshots/snapshotSelector";
import { initSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const value1 = useSelector(selectLineChartValuesRangeOne);
  const value2 = useSelector(selectLineChartValuesRangeTwo);

  console.log(value1);
  console.log(value2);

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
