import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  selectUserEmail,
  selectUserErrorMessage,
  selectUserLoading,
} from "../../redux/User/Selectors";
import {
  clearUserAction,
  clearUserLoadingAction,
  userRegisterAction,
} from "../../redux/User/userSlice";
import { registrationFormSchema } from "../../validation";
import { RegistrationForm } from "../../validation/types";
import InputField from "../forms/InputField";

const Register = () => {
  const errorMessage = useSelector(selectUserErrorMessage);
  const isLoading = useSelector(selectUserLoading);
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userEmail) {
      history.push("/confirmation");
    }
  }, [userEmail]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(clearUserLoadingAction());
        clearTimeout(timer);
      }, 10000);
    }
  }, [isLoading]);

  const navigateLogin = () => {
    dispatch(clearUserAction());
    history.push("/login");
  };

  const submitRegistration = (values: RegistrationForm): void => {
    const user = { ...values };
    delete user.confirmPassword;
    dispatch(userRegisterAction(user));
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registrationFormSchema}
      onSubmit={(values) => submitRegistration(values)}
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
                    {isLoading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ClipLoader size={180} color="purple" />
                      </div>
                    ) : (
                      <Form className="card">
                        <div className="card-body p-6">
                          <div className="card-title text-center">
                            Register your Account
                          </div>
                          <InputField
                            label="First Name"
                            name="firstName"
                            placeholder="Enter first name"
                            type="text"
                          />
                          <InputField
                            label="Last Name"
                            name="lastName"
                            placeholder="Enter last name"
                            type="text"
                          />
                          <InputField
                            label="Email"
                            name="email"
                            placeholder="Enter email"
                            type="email"
                          />
                          <InputField
                            label="Password"
                            name="password"
                            placeholder="Enter password"
                            type="password"
                          />
                          <InputField
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Enter Password"
                            type="password"
                          />
                          {errorMessage ? (
                            <div>
                              <span className="form-error-major">{`${errorMessage}`}</span>
                            </div>
                          ) : null}
                          <div className="form-footer">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                            >
                              Sign In
                            </button>
                            <button
                              className="btn btn-primary btn-block"
                              type="reset"
                            >
                              Reset
                            </button>
                          </div>
                          <div className="text-center text-muted mt-3">
                            Already have an account?{" "}
                            <a href="#" onClick={navigateLogin}>
                              Login Here
                            </a>
                          </div>
                        </div>
                      </Form>
                    )}
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

export default Register;
