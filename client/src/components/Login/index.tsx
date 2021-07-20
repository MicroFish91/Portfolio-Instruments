import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
                      Login to your Account
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
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
                      <label className="form-label">Enter Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
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
                      Don't have account yet?{" "}
                      <Link to="/register">Create Account </Link>
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

export default Login;
