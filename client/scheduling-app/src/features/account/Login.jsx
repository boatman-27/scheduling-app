import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

import { login } from "../../services/apiAccount";
function Login() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      return login(data);
    },
    mutationKey: ["login"],
    onSuccess: (data) => {
      if (data.message == "Login successful") {
        queryClient.invalidateQueries("accountStatus");
        toast.success("Logged in successfully!");
        reset();
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed, please try again.");
    },
  });

  const onSubmit = (data) => {
    clearErrors();
    mutate(data);
  };

  const onError = (errors) => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative w-full rounded-lg bg-white p-4 shadow sm:w-[450px] sm:p-5 md:w-[560px] lg:w-[700px] dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-center rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sign into your account
          </h3>
        </div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="email"
              name="username"
              id="username"
              placeholder="name@company.com"
              {...register("username", {
                required: "Please enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-xs italic text-red-500">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <NavLink
                to="/account/register"
                className="dark:text-primary-500 font-medium text-white underline hover:underline"
              >
                Sign up
              </NavLink>
            </p>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <NavLink
                to="/account/reset-password"
                className="dark:text-primary-500 font-medium text-white underline hover:underline"
              >
                Forgot password?
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
