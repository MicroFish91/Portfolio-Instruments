import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCustomUserErrorMessage } from "../../redux/User/Selectors";

const EmailConfirmation = () => {
  const errorMessage = useSelector(selectCustomUserErrorMessage);
  const history = useHistory();

  useEffect(() => {
    let timeoutPageRedirect = setTimeout(() => history.push("/login"), 5000);
    return () => {
      clearTimeout(timeoutPageRedirect);
    };
  }, []);

  return (
    <>
      {!errorMessage ? (
        <h3>
          Registration Successful! Please check your email for verification.{" "}
        </h3>
      ) : (
        <h3>Error: {errorMessage}</h3>
      )}
    </>
  );
};

export default EmailConfirmation;
