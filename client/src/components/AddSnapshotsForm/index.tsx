import { Form, Formik } from "formik";
import React, { useState } from "react";
import { holdingFormSchema } from "../../validation/holdings";
import { HoldingForm } from "../../validation/types";
import Button from "../forms/Button";
import Checkbox from "../forms/Checkbox";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { selectAccountTypeMap, selectAssetTypeMap } from "./constants";
import ScrapeResults from "./ScrapeResults";
import { scrapedData } from "./ScrapeResults/scrapeUtils/types";

interface AddSnapshotsFormProps {
  addHolding: (holding: HoldingForm) => void;
}

const AddSnapshotsForm: React.FC<AddSnapshotsFormProps> = ({ addHolding }) => {
  const [holdingCache, setHoldingCache] = useState([] as HoldingForm[]);
  const [toggleScrapeResults, setToggleScrapeResults] = useState(false);

  // Parse Scraped Yahoo Finance Data into Forms ("Whenever we type '`'")
  const addScraped = (scrapeData: scrapedData, setFieldValue: any) => {
    setFieldValue("holdingTitle", scrapeData?.holdingTitle || "???");
    setFieldValue("holdingTicker", scrapeData?.holdingTicker || "???");
    setFieldValue(
      "holdingExpenseRatio",
      scrapeData?.holdingExpenseRatio || "???"
    );
    setFieldValue("holdingAmount", "");
    setFieldValue("holdingLocation", "");
    setFieldValue("accountType", "Taxable");
    setFieldValue("assetType", "cash");
    setFieldValue("holdingVP", false);
  };

  // Cache ticker data whenever we submit a holding
  const filterCache = (values: HoldingForm) => {
    values.holdingTicker = values.holdingTicker.toUpperCase();

    const tickerIndex = holdingCache.findIndex(
      (holding) => holding.holdingTicker === values.holdingTicker
    );

    if (tickerIndex === -1) {
      setHoldingCache([...holdingCache, values]);
    } else {
      const newHoldingCache = [...holdingCache];
      newHoldingCache[tickerIndex] = values;
      setHoldingCache(newHoldingCache);
    }
  };

  // This data populates the form whenever we select a ticker from the cache
  const selectCachedHolding = (holding: HoldingForm, setFieldValue: any) => {
    setFieldValue("holdingTitle", holding.holdingTitle);
    setFieldValue("holdingTicker", holding.holdingTicker);
    setFieldValue("holdingAmount", "");
    setFieldValue("holdingExpenseRatio", holding.holdingExpenseRatio);
    setFieldValue("holdingLocation", holding.holdingLocation);
    setFieldValue("accountType", holding.accountType);
    setFieldValue("assetType", holding.assetType);
    setFieldValue("holdingVP", false);
  };

  // On holding submit
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
                  onChange={(e) =>
                    setFieldValue("holdingTicker", e.target.value)
                  }
                  onFocus={(_e) => setToggleScrapeResults(!toggleScrapeResults)}
                  onBlur={(_e) => {
                    // Delay so that we can click and register the scrape recommendations
                    setTimeout(
                      () => setToggleScrapeResults(!toggleScrapeResults),
                      100
                    );
                  }}
                  value={values.holdingTicker}
                />

                {/* Display Ticker Recommendations */}
                {toggleScrapeResults && (
                  <>
                    <ScrapeResults
                      addScraped={addScraped}
                      searchParam={values.holdingTicker}
                      holdingCache={holdingCache}
                      setFieldValue={setFieldValue}
                      selectCachedHolding={selectCachedHolding}
                    />{" "}
                    <br />{" "}
                  </>
                )}

                <InputField
                  label="Holding Amount ($)"
                  name="holdingAmount"
                  placeholder="Ex. 320.25"
                  type="text"
                />
                <InputField
                  label="Holding Expense Ratio (%)"
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

export default AddSnapshotsForm;
