import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { customBenchmarkFormSchema } from "../../../validation/benchmark";
import { CustomBenchmarkForm } from "../../../validation/types";
import { selectAssetTypeMap } from "../../CardAddSnapshotsForm/constants";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";

interface cardAddBenchmarksTableProps {
  addAsset: (values: CustomBenchmarkForm) => void;
}

const CardAddBenchmarksTable: React.FC<cardAddBenchmarksTableProps> = ({
  addAsset,
}) => {
  const submitAsset = (
    values: CustomBenchmarkForm,
    actions: FormikHelpers<CustomBenchmarkForm>
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
      validationSchema={customBenchmarkFormSchema}
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

export default CardAddBenchmarksTable;
