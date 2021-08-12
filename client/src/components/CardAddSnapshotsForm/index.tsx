import { Form, Formik, FormikState } from "formik";
import React from "react";
import { holdingFormSchema } from "../../validation/holdings";
import { HoldingForm } from "../../validation/types";
import Button from "../forms/Button";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { selectAccountTypeMap, selectAssetTypeMap } from "./constants";

interface CardAddSnapshotsFormProps {}

type FieldValue = (nextState?: Partial<FormikState<HoldingForm>>) => void;

const CardAddSnapshotsForm: React.FC<CardAddSnapshotsFormProps> = () => {
  const submitHolding = (values: HoldingForm, actions: any): void => {
    console.log(values);
    actions.setFieldValue("holdingAmount", 0) as FieldValue;
  };

  return (
    <Formik
      initialValues={{
        holdingLocation: "",
        holdingAmount: 0,
        accountType: "Taxable",
        assetType: "cash",
      }}
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
                  label="Holding Location"
                  name="holdingLocation"
                  placeholder="Ex. Vanguard"
                  type="text"
                />

                <InputField
                  label="Holding Amount ($)"
                  name="holdingAmount"
                  placeholder="Ex. 320.25"
                  type="text"
                />

                <Button title="Submit Holding" />
                <Button title="Reset Holding" type="reset" />
              </div>

              {/* Right Column */}
              <div className="col-md-6 col-lg-6">
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
