import { Navigate, Outlet } from "react-router";
import useUserStore from "../stores/userStore";

function ProtectedRoute() {
  const { user } = useUserStore();

  if (!user) {
    // ถ้าไม่มี user, ให้ redirect ไปหน้า login
    return <Navigate to="/login" replace />;
  }

  // ถ้ามี user, ให้แสดง Component ลูกที่อยู่ข้างใน (ผ่าน Outlet)
  return <Outlet />;
}
export default ProtectedRoute;
