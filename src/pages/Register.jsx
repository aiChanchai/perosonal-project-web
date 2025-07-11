import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validators";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { authApi } from "../api/authApi";

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const resp = await authApi.post("/register", data);
      console.log(resp);
      toast.success(resp.data?.message);
      reset();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg, {
        position: "top-left",
      });
    }
  };

  return (
    <div className=" flex justify-around w-screen max-h-screen">
      {/* Left */}
      <div className="h-full">Left</div>
      {/* right */}
      <div className="outline-1 w-100 mt-14">
        <div className="text-2xl mb-4 text-center opacity-70">
          Create your account
        </div>
        <p className="text-gray-400 text-sm mb-4">Sign up using the form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            disabled={isSubmitting}
            className="flex flex-col gap-5 p-4 pt-3"
          >
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-500 mb-2">
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
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email
              </label>
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
                <label className="block text-sm font-medium text-gray-500 mb-2">
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
                <label className="block text-sm font-medium text-gray-500 mb-2">
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
