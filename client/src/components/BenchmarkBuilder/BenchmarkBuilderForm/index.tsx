import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { customBenchmarkAssetSchema } from "../../../validation/benchmark";
import { CustomBenchmarkAssetsForm } from "../../../validation/types";
import { selectAssetTypeMap } from "../../AddSnapshotsForm/constants";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";

interface BenchmarkBuilderFormProps {
  addAsset: (values: CustomBenchmarkAssetsForm) => void;
}

const BenchmarkBuilderForm: React.FC<BenchmarkBuilderFormProps> = ({
  addAsset,
}) => {
  const submitAsset = (
    values: CustomBenchmarkAssetsForm,
    actions: FormikHelpers<CustomBenchmarkAssetsForm>
  ) => {
    addAsset(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        assetCategory: "cash",
        assetPercentage: "",
      }}
      validationSchema={customBenchmarkAssetSchema}
      onSubmit={(values, actions) => submitAsset(values, actions)}
    >
      {() => (
        <Form>
          <SelectField
            label="Asset Category"
            selectMap={selectAssetTypeMap}
            name="assetCategory"
            type="text"
          />
          <InputField
            label="Asset Percentage"
            name="assetPercentage"
            placeholder="Asset Percentage goes here"
            type="text"
          />
          <div>
            <Button title="Add Asset" />
            <Button title="Reset Asset" type="reset" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BenchmarkBuilderForm;
