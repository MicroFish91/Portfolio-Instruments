import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectIsUserAuthorized } from "../redux/User/userSelectors";
import { clearUserAction } from "../redux/User/userSlice";

export const useAuth = () => {
  const isAuthorized = useSelector(selectIsUserAuthorized);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthorized) {
      history.push("/login");
      dispatch(clearUserAction());
    }
  }, [isAuthorized]);

  return isAuthorized;
};
