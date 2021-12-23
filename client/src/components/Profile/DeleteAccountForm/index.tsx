import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUserEndpoint } from "../../../redux/api/endpoints/userEndpoints";
import { selectUserEmail } from "../../../redux/User/Selectors";
import { clearUserAction } from "../../../redux/User/userSlice";

const DeleteAccountForm = () => {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const history = useHistory();

  const onDeleteAccount = async () => {
    if (userEmail === "hello_world@gmail.com") {
      alert("This feature is blocked for demo accounts.");
      return;
    }

    const userResponse = window.prompt(
      "We hate to see you go. If you'd like to permanently delete, please type 'Delete-my-account'."
    );

    if (userResponse === "Delete-my-account") {
      const deleteUser = await deleteUserEndpoint();
      if (!deleteUser.error) {
        dispatch(clearUserAction());
        history.push("/");
      } else {
        alert("Unexpected server error, could not delete account.");
      }
    } else {
      alert("Invalid entry, account was not deleted.");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Permanently Delete Your Account</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-2 col-lg-2">
            <a
              href="#"
              className={`btn btn-primary ml-1`}
              target="_blank"
              onClick={onDeleteAccount}
            >
              Delete Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountForm;
