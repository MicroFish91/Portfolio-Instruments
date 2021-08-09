import { Route, Switch } from "react-router-dom";
import "./App.css";
import BenchmarkFallback from "./components/ErrorFallbacks/BenchmarkFallback";
import DashboardFallback from "./components/ErrorFallbacks/DashboardFallback";
import ContentWrapper from "./hoc/contentWrapper";
import Benchmarks from "./pages/Benchmarks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      </Switch>
    </div>
  );
};

export default App;
