import { Outlet } from "react-router";

import GuessHeader from "../components/GuessHeader";

function GuessLayout() {
  return (
    <div className="min-h-screen">
      <GuessHeader />
      <div className="relative flex gap-2 bg-gray-100 border pt-15">
        <Outlet />
      </div>
    </div>
  );
}

export default GuessLayout;
