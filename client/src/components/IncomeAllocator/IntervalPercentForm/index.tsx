import React, { useState } from "react";
import { IntervalPercent } from "../types";

interface ipFormProps {
  setPercentView: (type: IntervalPercent | null) => void;
}

const IntervalPercentForm: React.FC<ipFormProps> = ({ setPercentView }) => {
  const [afterTax, setAfterTax] = useState(false);
  const [beforeTax, setBeforeTax] = useState(false);

  const submitIP = (type: IntervalPercent, val: boolean) => {
    if (type === IntervalPercent.After_Tax && val) {
      setPercentView(IntervalPercent.After_Tax);
    } else if (type === IntervalPercent.Before_Tax && val) {
      setPercentView(IntervalPercent.Before_Tax);
    } else {
      setPercentView(null);
    }
  };

  return (
    <div>
      <h3 className="card-title">Toggle Breakdown View by Percentage:</h3>
      <div className="row">
        <div className="col-md-2 col-lg-2">
          <label className="form-label">Before Tax</label>
          <input
            type="checkbox"
            checked={beforeTax}
            onClick={() => {
              if (!beforeTax) {
                setBeforeTax(true);
                setAfterTax(false);
                submitIP(IntervalPercent.Before_Tax, true);
              } else {
                setBeforeTax(false);
                submitIP(IntervalPercent.Before_Tax, false);
              }
            }}
          />
        </div>
        <div className="col-md-2 col-lg-2">
          <label className="form-label">After Tax</label>
          <input
            type="checkbox"
            checked={afterTax}
            onClick={() => {
              if (!afterTax) {
                setAfterTax(true);
                setBeforeTax(false);
                submitIP(IntervalPercent.After_Tax, true);
              } else {
                setAfterTax(false);
                submitIP(IntervalPercent.After_Tax, false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntervalPercentForm;
