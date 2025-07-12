import { Navigate, Outlet, useLocation } from "react-router";
import useUserStore from "../stores/userStore";

function ProtectedRoute() {
  const { user } = useUserStore();
  const location = useLocation();

  if (!user) {
    // ถ้าไม่มี user, ให้ redirect ไปหน้า login
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === "/") {
    return <Navigate to="/habits" />;
  }

  // ถ้ามี user, ให้แสดง Component ลูกที่อยู่ข้างใน (ผ่าน Outlet)
  return <Outlet />;
}
export default ProtectedRoute;
