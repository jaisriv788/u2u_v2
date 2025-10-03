import { Navigate, Outlet, useLocation } from "react-router";
import useUserStore from "../../store/userStore";
import useModalStore from "../../store/modalStore";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isConnected } = useUserStore();
  const { isSidebarOpen, setIsSidebarOpen } = useModalStore();

  const location = useLocation();

  const isInvoice = location.pathname === "/invoice";

  useEffect(() => {
    const screenWidth = window.innerWidth;
    setIsSidebarOpen(screenWidth >= 1024);
  }, [setIsSidebarOpen]);

  return isConnected ? (
    <div className="flex flex-col h-screen bg-black text-white">
      {!isInvoice && <Navbar />}
      <div className="flex flex-1 overflow-hidden relative">
        {!isInvoice && isSidebarOpen && <SideBar />}
        <div className="flex-1 flex overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
