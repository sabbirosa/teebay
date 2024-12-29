import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/LoadingComponent";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
