import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // แก้ไข import
import { User, Menu, X, LogOut } from "lucide-react";
import { LogoIcon } from "../icons";
import useUserStore from "../stores/userStore";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/login");
  };

  const activeLinkClass = "text-indigo-600 font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-indigo-500";

  // --- Header สำหรับ ADMIN (โค้ดเดิมถูกต้องแล้ว) ---
  if (user?.role === "ADMIN") {
    const adminNavLinks = [
      { name: "Users", path: "/admin/users" },
      { name: "Categories", path: "/admin/categories" },
    ];

    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left */}
          <Link
            to="/"
            className="text-2xl flex items-center hover:cursor-pointer font-bold text-indigo-600"
          >
            <LogoIcon className="w-12" />
            <span className="pl-2">HabitFlow (Admin)</span>
          </Link>

          {/* Center */}
          <nav className="hidden md:flex items-center gap-8">
            {adminNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeLinkClass : inactiveLinkClass
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div>
            <button
              onClick={hdlLogout}
              className="btn btn-ghost gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  // --- Header สำหรับ USER ทั่วไป (ส่วนที่แก้ไข) ---
  const navLinks = [
    { name: "My Habits", path: "/habits" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* 1. ส่วนซ้าย: Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl flex items-center hover:cursor-pointer font-bold text-indigo-600"
          >
            <LogoIcon className="w-12" />
            <span className="pl-2">HabitFlow</span>
          </Link>
        </div>

        {/* 3. ขวา: Logout และปุ่มเมนู  */}
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeLinkClass : inactiveLinkClass
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <button
              onClick={hdlLogout}
              className="btn btn-ghost gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (โค้ดเดิมถูกต้องแล้ว) */}
      {isMenuOpen && (
        <div className="px-6 pb-4 space-y-2 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-center rounded-md ${
                  isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t">
            <button
              onClick={() => {
                hdlLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center w-full py-2 mt-2 text-white bg-red-500 rounded-md"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
