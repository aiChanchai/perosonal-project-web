import { Outlet } from "react-router";
import Header from "../components/Header";

function UserLayout() {
  return (
    <div className="max-h-screen">
      <Header />
      <div className="relative flex gap-2 bg-gray-100  ">
        <Outlet />
      </div>
    </div>
  );
}
export default UserLayout;
