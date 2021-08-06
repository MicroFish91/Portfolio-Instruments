import React from "react";

interface CardTaxShelterProps {}

const CardTaxShelter: React.FC<CardTaxShelterProps> = () => {
  return (
    <div className="col-lg-6 col-md-12">
      <div className="card">
        <div className="card-status bg-success br-tr-3 br-tl-3"></div>
        <div className="card-header">
          <h3 className="card-title">Tax Shelter</h3>
        </div>
        <div className="card-body">
          <div className="current-progress">
            <div className="progress-content">
              <div className="row">
                <div className="col-lg-4 mt-2">
                  <div className="progress-text">title</div>
                </div>
                <div className="col-lg-8">
                  <div className="current-progressbar">
                    <div className="progress progress-md">
                      <div
                        className="progress-bar bg-gradient-teal"
                        style={{ width: "51%" }}
                      >
                        51%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTaxShelter;
