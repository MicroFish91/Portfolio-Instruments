import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions";
import { userFormSchema } from "../../validation";
import { UserForm } from "../../validation/types";
import TextField from "./TextField";

const Register = () => {
  const dispatch = useDispatch();

  const submitRegistration = (values: UserForm): void => {
    const user = { ...values };
    delete user.confirmPassword;
    dispatch(userActions.register(user));
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
      validationSchema={userFormSchema}
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
                        <TextField
                          label="First Name"
                          name="firstName"
                          type="text"
                        />
                        <TextField
                          label="Last Name"
                          name="lastName"
                          type="text"
                        />
                        <TextField label="Email" name="email" type="email" />
                        <TextField
                          label="Password"
                          name="password"
                          type="password"
                        />
                        <TextField
                          label="Confirm Password"
                          name="confirmPassword"
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
