import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardInstitutions from "../../components/CardInstitutions";
import CardPieChart from "../../components/CardPieChart";
import CardTaxShelter from "../../components/CardTaxShelter";
import CardTotals from "../../components/CardTotals";
import Linechart from "../../components/Linechart";
import {
  selectAssetRatios,
  selectAssetTitles,
  selectBenchmarkBreakdown,
  selectBenchmarkTitle,
} from "../../redux/Benchmarks/benchmarkSelector";
import { initGetBenchmarkAction } from "../../redux/Benchmarks/benchmarkSlice";
import { initDashboardSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const benchmarkTitle = useSelector(selectBenchmarkTitle);
  const assetTitles = useSelector(selectAssetTitles);
  const assetRatios = useSelector(selectAssetRatios);
  const benchmarkBreakdown = useSelector(selectBenchmarkBreakdown);
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
      <div className="row">
        <CardPieChart
          benchmarkTitle={benchmarkTitle}
          cardTitle={`Current Portfolio: `}
          titles={(() => {
            const newAssetTitles = [...assetTitles, "Other"];
            return newAssetTitles;
          })()}
          ratios={benchmarkBreakdown}
        />
        <CardPieChart
          benchmarkTitle={benchmarkTitle}
          cardTitle={`Current Benchmark: ${benchmarkTitle}`}
          titles={assetTitles}
          ratios={assetRatios}
        />
      </div>
    </>
  );
};

export default Dashboard;
