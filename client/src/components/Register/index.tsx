import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  // const submitLogin = (e: Event) => {
  //   e.preventDefault();

  //   // signin({ userName: email, userPassword: password }, () => {
  //   //   history.push("/dashboard");
  //   // });
  // };

  return (
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
                <form className="card" method="post">
                  <div className="card-body p-6">
                    <div className="card-title text-center">
                      Register your Account
                    </div>
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputfirstName1"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputLastName1"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      ></input>
                    </div>
                    <div className="form-footer">
                      <button className="btn btn-primary btn-block">
                        Sign In
                      </button>
                    </div>
                    <div className="text-center text-muted mt-3">
                      Already have an account?{" "}
                      <Link to="/login">Login Here</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {this.props.errorMessage} */}
    </div>
  );
};

export default Register;
