import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
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
  selectIsDashboardLoading,
} from "../../redux/Benchmarks/Selectors";
import {
  selectMacroBreakdownPercentage,
  selectVpAssets,
} from "../../redux/Holdings/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";
import { initDashboardSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";
import { capitalizeWords } from "../../utils";

const Dashboard = () => {
  const benchmarkTitle = useSelector(selectBenchmarkTitle);
  const assetTitles = useSelector(selectAssetTitles);
  const assetRatios = useSelector(selectAssetRatios);
  const benchmarkBreakdown = useSelector(selectBenchmarkBreakdownPercentage);
  const [vpAssetTitles, vpAssetRatios] = useSelector(selectVpAssets);
  const macroBreakdown = useSelector(selectMacroBreakdownPercentage);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const hasBenchmark = useSelector(selectHasBenchmark);
  const isDashboardLoading = useSelector(selectIsDashboardLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initDashboardSnapshotsAction());
    dispatch(initGetBenchmarkAction());
  }, []);

  return (
    <>
      {!isDashboardLoading && (!hasSnapshots || !hasBenchmark) && (
        <div>
          <b>
            <u>Notice:</u>
          </b>{" "}
          It looks like your account has not been properly initialized. Please{" "}
          <Link to="/gettingStarted">click here</Link> for next steps.
        </div>
      )}

      {hasSnapshots && hasBenchmark && (
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
              cardTitle={`Current Benchmark: ${capitalizeWords(
                benchmarkTitle
              )}`}
              titles={assetTitles}
              ratios={assetRatios}
            />
          </div>{" "}
        </>
      )}

      {isDashboardLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ClipLoader size={180} color="purple" />
        </div>
      )}
    </>
  );
};

export default Dashboard;
