import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  selectUserErrorField,
  selectUserErrorMessage,
  selectUserLoadingField,
  selectUserRebalanceThreshold,
  selectUserVpThreshold,
} from "../../redux/User/Selectors";
import {
  clearUserErrorAction,
  userChangeNotificationsAction,
} from "../../redux/User/userSlice";
import { ChangeNotificationForm } from "../../validation/types";
import { changeNotificationFormSchema } from "../../validation/users";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

const NotificationForm = () => {
  const [changedNotifications, setChangedNotifications] = useState(false);
  const userErrorField = useSelector(selectUserErrorField);
  const userErrorMessage = useSelector(selectUserErrorMessage);
  const loadingField = useSelector(selectUserLoadingField);
  const userRebalanceThreshold = useSelector(selectUserRebalanceThreshold);
  const userVpThreshold = useSelector(selectUserVpThreshold);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userErrorField === "changeNotifications") {
      const timer = setTimeout(() => {
        dispatch(clearUserErrorAction());
        setChangedNotifications(false);
        clearTimeout(timer);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return;
  }, [userErrorField]);

  const submitChangeNotification = (
    values: {
      rebalanceThreshold: string | number;
      vpThreshold: string | number;
    },
    actions: any
  ) => {
    const finalValues = {
      rebalanceThreshold: parseInt(values.rebalanceThreshold as string),
      vpThreshold: parseInt(values.vpThreshold as string),
    };
    dispatch(userChangeNotificationsAction(finalValues));
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
      enableReinitialize={true}
      validationSchema={changeNotificationFormSchema}
      onSubmit={(values, actions) => submitChangeNotification(values, actions)}
    >
      {({ values }) => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Notification Settings</h3>
          </div>
          {loadingField !== "changeNotifications" && (
            <div className="card-body">
              <div className="row">
                <div className="col-md-2 col-lg-2">
                  <InputField
                    label="Asset Rebalance Threshold (%)"
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
                loadingField !== "changeNotifications" &&
                userErrorField !== "changeNotifications" && (
                  <h3 className="message-success">
                    Notifications changed successfully!
                  </h3>
                )}

              {/* On Fail */}
              {changedNotifications &&
                loadingField !== "changeNotifications" &&
                userErrorField === "changeNotifications" && (
                  <h3 className="form-error-major">
                    Error: {userErrorMessage}
                  </h3>
                )}
            </div>
          )}

          {loadingField === "changeNotifications" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ClipLoader size={180} color="purple" />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NotificationForm;
