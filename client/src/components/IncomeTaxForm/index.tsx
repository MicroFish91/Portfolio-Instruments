import { Form, Formik } from "formik";
import React from "react";
import { incomeTaxFormSchema } from "../../validation/savingsRate";
import { IncomeTaxForm, IncomeTaxFormConverted } from "../../validation/types";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

interface srIncomeTaxFormProps {
  setTaxBreakdown: (taxBreakdown: IncomeTaxFormConverted) => void;
}

const srIncomeTaxForm: React.FC<srIncomeTaxFormProps> = ({
  setTaxBreakdown,
}) => {
  const submitTaxForm = (holding: IncomeTaxForm, _setFieldValue: any) => {
    const taxBreakdown = {
      grossPay: parseFloat(holding.grossPay),
      federalTax: parseFloat(holding.federalTax),
      fica: parseFloat(holding.fica),
      medicare: parseFloat(holding.medicare),
      state: parseFloat(holding.state),
      other: parseFloat(holding.other),
    };

    setTaxBreakdown(taxBreakdown);
  };

  return (
    <Formik
      initialValues={
        {
          grossPay: "90000.00",
          federalTax: "13500.00",
          fica: "5580.00",
          medicare: "1305.00",
          state: "0.00",
          other: "225.75",
        } as IncomeTaxForm
      }
      validationSchema={incomeTaxFormSchema}
      onSubmit={(values, actions) => submitTaxForm(values, actions)}
    >
      {({ values, setFieldValue }) => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Annual Gross Pay & Tax Breakdown</h3>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6 col-lg-6">
                <InputField
                  label="Annual Gross Pay ($)"
                  name="grossPay"
                  placeholder="Ex. 90000.00"
                  type="text"
                  value={values.grossPay}
                  onChange={(e) => setFieldValue("grossPay", e.target.value)}
                />
                <InputField
                  label="FICA Taxes ($)"
                  name="fica"
                  placeholder="Ex. 5580.00"
                  type="text"
                  value={values.fica}
                  onChange={(e) => setFieldValue("fica", e.target.value)}
                />
                <InputField
                  label="State Taxes ($)"
                  name="state"
                  placeholder="Ex. 5250.25"
                  type="text"
                  value={values.state}
                  onChange={(e) => setFieldValue("state", e.target.value)}
                />
              </div>

              {/* Right Column */}
              <div className="col-md-6 col-lg-6">
                <InputField
                  label="Federal Taxes ($)"
                  name="federalTax"
                  placeholder="Ex. 13500.00"
                  type="text"
                  value={values.federalTax}
                  onChange={(e) => setFieldValue("federalTax", e.target.value)}
                />
                <InputField
                  label="Medicare Taxes ($)"
                  name="medicare"
                  placeholder="Ex. 7.5"
                  type="text"
                  value={values.medicare}
                  onChange={(e) => setFieldValue("medicare", e.target.value)}
                />
                <InputField
                  label="Other Taxes ($)"
                  name="other"
                  placeholder="Ex. 12 (represents monthly investment)"
                  type="text"
                  value={values.other}
                  onChange={(e) => setFieldValue("other", e.target.value)}
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

export default srIncomeTaxForm;
