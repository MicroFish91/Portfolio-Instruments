import { Form, Formik } from "formik";
import React, { ChangeEvent, useState } from "react";
import { holdingFormSchema } from "../../validation/holdings";
import { HoldingForm } from "../../validation/types";
import Button from "../forms/Button";
import Checkbox from "../forms/Checkbox";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { selectAccountTypeMap, selectAssetTypeMap } from "./constants";

interface CardAddSnapshotsFormProps {
  addHolding: (holding: HoldingForm) => void;
}

const CardAddSnapshotsForm: React.FC<CardAddSnapshotsFormProps> = ({
  addHolding,
}) => {
  const [tickerCache, setTickerCache] = useState([] as HoldingForm[]);

  const filterCache = (values: HoldingForm) => {
    const tickerExists = !!tickerCache.filter(
      (holding) => holding.holdingTicker === values.holdingTicker
    ).length;

    if (!tickerExists) {
      setTickerCache([...tickerCache, values]);
    }
  };

  const tickerChangeHandler = (e: ChangeEvent, setFieldValue: any) => {
    //@ts-ignore
    setFieldValue("holdingTicker", e.target.value);
  };

  const submitHolding = (values: HoldingForm, actions: any): void => {
    filterCache(values);
    addHolding(values);
    actions.resetForm();
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
          holdingVP: false,
          accountType: "Taxable",
          assetType: "cash",
        } as HoldingForm
      }
      validationSchema={holdingFormSchema}
      onSubmit={(values, actions) => submitHolding(values, actions)}
    >
      {({ values, setFieldValue }) => (
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
                  onChange={(e) => {
                    tickerChangeHandler(e, setFieldValue);
                  }}
                  value={values.holdingTicker}
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

                <Checkbox
                  label="Variable Portfolio"
                  name="holdingVP"
                  value={values.holdingVP}
                />
              </div>
              <div className="ml-3">
                <Button title="Submit Holding" />
                <Button title="Reset Holding" type="reset" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CardAddSnapshotsForm;
