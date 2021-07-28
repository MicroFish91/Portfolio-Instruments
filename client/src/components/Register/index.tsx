import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRegisterAction } from "../../redux/User/userSlice";
import { registrationFormSchema } from "../../validation";
import { RegistrationForm } from "../../validation/types";
import InputField from "../forms/InputField";

const Register = () => {
  const dispatch = useDispatch();

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
                          <Link to="/login">Login Here</Link>
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

export default Register;
