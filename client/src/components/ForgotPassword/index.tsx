import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userResetPasswordAction } from "../../redux/User/userSlice";
import { ResetPasswordForm } from "../../validation/types";
import { resetPasswordFormSchema } from "../../validation/users";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const navigateLogin = () => {
    history.push("/login");
  };

  const resetPassword = (values: ResetPasswordForm, actions: any) => {
    if (values.email !== "hello_world@gmail.com") {
      dispatch(userResetPasswordAction(values));
      actions.resetForm();
      history.push("/resetConfirmation");
    } else {
      alert("This feature is disabled for demo accounts.");
    }
  };

  return (
    <Formik
      initialValues={
        {
          email: "",
        } as ResetPasswordForm
      }
      validationSchema={resetPasswordFormSchema}
      onSubmit={(values, actions) => resetPassword(values, actions)}
    >
      {() => (
        <div>
          <div id="particles-js" className=""></div>
          <div className="page">
            <div className="page-single">
              <div className="container">
                <div className="row">
                  <div className="col col-login mx-auto">
                    <div className="text-center mb-6 ">
                      <img src="" className="h-6" alt=""></img>
                    </div>
                    <Form className="card">
                      <div className="card-body p-6">
                        <InputField
                          label="Email"
                          name="email"
                          placeholder="Enter email"
                          type="email"
                        />
                        <Button title="Reset Password" />
                        <div className="text-center text-muted mt-3">
                          Remember your Login?{" "}
                          <a href="#" onClick={navigateLogin}>
                            Login Here
                          </a>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ForgotPassword;
