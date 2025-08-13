import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signup = useAuthStore((state) => state.signup);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
    watch,
  } = useForm();

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  useEffect(() => {
    if (confirmPasswordValue) {
      trigger("confirmPassword");
    }
  }, [passwordValue, confirmPasswordValue, trigger]);

  const onSubmit = async (data) => {
      await signup(data);
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* create account and icon section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center
               justify-center group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  {...register("fullName", {
                    required: "Full name is required.",
                  })}
                  type="text"
                  placeholder="Name"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  type="email"
                  placeholder="Email"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters.",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input w-full"
                  />
                  <button
                    type="button"
                    // z-10 because daisyui input hides it when input is focused
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40 hover:text-base-content/60" />
                    ) : (
                      <Eye className="size-5 text-base-content/40 hover:text-base-content/60" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Confirm</span>
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm password is required.",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords must match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="input w-full"
                  />

                  <button
                    type="button"
                    // z-10 because daisyui input hides it when input is focused
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5 text-base-content/40 hover:text-base-content/60" />
                    ) : (
                      <Eye className="size-5 text-base-content/40 hover:text-base-content/60" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>
              <div className="flex flex-col justify-center mt-5">
                <button
                  type="submit"
                  className="btn bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link className="link link-primary" to="/login">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
