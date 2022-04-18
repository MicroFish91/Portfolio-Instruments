import React, { useState } from "react";
import { IntervalSize } from "../types";

interface intervalSizeFormProps {
  setIntervalSize: (size: IntervalSize) => void;
}

const IntervalSizeForm: React.FC<intervalSizeFormProps> = ({
  setIntervalSize,
}) => {
  const [toggleAnnually, setToggleAnnually] = useState(false);
  const [toggleMonthly, setToggleMonthly] = useState(false);
  const [toggleBiweekly, setToggleBiweekly] = useState(false);

  const submitToggle = (
    field: keyof typeof IntervalSize,
    checked: boolean
  ): void => {
    if (!checked) {
      setIntervalSize(1);
      return;
    }

    switch (field) {
      case "Biweekly":
        setIntervalSize(26);
        break;
      case "Monthly":
        setIntervalSize(12);
        break;
      case "Annually":
        setIntervalSize(1);
        break;
      default:
        setIntervalSize(1);
    }
  };

  return (
    <div>
      <h3 className="card-title">Toggle Breakdown View by Time Period:</h3>
      <div className="row">
        <div className="col-md-2 col-lg-2">
          <label className="form-label">Biweekly</label>
          <input
            type="checkbox"
            checked={toggleBiweekly}
            onClick={() => {
              if (!toggleBiweekly) {
                setToggleBiweekly(true);
                setToggleMonthly(false);
                setToggleAnnually(false);
                submitToggle("Biweekly", true);
              } else {
                setToggleBiweekly(false);
                submitToggle("Biweekly", false);
              }
            }}
          />
        </div>
        <div className="col-md-2 col-lg-2">
          <label className="form-label">Monthly</label>
          <input
            type="checkbox"
            checked={toggleMonthly}
            onClick={() => {
              if (!toggleMonthly) {
                setToggleMonthly(true);
                setToggleBiweekly(false);
                setToggleAnnually(false);
                submitToggle("Monthly", true);
              } else {
                setToggleMonthly(false);
                submitToggle("Monthly", false);
              }
            }}
          />
        </div>
        <div className="col-md-4 col-lg-4">
          <label className="form-label">Annually</label>
          <input
            type="checkbox"
            checked={toggleAnnually}
            onClick={() => {
              if (!toggleAnnually) {
                setToggleAnnually(true);
                setToggleBiweekly(false);
                setToggleMonthly(false);
                submitToggle("Annually", true);
              } else {
                setToggleAnnually(false);
                submitToggle("Annually", false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntervalSizeForm;
