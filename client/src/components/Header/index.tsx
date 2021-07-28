import React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <header className="app-header header">
        {/* <!-- Header Background Animation--> */}
        <div id="canvas" className="gradient"></div>

        {/* <!-- Navbar Top --> */}
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand" href="index.html">
              <img
                alt="ren logo"
                className="header-brand-img"
                src="./logo2.png"
              ></img>
            </a>
            <a
              aria-label="Hide Sidebar"
              className="app-sidebar__toggle"
              data-toggle="sidebar"
              href=""
            ></a>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown d-none d-md-flex">
                <a className="nav-link icon" data-toggle="dropdown">
                  <i className="fas fa-bell"></i>
                  <span className="nav-unread bg-danger"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  {/* <!-- First Notification --> */}
                  <a className="dropdown-item d-flex pb-3" href="">
                    <div className="notifyimg">
                      <i className="fas fa-thumbs-up"></i>
                    </div>
                    <div>
                      <strong>Portfolio Status: Excellent</strong>
                      <div className="small text-muted">3 hours ago</div>
                    </div>
                  </a>

                  {/* <!-- View All Notifications --> */}
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item text-center text-muted-dark"
                    href=""
                  >
                    View all Notifications
                  </a>
                </div>
              </div>

              <div className="dropdown">
                <a
                  className="nav-link pr-0 leading-none d-flex"
                  data-toggle="dropdown"
                  href=""
                >
                  <span className="avatar avatar-md brround"></span>
                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-white">Matthew Fisher</span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <a className="dropdown-item" href="">
                    <i className="dropdown-icon mdi mdi-account-outline"></i>{" "}
                    Profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="">
                    <i className="dropdown-icon mdi mdi-compass-outline"></i>
                    Getting Started
                  </a>
                  <a className="dropdown-item" href="login.html">
                    <i className="dropdown-icon mdi mdi-logout-variant"></i>{" "}
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
