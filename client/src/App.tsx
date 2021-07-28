import { ErrorBoundary } from "react-error-boundary";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import DashboardFallback from "./components/ErrorFallbacks/DashboardFallback";
import WithAuth from "./hoc/withAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";

const errorHandler = (error: Error, errorInfo: { componentStack: string }) => {
  console.log("Logging", error, errorInfo);
};

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <ErrorBoundary
                FallbackComponent={DashboardFallback}
                onError={errorHandler}
              >
                <Dashboard />
              </ErrorBoundary>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
