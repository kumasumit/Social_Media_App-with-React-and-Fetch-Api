import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
