import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

interface DashBoardLayoutProps {
  majorTitle: string;
  minorTitle: string;
  children?: React.ReactNode;
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
              <Title
                majorTitle={props.majorTitle}
                minorTitle={props.minorTitle}
              />

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
