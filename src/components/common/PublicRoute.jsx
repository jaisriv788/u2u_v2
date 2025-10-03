import { Navigate, Outlet } from "react-router";
import useUserStore from "../../store/userStore";

function PublicRoute() {
  const { isConnected } = useUserStore();

  return !isConnected ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default PublicRoute;
