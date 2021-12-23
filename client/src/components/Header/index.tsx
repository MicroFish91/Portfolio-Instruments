import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  selectAssetRebalanceFormat,
  selectVpRebalanceFormat,
} from "../../redux/Benchmarks/Selectors";
import { selectLiquidCash } from "../../redux/Holdings/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";
import { selectUserFullName } from "../../redux/User/Selectors";
import { clearUserAction } from "../../redux/User/userSlice";
import { usdFormatter } from "../../utils";

const Header: React.FC = () => {
  const dollarFormatter = usdFormatter();
  const userFullName = useSelector(selectUserFullName);
  const [, rebalanceRequired] = useSelector(selectAssetRebalanceFormat);
  const [, vpRebalanceRequired] = useSelector(selectVpRebalanceFormat);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const liquidCash = useSelector(selectLiquidCash);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(clearUserAction());
    history.push("/");
  };

  const renderNotifications = () => {
    const notificationStatus = [];
    const notificationMessages = [];

    if ((rebalanceRequired || vpRebalanceRequired) && hasSnapshots) {
      notificationStatus.push(
        <div className="notifyimg">
          <i className="fas fa-thumbs-down"></i>
        </div>
      );
      notificationMessages.push(
        <div>
          <strong>Portfolio Status: Needs Rebalancing</strong>
          <div className="small text-muted">
            Please consult the "Rebalance Wizard" for more info.
          </div>{" "}
          <br></br>
          {liquidCash === undefined && (
            <strong>
              Liquid Cash:{" "}
              {
                <Link to="/portfolio-wizard/view-assets">
                  <u>Compute</u>
                </Link>
              }
            </strong>
          )}
          {liquidCash !== undefined && (
            <strong>Liquid Cash: {dollarFormatter.format(liquidCash)}</strong>
          )}
        </div>
      );
    }

    if (!rebalanceRequired && !vpRebalanceRequired && hasSnapshots) {
      notificationStatus.push(
        <div className="notifyimg">
          <i className="fas fa-thumbs-up"></i>
        </div>
      );
      notificationMessages.push(
        <div>
          <strong>Portfolio Status: Excellent</strong>
          <div className="small text-muted">No change required.</div> <br></br>
          {liquidCash === undefined && (
            <strong>
              Liquid Cash:{" "}
              {
                <Link to="/portfolio-wizard/view-assets">
                  <u>Compute</u>
                </Link>
              }
            </strong>
          )}
          {liquidCash !== undefined && (
            <strong>Liquid Cash: {dollarFormatter.format(liquidCash)}</strong>
          )}
        </div>
      );
    }

    if (!hasSnapshots) {
      notificationStatus.push(
        <div className="notifyimg">
          <i className="fas fa-thumbs-down"></i>
        </div>
      );
      notificationMessages.push(
        <div>
          <strong>Portfolio Status: Unknown</strong>
          <div className="small text-muted">
            Please begin by clicking on "Getting Started".
          </div>{" "}
          <br></br>
          {liquidCash === undefined && (
            <strong>
              Liquid Cash:{" "}
              {
                <Link to="/portfolio-wizard/view-assets">
                  <u>Compute</u>
                </Link>
              }
            </strong>
          )}
          {liquidCash !== undefined && (
            <strong>Liquid Cash: {dollarFormatter.format(liquidCash)}</strong>
          )}
        </div>
      );
    }

    return [...notificationStatus, notificationMessages];
  };

  return (
    <div>
      <header className="app-header header">
        {/* <!-- Header Background Animation--> */}
        <div id="canvas" className="gradient"></div>

        {/* <!-- Navbar Top --> */}
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand">
              <img
                alt="Portfolio Instruments Logo"
                className="header-brand-img"
                src="/assets/images/Favicon.png"
                style={{
                  height: "auto",
                  width: "2.2em",
                  margin: 0,
                  padding: 0,
                }}
              />
            </a>
            <a
              aria-label="Hide Sidebar"
              className="app-sidebar__toggle"
              data-toggle="sidebar"
              href="#"
            ></a>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown d-none d-md-flex">
                <a className="nav-link icon" data-toggle="dropdown">
                  <i className="fas fa-bell"></i>
                  <span className="nav-unread bg-danger"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  {/* <!-- First Notification --> */}
                  <a className="dropdown-item d-flex pb-3" href="#">
                    {renderNotifications()}
                  </a>
                </div>
              </div>

              <div className="dropdown">
                <a
                  className="nav-link pr-0 leading-none d-flex"
                  data-toggle="dropdown"
                  href="#"
                >
                  <img
                    className="avatar avatar-md brround"
                    src="/assets/images/profile.jpg"
                    alt="profile_image"
                  />

                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-white">{userFullName}</span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/gettingStarted" className="dropdown-item">
                    Getting Started
                  </Link>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
