import React from "react";
import { useSelector } from "react-redux";
import {
  selectTotalRoth,
  selectTotalTaxable,
  selectTotalTraditional,
} from "../../redux/Holdings/holdingSelectors";
import { usdFormatter } from "../../utils/index";

interface CardTotalsProps {
  accountType: string;
  color: string;
}

interface SelectorFn {
  [accountType: string]: () => number;
}

const selectorFn: SelectorFn = {
  Traditional: () => useSelector(selectTotalTraditional),
  Roth: () => useSelector(selectTotalRoth),
  Taxable: () => useSelector(selectTotalTaxable),
  ["Net Worth"]: () => {
    return (
      useSelector(selectTotalTraditional) +
      useSelector(selectTotalRoth) +
      useSelector(selectTotalTaxable)
    );
  },
};

const CardTotals: React.FC<CardTotalsProps> = ({ accountType, color }) => {
  const dollarFormatter = usdFormatter();
  const total = selectorFn[accountType]();
  const formattedTotal = dollarFormatter.format(total);

  return (
    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="card overflow-hidden">
        <div className={`card-status bg-${color} br-tr-3 br-tl-3`}></div>
        <div className="card-body row">
          <div className="col">
            <div className="text-muted">{accountType}</div>
            <div className={`h3 m-0 text-${color} counter font-30`}>
              <b>{formattedTotal}</b>
            </div>
          </div>
          <div className="col-auto align-self-center ">
            <div className={`card-value float-right text-${color}`}>
              <div
                className={`icon icon-shape bg-gradient-${color} rounded-circle text-white`}
              >
                <i className="fas fa-dollar-sign text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTotals;
