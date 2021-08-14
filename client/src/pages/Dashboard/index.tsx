import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardInstitutions from "../../components/CardInstitutions";
import CardTaxShelter from "../../components/CardTaxShelter";
import CardTotals from "../../components/CardTotals";
import Linechart from "../../components/Linechart";
import { initGetBenchmarkAction } from "../../redux/Benchmarks/benchmarkSlice";
import { initDashboardSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initDashboardSnapshotsAction());
    dispatch(initGetBenchmarkAction());
  }, []);

  return (
    <>
      <div className="row row-cards">
        <CardTotals accountType={"Traditional"} color={"purple"} />
        <CardTotals accountType={"Roth"} color={"green"} />
        <CardTotals accountType={"Taxable"} color={"yellow"} />
        <CardTotals accountType={"Net Worth"} color={"blue"} />
      </div>
      <Linechart />
      <div className="row">
        <CardInstitutions />
        <CardTaxShelter />
      </div>
    </>
  );
};

export default Dashboard;
