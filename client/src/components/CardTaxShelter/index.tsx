import React from "react";
import { useSelector } from "react-redux";
import { selectTaxShelterPercentages } from "../../redux/Holdings/Selectors";
import Shelter from "./Shelter";

interface CardTaxShelterProps {}

const CardTaxShelter: React.FC<CardTaxShelterProps> = () => {
  const taxShelterPercentages = useSelector(selectTaxShelterPercentages);

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card">
        <div className="card-status bg-success br-tr-3 br-tl-3"></div>
        <div className="card-header">
          <h3 className="card-title">Tax Shelter</h3>
        </div>
        <div className="card-body">
          <div className="current-progress">
            <Shelter
              key={"Traditional"}
              title={"Traditional"}
              percentage={taxShelterPercentages["traditional"].toFixed(2) + "%"}
            />
            <Shelter
              key={"Roth"}
              title={"Roth"}
              percentage={taxShelterPercentages["roth"].toFixed(2) + "%"}
            />
            <Shelter
              key={"Taxable"}
              title={"Taxable"}
              percentage={taxShelterPercentages["taxable"].toFixed(2) + "%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTaxShelter;
