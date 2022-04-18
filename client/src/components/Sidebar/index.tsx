import $ from "jquery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  selectUserEmail,
  selectUserFullName,
} from "../../redux/User/Selectors";
import { clearUserAction } from "../../redux/User/userSlice";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const userEmail = useSelector(selectUserEmail);
  const userFullName = useSelector(selectUserFullName);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(clearUserAction());
    history.push("/");
  };

  useEffect(() => {
    const slideMenu = $(".side-menu");

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });

    //@ts-ignore
    if ($(window).width() > 739) {
      $(".app-sidebar").hover(function (event) {
        event.preventDefault();
        $(".app").removeClass("sidenav-toggled");
      });
    }

    // Activate sidebar slide toggle
    $("[data-toggle='slide']").click(function (event) {
      event.preventDefault();
      if (!$(this).parent().hasClass("is-expanded")) {
        slideMenu
          .find("[data-toggle='slide']")
          .parent()
          .removeClass("is-expanded");
      }
      $(this).parent().toggleClass("is-expanded");
    });

    // Set initial active toggle
    $("[data-toggle='slide.'].is-expanded").parent().toggleClass("is-expanded");
  }, []);

  return (
    <div>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <div className="dropdown">
            <a
              className="nav-link p-0 leading-none d-flex"
              data-toggle="dropdown"
              href=""
            >
              <img
                className="avatar avatar-md brround"
                src="/assets/images/profile.jpg"
                alt="profile_image"
              />
              <span className="ml-2 ">
                <span className="text-white app-sidebar__user-name font-weight-semibold">
                  {userFullName}
                </span>
                <br></br>
                <span className="text-muted app-sidebar__user-name text-sm">
                  {userEmail}
                </span>
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
        <ul className="side-menu">
          <li className="slide">
            <a className="side-menu__item active" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-home"></i>
              <span className="side-menu__label">Dashboard</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link to="/dashboard" className="slide-item">
                  Home
                </Link>
              </li>
            </ul>
          </li>

          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-coins"></i>
              <span className="side-menu__label">Portfolio Wizard</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link
                  to="/portfolio-wizard/add-snapshots"
                  className="slide-item"
                >
                  Add Snapshots
                </Link>
              </li>
              <li>
                <Link to="/portfolio-wizard/view-assets" className="slide-item">
                  View Assets
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio-wizard/rebalance-wizard"
                  className="slide-item"
                >
                  Rebalance Wizard
                </Link>
              </li>
            </ul>
          </li>

          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-calculator"></i>
              <span className="side-menu__label">Portfolio Calculators</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link
                  to="/portfolio-calculators/income-breakdown"
                  className="slide-item"
                >
                  Income Breakdown
                </Link>
              </li>
            </ul>
            <ul className="slide-menu">
              <li>
                <Link
                  to="/portfolio-calculators/compound-annual-growth"
                  className="slide-item"
                >
                  Compound Annual Growth
                </Link>
              </li>
            </ul>
          </li>

          {/* Investment Guidance */}
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-chart-pie"></i>
              <span className="side-menu__label">Benchmark Portfolios</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link to="/benchmarks/general" className="slide-item">
                  General
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/0" className="slide-item">
                  Classic 60/40
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/1" className="slide-item">
                  Three Fund Portfolio
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/2" className="slide-item">
                  No-Brainer Portfolio
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/3" className="slide-item">
                  Rick Ferri Core Four
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/4" className="slide-item">
                  Ivy Portfolio
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/5" className="slide-item">
                  Permanent Portfolio
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/6" className="slide-item">
                  Golden Butterfly
                </Link>
              </li>
              <li>
                <Link to="/benchmarks/custom" className="slide-item">
                  Custom Benchmarks
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
