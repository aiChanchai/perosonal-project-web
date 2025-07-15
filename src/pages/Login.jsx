import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginSchema } from "../utils/validators";
import { authApi } from "../api/authApi";
import { useState } from "react";
import useUserStore from "../stores/userStore";

function Login() {
  const [resetForm, setResetForm] = useState(false);
  const login = useUserStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onBlur" });

  const hdClose = () => {
    console.log("dialog close...");
    setResetForm((prv) => !prv);
  };

  const hdlLogin = async (data) => {
    try {
      await new Promise((resolver) => setTimeout(resolver, 1000));
      const resp = await login(data);
      // toast.success(resp.data.message);
      // localStorage.setItem("user", JSON.stringify(resp.data.user));
      navigate("/habits");
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast(errMsg);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex mx-auto justify-center  h-screen bg-gray-100">
      <div className=" flex items-center flex-col ml-6 h-150 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left Side (Form) */}

        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Hello, Welcome</span>
          <span className="font-light text-gray-400 mb-8">
            Hey, welcome to your special place.
          </span>

          <form onSubmit={handleSubmit(hdlLogin)}>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                {...register("email")}
              />
              <p className="text-sm text-error">{errors.email?.message}</p>
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                {...register("password")}
              />
              <p className="text-sm text-error">{errors.password?.message}</p>
            </div>

            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember me</span>
              </div>
              <span className="font-bold text-md cursor-pointer">
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:cursor-pointer w-full bg-purple-600 text-white p-2 rounded-lg mb-6 hover:bg-purple-700 hover:border-purple-700"
            >
              {isSubmitting ? "Signing..." : "Sign in"}
            </button>
          </form>

          <div className="text-center text-gray-400">
            Don't have an account?
            <Link
              to="/register"
              className="font-bold text-black ml-2 hover:cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="relative">
          <img
            src="https://www.wellable.co/blog/wp-content/uploads/2024/01/Science-Of-Habit-Formation-Habit-Loop-edited.png"
            alt="img"
            className="w-[500px]  hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
