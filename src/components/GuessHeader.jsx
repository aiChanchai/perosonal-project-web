import { Link } from "react-router";
import { LogoIcon } from "../icons";

function GuessHeader() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm">
      {/* Left: Logo */}
      <div>
        <Link
          to="/"
          className="text-2xl flex items-center   font-bold text-indigo-600"
        >
          <LogoIcon className="w-12 " />
          <span className="pl-2">HabitFlow</span>
        </Link>
      </div>

      <div className="flex gap-2">
        <Link className="btn btn-primary rounded-xl" to="/register">
          Register
        </Link>
        <Link className="btn btn-primary rounded-xl" to="/login">
          Login
        </Link>
      </div>
    </header>
  );
}

export default GuessHeader;
