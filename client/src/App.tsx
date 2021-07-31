import { Route, Switch } from "react-router-dom";
import "./App.css";
import DashboardFallback from "./components/ErrorFallbacks/DashboardFallback";
import ContentWrapper from "./hoc/contentWrapper";
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
      </Switch>
    </div>
  );
};

export default App;
