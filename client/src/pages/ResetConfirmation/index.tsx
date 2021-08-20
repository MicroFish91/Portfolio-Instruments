import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  selectCustomUserErrorMessage,
  selectUserLoading,
} from "../../redux/User/Selectors";

const ResetConfirmation = () => {
  const errorMessage = useSelector(selectCustomUserErrorMessage);
  const isLoading = useSelector(selectUserLoading);
  const history = useHistory();

  useEffect(() => {
    let timeoutPageRedirect = setTimeout(() => history.push("/login"), 5000);
    return () => {
      clearTimeout(timeoutPageRedirect);
    };
  }, []);

  return (
    <>
      {!errorMessage && !isLoading && (
        <h3>Reset confirmed! Please check your email for verification. </h3>
      )}
      {errorMessage && !isLoading && <h3>Error: {errorMessage}</h3>}
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ClipLoader size={180} color="purple" />
        </div>
      )}
    </>
  );
};

export default ResetConfirmation;
