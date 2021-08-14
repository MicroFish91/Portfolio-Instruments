import { Form, Formik, FormikState } from "formik";
import React from "react";
import { holdingFormSchema } from "../../validation/holdings";
import { HoldingForm } from "../../validation/types";
import Button from "../forms/Button";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { selectAccountTypeMap, selectAssetTypeMap } from "./constants";

interface CardAddSnapshotsFormProps {
  addHolding: (holding: HoldingForm) => void;
}

type FieldValue = (nextState?: Partial<FormikState<HoldingForm>>) => void;

const CardAddSnapshotsForm: React.FC<CardAddSnapshotsFormProps> = ({
  addHolding,
}) => {
  const submitHolding = (values: HoldingForm, actions: any): void => {
    addHolding(values);
    actions.setFieldValue("holdingTitle", "") as FieldValue;
    actions.setFieldValue("holdingTicker", "") as FieldValue;
    actions.setFieldValue("holdingAmount", 0) as FieldValue;
    actions.setFieldValue("holdingExpenseRatio", 0) as FieldValue;
  };

  return (
    <Formik
      initialValues={
        {
          holdingLocation: "",
          holdingTitle: "",
          holdingTicker: "",
          holdingExpenseRatio: "0",
          holdingAmount: "0",
          accountType: "Taxable",
          assetType: "cash",
        } as HoldingForm
      }
      validationSchema={holdingFormSchema}
      onSubmit={(values, actions) => submitHolding(values, actions)}
    >
      {() => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Holdings</h3>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6 col-lg-6">
                <InputField
                  label="Holding Title"
                  name="holdingTitle"
                  placeholder="Ex. Vanguard Total Stock Market Index Fund"
                  type="text"
                />

                <InputField
                  label="Holding Ticker"
                  name="holdingTicker"
                  placeholder="Ex. VITSX"
                  type="text"
                />

                <InputField
                  label="Holding Amount ($)"
                  name="holdingAmount"
                  placeholder="Ex. 320.25"
                  type="text"
                />

                <InputField
                  label="Holding Expense Ratio"
                  name="holdingExpenseRatio"
                  placeholder="Ex. 0.25"
                  type="text"
                />

                <Button title="Submit Holding" />
                <Button title="Reset Holding" type="reset" />
              </div>

              {/* Right Column */}
              <div className="col-md-6 col-lg-6">
                <InputField
                  label="Holding Location"
                  name="holdingLocation"
                  placeholder="Ex. Vanguard"
                  type="text"
                />

                <SelectField
                  label="Account Type"
                  selectMap={selectAccountTypeMap}
                  name="accountType"
                  type="text"
                />

                <SelectField
                  label="Asset Type"
                  selectMap={selectAssetTypeMap}
                  name="assetType"
                  type="text"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CardAddSnapshotsForm;
