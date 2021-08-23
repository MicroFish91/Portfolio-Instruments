import capitalize from "capitalize";
import React from "react";

interface InstitutionProps {
  title: string;
  percentage: string;
}

const Institution: React.FC<InstitutionProps> = ({ title, percentage }) => {
  console.log("percentage: ", percentage);
  return (
    <div className="progress-content">
      <div className="row">
        <div className="col-lg-4 mt-2">
          <div className="progress-text">{capitalize.words(title)}</div>
        </div>
        <div className="col-lg-8">
          <div className="current-progressbar">
            <div className="progress progress-md">
              {parseInt(percentage) <= 0 ? (
                <div
                  className="progress-bar bg-gradient-red"
                  style={{ width: percentage.slice(1) }}
                >
                  {percentage}
                </div>
              ) : (
                <div
                  className="progress-bar bg-gradient-teal"
                  style={{ width: percentage }}
                >
                  {percentage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institution;
