import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { selectTotalNetWorth } from "../../redux/Holdings/Selectors";
import { cagFormSchema } from "../../validation/cag";
import { CagForm, CagFormConverted } from "../../validation/types";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

interface CAGFormProps {
  setGrowthSettings: (settings: CagFormConverted) => void;
}

const CAGForm: React.FC<CAGFormProps> = ({ setGrowthSettings }) => {
  const userNetWorth = useSelector(selectTotalNetWorth).toFixed(2);

  const calculateCAG = (holding: CagForm, _setFieldValue: any) => {
    const convertedHolding = {
      annualExpenses: parseFloat(holding.annualExpenses),
      annualInflation: parseFloat(holding.annualInflation) / 100,
      annualReturn: parseFloat(holding.annualReturn) / 100,
      numberOfYears: parseFloat(holding.numberOfYears),
      principal: parseFloat(holding.principal),
      periodsPerYear: parseFloat(holding.periodsPerYear),
      recurringInvestment: parseFloat(holding.recurringInvestment),
      safeWithdrawalRate: parseFloat(holding.safeWithdrawalRate) / 100,
      stdDeviation: parseFloat(holding.stdDeviation) / 100,
    };

    setGrowthSettings(convertedHolding);
  };

  return (
    <Formik
      initialValues={
        {
          annualExpenses: "50000",
          annualInflation: "3",
          annualReturn: "8",
          numberOfYears: "10",
          principal: `${userNetWorth}`,
          periodsPerYear: "12",
          recurringInvestment: "0",
          safeWithdrawalRate: "4",
          stdDeviation: "0",
        } as CagForm
      }
      validationSchema={cagFormSchema}
      onSubmit={(values, actions) => calculateCAG(values, actions)}
    >
      {({ values, setFieldValue }) => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Annual Growth Settings</h3>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6 col-lg-6">
                <InputField
                  label="Starting Amount ($)"
                  name="principal"
                  placeholder="Ex. 100000.55"
                  type="text"
                  value={values.principal}
                  onChange={(e) => setFieldValue("principal", e.target.value)}
                />
                <InputField
                  label="Annual Return (%)"
                  name="annualReturn"
                  placeholder="Ex. 320.25"
                  type="text"
                  value={values.annualReturn}
                  onChange={(e) =>
                    setFieldValue("annualReturn", e.target.value)
                  }
                />
                <InputField
                  label="Number of Years"
                  name="numberOfYears"
                  placeholder="Ex. 10"
                  type="text"
                  value={values.numberOfYears}
                  onChange={(e) =>
                    setFieldValue("numberOfYears", e.target.value)
                  }
                />
                <InputField
                  label="Recurring Investment Amount ($)"
                  name="recurringInvestment"
                  placeholder="Ex. 1500"
                  type="text"
                  value={values.recurringInvestment}
                  onChange={(e) =>
                    setFieldValue("recurringInvestment", e.target.value)
                  }
                />
                <InputField
                  label="Safe Withdrawal Rate (%)"
                  name="safeWithdrawalRate"
                  placeholder="Ex. 4"
                  type="text"
                  value={values.safeWithdrawalRate}
                  onChange={(e) =>
                    setFieldValue("safeWithdrawalRate", e.target.value)
                  }
                />
              </div>

              {/* Right Column */}
              <div className="col-md-6 col-lg-6">
                <InputField
                  label="Annual Inflation (%)"
                  name="annualInflation"
                  placeholder="Ex. 3.5"
                  type="text"
                  value={values.annualInflation}
                  onChange={(e) =>
                    setFieldValue("annualInflation", e.target.value)
                  }
                />
                <InputField
                  label="Std Deviation (%)"
                  name="stdDeviation"
                  placeholder="Ex. 7.5"
                  type="text"
                  value={values.stdDeviation}
                  onChange={(e) =>
                    setFieldValue("stdDeviation", e.target.value)
                  }
                />
                <InputField
                  label="Periods per Year"
                  name="periodsPerYear"
                  placeholder="Ex. 12 (represents monthly investment)"
                  type="text"
                  value={values.periodsPerYear}
                  onChange={(e) =>
                    setFieldValue("periodsPerYear", e.target.value)
                  }
                />
                <InputField
                  label="Annual Expenses ($)"
                  name="annualExpenses"
                  placeholder="Ex. 50000"
                  type="text"
                  value={values.annualExpenses}
                  onChange={(e) =>
                    setFieldValue("annualExpenses", e.target.value)
                  }
                />
              </div>
              <div className="ml-3">
                <Button title="Compute Growth" />
                <Button title="Reset Settings" type="reset" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CAGForm;
