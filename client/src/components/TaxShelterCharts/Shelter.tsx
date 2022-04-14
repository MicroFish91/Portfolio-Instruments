import React from "react";

interface ShelterProps {
  title: string;
  percentage: string;
}

const Shelter: React.FC<ShelterProps> = ({ title, percentage }) => {
  return (
    <div className="progress-content">
      <div className="row">
        <div className="col-lg-4 mt-2">
          <div className="progress-text">{title}</div>
        </div>
        <div className="col-lg-8">
          <div className="current-progressbar">
            <div className="progress progress-md">
              <div
                className="progress-bar bg-gradient-teal"
                style={{ width: percentage }}
              >
                {percentage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shelter;
