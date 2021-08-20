import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardInstitutions from "../../components/CardInstitutions";
import CardPieChart from "../../components/CardPieChart";
import CardTaxShelter from "../../components/CardTaxShelter";
import CardTotals from "../../components/CardTotals";
import Linechart from "../../components/Linechart";
import { initGetBenchmarkAction } from "../../redux/Benchmarks/benchmarkSlice";
import {
  selectAssetRatios,
  selectAssetTitles,
  selectBenchmarkBreakdownPercentage,
  selectBenchmarkTitle,
  selectHasBenchmark,
} from "../../redux/Benchmarks/Selectors";
import {
  selectMacroBreakdownPercentage,
  selectVpAssets,
} from "../../redux/Holdings/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";
import { initDashboardSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const benchmarkTitle = useSelector(selectBenchmarkTitle);
  const assetTitles = useSelector(selectAssetTitles);
  const assetRatios = useSelector(selectAssetRatios);
  const benchmarkBreakdown = useSelector(selectBenchmarkBreakdownPercentage);
  const [vpAssetTitles, vpAssetRatios] = useSelector(selectVpAssets);
  const macroBreakdown = useSelector(selectMacroBreakdownPercentage);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const hasBenchmark = useSelector(selectHasBenchmark);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(initDashboardSnapshotsAction());
    dispatch(initGetBenchmarkAction());
  }, []);

  useEffect(() => {
    if (!hasSnapshots || !hasBenchmark) {
      history.push("/gettingStarted");
    }
  }, [hasSnapshots, hasBenchmark]);

  return (
    <>
      {hasSnapshots && benchmarkTitle && (
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
              cardTitle={`Current Portfolio - Macro Breakdown: `}
              titles={["Main", "Variable"]}
              ratios={macroBreakdown}
            />
            <CardPieChart
              cardTitle={`Variable Portfolio - Asset Breakdown: `}
              titles={vpAssetTitles}
              ratios={vpAssetRatios}
            />
          </div>
          <div className="row">
            <CardPieChart
              cardTitle={`Current Portfolio (Main) - Benchmark Breakdown: `}
              titles={(() => {
                const newAssetTitles = [...assetTitles, "other (non-VP)"];
                return newAssetTitles;
              })()}
              ratios={benchmarkBreakdown}
            />
            <CardPieChart
              cardTitle={`Current Benchmark: ${benchmarkTitle}`}
              titles={assetTitles}
              ratios={assetRatios}
            />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Dashboard;
