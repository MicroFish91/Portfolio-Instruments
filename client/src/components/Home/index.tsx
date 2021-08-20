import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const history = useHistory();

  const navigateLogin = () => {
    history.push("/login");
  };

  const navigateRegister = () => {
    history.push("/register");
  };

  return (
    <div
      className="Home"
      style={{ backgroundImage: "url('./assets/images/Landing.jpg')" }}
    >
      <div className="card landing-header">
        <div className="card-body">
          <h2>
            <u>Portfolio Instruments</u>
          </h2>
          <h4 style={{ fontStyle: "italic" }}>&nbsp;- Investing Made Easy</h4>
        </div>
      </div>

      <div className="landing-intro">
        <div className="card">
          <div className="card-body">
            We know setting up and tracking your passive investments can be an
            overwhelming and difficult endeavor. That's why we made Portfolio
            Instruments - the all in one portfolio tracker and asset rebalancer.
            Sign up today to make your portfolio just that much easier to manage
            - you'll be glad you did!
            <div>
              {" "}
              &nbsp;
              <br></br>{" "}
              <button className="btn btn-primary" onClick={navigateLogin}>
                Login
              </button>{" "}
              <button className="btn btn-primary" onClick={navigateRegister}>
                Start Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
