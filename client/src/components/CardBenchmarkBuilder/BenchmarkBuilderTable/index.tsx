import { Form, Formik } from "formik";
import React from "react";
import { benchmarkTitleSchema } from "../../../validation/benchmark";
import { CustomBenchmarkForm } from "../../../validation/types";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";
import TextArea from "../../forms/TextArea";

interface benchmarkBuilderTableProps {
  assetAllocation: { [key: string]: number };
  deleteAsset: (
    e: React.MouseEvent<HTMLElement>,
    assetCategory: string
  ) => void;
  resetBenchmark: () => void;
  submitBenchmark: (benchmarkForm: CustomBenchmarkForm) => void;
}

const BenchmarkBuilderTableProps: React.FC<benchmarkBuilderTableProps> = ({
  assetAllocation,
  deleteAsset,
  resetBenchmark,
  submitBenchmark,
}) => {
  const renderTableBody = () => {
    return Object.keys(assetAllocation).map((asset) => {
      return (
        <tr>
          <th className="wd-33p">{asset}</th>
          <th className="wd-33p">{assetAllocation[asset]}</th>
          <th className="wd-33p">
            {asset !== "unallocated" ? (
              <>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="icon"></a>
                <a
                  href="javascript:void(0)"
                  className="btn btn-danger btn-sm"
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    deleteAsset(e, asset)
                  }
                >
                  <i className="fas fa-trash"></i> Delete{" "}
                </a>{" "}
              </>
            ) : null}
          </th>
        </tr>
      );
    });
  };

  const submitCustomBenchmark = (values: CustomBenchmarkForm, actions: any) => {
    const unallocated = assetAllocation["unallocated"];

    if (unallocated === 0) {
      submitBenchmark(values);
      actions.resetForm();
    } else {
      alert("Warning: Asset allocation does not sum to 100, please try again.");
    }
  };

  return (
    <Formik
      initialValues={{
        benchmarkTitle: "",
        benchmarkShortDescription: "",
        benchmarkLongDescription: "",
        benchmarkCAGR: "",
        benchmarkStdDev: "",
        benchmarkWorstDrawdown: "",
        benchmarkLongestDrawdown: "",
      }}
      validationSchema={benchmarkTitleSchema}
      onSubmit={(values, actions) => submitCustomBenchmark(values, actions)}
      onReset={resetBenchmark}
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
                  <th className="wd-33p">Asset Category</th>
                  <th className="wd-33p">Asset Percentage</th>
                  <th className="wd-33p">Delete</th>
                </tr>
              </thead>

              <tbody>{renderTableBody()}</tbody>
            </table>
          </div>

          <InputField
            label=""
            name="benchmarkShortDescription"
            placeholder="Benchmark short description goes here"
            type="text"
          />

          <TextArea
            label=" "
            name="benchmarkLongDescription"
            placeholder="Benchmark long description goes here"
            rows={2}
            type="text"
          />

          <div className="row">
            <InputField
              label="Avg. CAGR"
              className="col-md-6 col-lg-3"
              name="benchmarkCAGR"
              placeholder="%"
              type="text"
            />
            <InputField
              label="Std. Dev."
              className="col-md-6 col-lg-3"
              name="benchmarkStdDev"
              placeholder="e.g. 10.2"
              type="text"
            />
            <InputField
              label="Worst Draw."
              className="col-md-6 col-lg-3"
              name="benchmarkWorstDrawdown"
              placeholder="%"
              type="text"
            />
            <InputField
              label="Longest Draw."
              className="col-md-6 col-lg-3"
              name="benchmarkLongestDrawdown"
              placeholder="yrs"
              type="text"
            />
          </div>
          <br></br>

          <Button title="Submit Benchmark" />
          <Button title="Clear Benchmark" type="reset" />
        </Form>
      )}
    </Formik>
  );
};

export default BenchmarkBuilderTableProps;
