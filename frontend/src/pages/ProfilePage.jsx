import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, UserRoundPen } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.image[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    setSelectedImage(URL.createObjectURL(file));
    await updateProfile(formData);
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
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
            <div className="rounded-md outline-2 outline-fuchsia-200 p-3 text-center">
              <label htmlFor="profile-upload" className="label">
                <div className="relative">
                  <Camera className="absolute bottom-5 w-10 h-10 p-2 right-10 rounded-full bg-gray-600" />
                  <img
                    src={selectedImage || authUser.profilePic || "/avatar.png"}
                    className="size-64 rounded-full object-cover border-3 "
                    alt="avatar"
                  />
                </div>
                <input
                  {...register("image", {
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onloadend = () => setSelectedImage(reader.result); // update preview
                      reader.readAsDataURL(file);
                    },
                  })}
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>
            <div className="space-y-3">
              <div>
                <label className="label">
                  <User />
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="input w-full">{authUser?.fullName}</div>
              </div>
              <div>
                <label className="label">
                  <Mail />
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="input w-full">{authUser?.email}</div>
              </div>
              <div className="flex flex-col justify-center mt-5">
                <button
                  type="submit"
                  className="btn bg-purple-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
