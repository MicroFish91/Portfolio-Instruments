import { Route, Switch } from "react-router-dom";
import "./App.css";
import BenchmarkFallback from "./components/ErrorFallbacks/BenchmarkFallback";
import DashboardFallback from "./components/ErrorFallbacks/DashboardFallback";
import ProfileFallback from "./components/ErrorFallbacks/ProfileFallback";
import RebalanceWizardFallback from "./components/ErrorFallbacks/RebalanceWizardFallback";
import SnapshotsFallback from "./components/ErrorFallbacks/SnapshotsFallback";
import ContentWrapper from "./hoc/contentWrapper";
import AddSnapshots from "./pages/AddSnapshots";
import Benchmarks from "./pages/Benchmarks";
import CustomBenchmarks from "./pages/CustomBenchmarks";
import Dashboard from "./pages/Dashboard";
import EmailConfirmation from "./pages/EmailConfirmation";
import ForgotPassword from "./pages/ForgotPassword";
import GettingStarted from "./pages/GettingStarted";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RebalanceWizard from "./pages/RebalanceWizard";
import Register from "./pages/Register";
import ResetConfirmation from "./pages/ResetConfirmation";
import ViewAssets from "./pages/ViewAssets";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/confirmation" component={EmailConfirmation} />
        <Route exact path="/resetPassword" component={ForgotPassword} />
        <Route exact path="/resetConfirmation" component={ResetConfirmation} />
        <Route
          exact
          path="/profile"
          render={() => (
            <ContentWrapper
              fallback={ProfileFallback}
              majorTitle={"User Settings"}
              minorTitle={"Profile"}
            >
              <Profile />
            </ContentWrapper>
          )}
        />
        <Route
          exact
          path="/gettingStarted"
          render={() => (
            <ContentWrapper
              fallback={ProfileFallback}
              majorTitle={"Getting Started"}
              minorTitle={"Profile"}
            >
              <GettingStarted />
            </ContentWrapper>
          )}
        />
        <Route
          exact
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
          exact
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
          exact
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
        <Route
          exact
          path="/portfolio-wizard/rebalance-wizard"
          render={() => (
            <ContentWrapper
              fallback={RebalanceWizardFallback}
              majorTitle={"Rebalance Wizard"}
              minorTitle={"Portfolio Wizard"}
            >
              <RebalanceWizard />
            </ContentWrapper>
          )}
        />
        <Route
          exact
          path="/benchmarks/custom"
          render={() => (
            <ContentWrapper
              fallback={BenchmarkFallback}
              majorTitle={"Benchmark Portfolios"}
              minorTitle={"Custom Benchmarks"}
            >
              <CustomBenchmarks />
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
      </Switch>
    </div>
  );
};

export default App;
