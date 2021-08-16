import { Route, Switch } from "react-router-dom";
import "./App.css";
import BenchmarkFallback from "./components/ErrorFallbacks/BenchmarkFallback";
import DashboardFallback from "./components/ErrorFallbacks/DashboardFallback";
import SnapshotsFallback from "./components/ErrorFallbacks/SnapshotsFallback";
import ContentWrapper from "./hoc/contentWrapper";
import AddSnapshots from "./pages/AddSnapshots";
import Benchmarks from "./pages/Benchmarks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewAssets from "./pages/ViewAssets";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          path="/dashboard"
          render={() => (
            <ContentWrapper
              fallback={DashboardFallback}
              majorTitle={"Dashboard View"}
              minorTitle={"Home"}
            >
              <Dashboard />
            </ContentWrapper>
          )}
        />
        <Route
          path="/benchmarks/:benchmarkIndex"
          render={() => (
            <ContentWrapper
              fallback={BenchmarkFallback}
              majorTitle={"Benchmark Portfolios"}
              minorTitle={"General"}
            >
              <Benchmarks />
            </ContentWrapper>
          )}
        />
        <Route
          path="/portfolio-wizard/add-snapshots"
          render={() => (
            <ContentWrapper
              fallback={SnapshotsFallback}
              majorTitle={"Add Snapshots"}
              minorTitle={"Portfolio Wizard"}
            >
              <AddSnapshots />
            </ContentWrapper>
          )}
        />
        <Route
          path="/portfolio-wizard/view-assets"
          render={() => (
            <ContentWrapper
              fallback={SnapshotsFallback}
              majorTitle={"View Assets"}
              minorTitle={"Portfolio Wizard"}
            >
              <ViewAssets />
            </ContentWrapper>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
