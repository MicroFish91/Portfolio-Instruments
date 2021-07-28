import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

interface DashBoardLayoutProps {
  children?: any;
}

const DashboardLayout: React.FC<DashBoardLayoutProps> = (props) => {
  return (
    <div className="app sidebar-mini rtl">
      <div className="page">
        <div className="page-main">
          <Header />
          <Sidebar />

          {/* Main Content */}
          <div className="app-content my-3 my-md-5">
            <div className="side-app">
              {props.children}

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
