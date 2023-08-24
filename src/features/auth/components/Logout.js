import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutAsync, selectLoggedInUser } from "../authSlice";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(logoutAsync());
  }, [dispatch, user]);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}
