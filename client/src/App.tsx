import { ErrorBoundary } from "react-error-boundary";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Fallback from "./components/Fallback";
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
            <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
              <Dashboard />
            </ErrorBoundary>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
