import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  selectUserEmail,
  selectUserErrorField,
  selectUserErrorMessage,
  selectUserLoadingField,
} from "../../../redux/User/Selectors";
import {
  clearUserErrorAction,
  userchangePasswordAction,
} from "../../../redux/User/userSlice";
import { ChangePasswordForm } from "../../../validation/types";
import { passwordFormSchema } from "../../../validation/users";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";

const PasswordForm = () => {
  const [changedPassword, setChangedPassword] = useState(false);
  const loadingField = useSelector(selectUserLoadingField);
  const userErrorField = useSelector(selectUserErrorField);
  const userErrorMessage = useSelector(selectUserErrorMessage);
  const currentUserEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userErrorField === "changePassword") {
      const timer = setTimeout(() => {
        dispatch(clearUserErrorAction());
        setChangedPassword(false);
        clearTimeout(timer);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return;
  }, [userErrorField]);

  const submitChangePassword = (values: ChangePasswordForm, actions: any) => {
    if (currentUserEmail !== "hello_world@gmail.com") {
      dispatch(userchangePasswordAction(values));
      actions.resetForm();
      setChangedPassword(true);
    } else {
      alert("This feature is blocked for demo accounts.");
    }
  };

  return (
    <Formik
      initialValues={
        {
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        } as ChangePasswordForm
      }
      validationSchema={passwordFormSchema}
      onSubmit={(values, actions) => submitChangePassword(values, actions)}
    >
      {() => (
        <Form className="card">
          <div className="card-header">
            <h3 className="card-title">Change Password</h3>
          </div>
          {loadingField !== "changePassword" && (
            <div className="card-body">
              <div className="row">
                <div className="col-md-2 col-lg-2">
                  <InputField
                    label="Current Password"
                    name="currentPassword"
                    placeholder="Enter current password"
                    type="password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 col-lg-2">
                  <InputField
                    label="New Password"
                    name="newPassword"
                    placeholder="Enter new password"
                    type="password"
                  />
                </div>
                <div className="col-md-2 col-lg-2">
                  <InputField
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    placeholder="Repeat new password"
                    type="password"
                  />
                </div>
              </div>
              <Button title="Submit Password" />
              <Button title="Reset Password" type="reset" />

              {/* On Success */}
              {changedPassword &&
                loadingField !== "changePassword" &&
                userErrorField !== "changePassword" && (
                  <h3 className="message-success">
                    Password change successful!
                  </h3>
                )}

              {/* On Fail */}
              {changedPassword &&
                loadingField !== "changePassword" &&
                userErrorField === "changePassword" && (
                  <h3 className="form-error-major">
                    Error: {userErrorMessage}
                  </h3>
                )}
            </div>
          )}

          {loadingField === "changePassword" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ClipLoader size={180} color="purple" />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PasswordForm;
