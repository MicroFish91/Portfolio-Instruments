import React from "react";
import { useSelector } from "react-redux";
import { selectPercentageByInstitutions } from "../../redux/Holdings/Selectors";
import Institution from "./Institution";

interface InstitutionalProps {}

const InstitutionalCharts: React.FC<InstitutionalProps> = () => {
  const institutionAmounts = useSelector(selectPercentageByInstitutions);

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card">
        <div className="card-status bg-success br-tr-3 br-tl-3"></div>
        <div className="card-header">
          <h3 className="card-title">Financial Institutions</h3>
        </div>
        <div className="card-body">
          <div className="current-progress">
            {Object.keys(institutionAmounts).map((accountName) => {
              return (
                <Institution
                  key={accountName}
                  title={accountName}
                  percentage={institutionAmounts[accountName].toFixed(2) + "%"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalCharts;
