import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, MessageSquare, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

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
                <UserRoundPen className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">My Profile</h1>
              <p className="text-base-content/60">Your account information</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <div className="rounded-md outline-2 outline-fuchsia-200 p-3">
                <label htmlFor="profile-upload" className="label">
                  <span className="label-text font-medium">Upload Profile Photo</span>
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  placeholder={authUser.fullName}
                  className="w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder={authUser.fullName}
                  className="input w-full"
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="text"
                  placeholder={authUser.email}
                  className="input w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col justify-center mt-5">
                <button
                  type="submit"
                  className="btn bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
