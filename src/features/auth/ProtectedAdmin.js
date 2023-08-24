import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./authSlice";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user.role === "admin") {
    return <Navigate to="/admin" replace={true}></Navigate>;
  }

  return children;
}

export default ProtectedAdmin;
