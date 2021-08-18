import { Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserErrorField,
  selectUserErrorMessage,
  selectUserLoading,
  selectUserRebalanceThreshold,
  selectUserVpThreshold,
} from "../../redux/User/userSelectors";
import { ChangeNotificationForm } from "../../validation/types";
import { changeNotificationFormSchema } from "../../validation/users";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

const NotificationForm = () => {
  const [changedNotifications, setChangedNotifications] = useState(false);
  const isLoading = useSelector(selectUserLoading);
  const userErrorField = useSelector(selectUserErrorField);
  const userErrorMessage = useSelector(selectUserErrorMessage);
  const userRebalanceThreshold = useSelector(selectUserRebalanceThreshold);
  const userVpThreshold = useSelector(selectUserVpThreshold);

  const submitChangeNotification = (
    values: ChangeNotificationForm,
    actions: any
  ) => {
    console.log(values);
    actions.resetForm();
    setChangedNotifications(true);
  };

  return (
    <Formik
      initialValues={
        {
          rebalanceThreshold: userRebalanceThreshold,
          vpThreshold: userVpThreshold,
        } as ChangeNotificationForm
      }
      validationSchema={changeNotificationFormSchema}
      onSubmit={(values, actions) => submitChangeNotification(values, actions)}
    >
      {({ values }) => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Notification Settings</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 col-lg-2">
                <InputField
                  label="Rebalance Threshold (%)"
                  name="rebalanceThreshold"
                  placeholder="Enter an integer value"
                  type="text"
                  value={values.rebalanceThreshold}
                />
              </div>
              <div className="col-md-2 col-lg-2">
                <InputField
                  label="Variable Portfolio Threshold (%)"
                  name="vpThreshold"
                  placeholder="Enter an integer value"
                  type="text"
                  value={values.vpThreshold}
                />
              </div>
            </div>
            <Button title="Submit Settings" />
            <Button title="Reset Settings" type="reset" />

            {/* On Success */}
            {changedNotifications &&
              !isLoading &&
              userErrorField !== "changeNotifications" && (
                <h3 className="message-success">
                  Notifications changed successfully!
                </h3>
              )}

            {/* On Fail */}
            {changedNotifications &&
              !isLoading &&
              userErrorField === "changeNotifications" && (
                <h3 className="form-error-major">Error: {userErrorMessage}</h3>
              )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NotificationForm;
