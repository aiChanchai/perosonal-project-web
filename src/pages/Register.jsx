import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validators";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { Link } from "react-router";
import { CircleCheckBig } from "lucide-react";

function Register() {
  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });
  const { isSubmitting, errors } = formState;

  // useEffect(() => {
  //   reset();
  // }, [resetForm]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const resp = await authApi.post("/register", data);
      console.log(resp);
      toast.success(resp.data.message);
      reset();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg, {
        position: "top-left",
      });
    }
  };

  return (
    <div className=" flex justify-around w-screen h-screen">
      {/* Left */}
      <div
        className="hidden lg:flex flex-col justify-between w-130 h-140 p-12 rounded-3xl shadow-2xl bg-cover bg-center"
        style={{ backgroundImage: `url('/pexels-scottwebb-3255761.jpg')` }}
      >
        <div>
          <Link to="/" className="text-xl font-bold text-indigo-600 ">
            HabitFlow
          </Link>
          <div className="text-4xl font-bold mt-8">
            {" "}
            Build a Better You,
            <br /> One Habit at a Time
          </div>
          <p className="pt-6 opacity-60">
            Join thousands of users transforming their lives with our intuitive
            platform. Tracking your progress has never been easier and more
            motivating
          </p>

          <div className=" flex justify-around mt-16 text-2xl font-bold">
            <div className="flex gap-2">
              <div className="mt-1">
                <CircleCheckBig />
              </div>
              <p className="block">Track Your Habits</p>
            </div>
            <div className="flex gap-2">
              <div className="m-1">
                <CircleCheckBig />
              </div>
              <div>Stay Motivated</div>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className=" w-100 mt-14">
        <div className="text-3xl mb-4 text-center font-bold">
          Create your account
        </div>
        <p className="text-gray-400 text-sm  pl-4">Sign up using the form</p>
        <div className="divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            disabled={isSubmitting}
            className="flex flex-col gap-5 p-4 pt-2"
          >
            <div className="w-full">
              <label className="block text-sm font-medium  mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full rounded-xl h-8 mb-2"
                {...register("name")}
              />
              <p className="text-sm text-error">{errors.name?.message}</p>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-xl h-8 mb-2"
                {...register("email")}
              />
              <p className="text-sm text-error">{errors.email?.message}</p>
            </div>

            <div className="flex gap-2 ">
              <div className="w-full">
                <label className="block text-sm font-medium  mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full rounded-xl h-8 mb-2"
                  {...register("password")}
                />
                <p className="text-sm text-error">{errors.password?.message}</p>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium  mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Enter your confirm password"
                  className="input input-bordered w-full rounded-xl h-8 mb-2"
                  {...register("confirmPassword")}
                />
                <p className="text-sm text-error">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-8 rounded-2xl"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default Register;
