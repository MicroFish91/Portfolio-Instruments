import { Form, Formik } from "formik";
import { getExportedRecordsJson } from "../../../redux/api/endpoints/logEndpoints";
import { exportDataSchema } from "../../../validation/exportData";
import { exportDataForm } from "../../../validation/types";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";
import { download } from "./exportUtils";

const ExportDataForm = () => {
  const submitExportRequest = async (values: exportDataForm, actions: any) => {
    const { exportDataLength } = values;
    const exportedJson = await getExportedRecordsJson(exportDataLength);

    const blob = new Blob([JSON.stringify(exportedJson.data)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    download(url, "PI_Exported_Snapshots.txt");
    URL.revokeObjectURL(url);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={
        {
          exportDataLength: "",
        } as exportDataForm
      }
      validationSchema={exportDataSchema}
      onSubmit={(values, actions) => submitExportRequest(values, actions)}
    >
      {({ values }) => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Export Data Options</h3>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <InputField
                  label="Export Data Time Range (years)"
                  name="exportDataLength"
                  placeholder="Enter '0' for full range"
                  type="text"
                  value={values.exportDataLength}
                />
              </div>
            </div>
            <Button title="Export JSON" type="submit" />
            <a
              href="https://data.page/json/csv"
              target="_blank"
              className={`btn btn-primary ml-1`}
            >
              Export CSV
            </a>

            <Button title="Reset Range" type="reset" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExportDataForm;
