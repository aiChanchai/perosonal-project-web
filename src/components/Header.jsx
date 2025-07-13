import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { User, Menu, X } from "lucide-react";
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

  const navLinks = [
    { name: "My habits", path: "/habits" },
    { name: "Progress", path: "/progress" },
    { name: "Calendar", path: "/calendar" },
  ];

  const activeLinkClass = "text-indigo-600 font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-indigo-500";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className=" flex items-center justify-between h-15 px-6">
        {/* Left: Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl flex items-center hover:cursor-pointer  font-bold text-indigo-600"
          >
            <LogoIcon className="w-12 " />
            <span className="pl-2 ">HabitFlow</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation
        <div className="  space-x-8 md:flex">
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
        </div> */}

        {/* Right: Profile Icon & Mobile Menu Button */}
        <div className="flex  space-x-4 md:space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hidden md:block ${
                  isActive ? activeLinkClass : inactiveLinkClass
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/profile" className="hidden md:block">
            <User
              className="w-7 h-7 text-gray-500 transition-colors hover:text-indigo-600 hover:cursor-pointer"
              strokeWidth={1.5}
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
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

      {/* Mobile Menu */}
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
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-full py-2 text-gray-700 rounded-md"
            >
              <User className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Profile
            </Link>

            <button
              onClick={hdlLogout}
              className="flex items-center justify-center w-full py-2 mt-2 text-white bg-red-600 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
