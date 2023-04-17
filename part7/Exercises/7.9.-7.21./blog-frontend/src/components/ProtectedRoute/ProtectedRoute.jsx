import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((store) => store.user);

  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
