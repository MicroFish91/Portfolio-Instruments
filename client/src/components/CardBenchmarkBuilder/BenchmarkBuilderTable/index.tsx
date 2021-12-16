import { Form, Formik } from "formik";
import React from "react";
import { benchmarkTitleSchema } from "../../../validation/benchmark";
import { CustomBenchmarkTitle } from "../../../validation/types";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";

interface benchmarkBuilderTableProps {
  assetAllocation: { [key: string]: number };
  resetAssets: () => void;
}

const BenchmarkBuilderTableProps: React.FC<benchmarkBuilderTableProps> = ({
  assetAllocation,
  resetAssets,
}) => {
  const renderTableBody = () => {
    return Object.keys(assetAllocation).map((asset) => {
      return (
        <tr>
          <th className="wd-50p">{asset}</th>
          <th className="wd-50p">{assetAllocation[asset]}</th>
        </tr>
      );
    });
  };

  const submitCustomBenchmark = (
    values: CustomBenchmarkTitle,
    actions: any
  ) => {
    const unallocated = assetAllocation["unallocated"];

    if (unallocated === 0) {
      console.log(values);
      actions.resetForm();
    } else {
      alert("Warning: Asset allocation does not sum to 100, please try again.");
    }
  };

  return (
    <Formik
      initialValues={{
        benchmarkTitle: "",
      }}
      validationSchema={benchmarkTitleSchema}
      onSubmit={(values, actions) => submitCustomBenchmark(values, actions)}
      onReset={resetAssets}
    >
      {() => (
        <Form>
          <InputField
            label=""
            name="benchmarkTitle"
            placeholder="Benchmark title goes here"
            type="text"
          />
          <div className="table-responsive">
            <table
              className="table table-striped table-bordered"
              style={{ width: "100%", borderTop: "1px solid grey" }}
            >
              <thead>
                <tr>
                  <th className="wd-50p">Asset Category</th>
                  <th className="wd-50p">Asset Percentage</th>
                </tr>
              </thead>

              <tbody>{renderTableBody()}</tbody>
            </table>

            <br></br>
          </div>

          <Button title="Submit Assets" />
          <Button title="Clear Assets" type="reset" />
        </Form>
      )}
    </Formik>
  );
};

export default BenchmarkBuilderTableProps;
