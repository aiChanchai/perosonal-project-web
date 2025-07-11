import { Component, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import UserLayout from "../layouts/UserLayout";
import GuessLayout from "../layouts/GuessLayout";

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Habits = lazy(() => import("../pages/Habits"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Progress = lazy(() => import("../pages/Progress"));
const Register = lazy(() => import("../pages/Register"));

const guestRouter = createBrowserRouter([
  {
    path: "/",
    Component: GuessLayout,
    children: [
      { path: "/", Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      { path: "", Component: Home },
      { path: "habit", Component: Habits },
      { path: "profile", Component: Profile },
      { path: "calendar", Component: Calendar },
      { path: "progress", Component: Progress },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {
  const user = null;
  // const user = "aichanchai@gmail.com";
  const finalRouter = user ? userRouter : guestRouter;
  return (
    //ใช้ Suspense เพื่อรอระหว่าง lazy load component
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={finalRouter} />
    </Suspense>
  );
}

export default AppRouter;
