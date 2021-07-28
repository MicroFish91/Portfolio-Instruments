import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUserToken } from "../redux/User/userSelectors";

export const useAuth = () => {
  const userToken = useSelector(selectUserToken);
  const history = useHistory();

  useEffect(() => {
    if (!userToken) {
      history.push("/login");
    }
  }, [userToken]);

  return userToken;
};
