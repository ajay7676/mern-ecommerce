import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "../../../hooks/mutations/user/useUpdateProfile";
import { profileSchema } from "../../../schemas/profile.schema";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  console.log(isOpen);
  const updateProfileMutation = useUpdateProfile();
  const isSaving = updateProfileMutation.isPending;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
    },
  });
  useEffect(() => {
    if (!user || !isOpen) return;

    reset({
      name: user.name ?? "",
      phone: user.phone ?? "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
      gender: user.gender ?? "",
    });
  }, [user, isOpen, reset]);

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      phone: values.phone || null,
      dateOfBirth: values.dateOfBirth || null,
      gender: values.gender || null,
    };

    try {
      await updateProfileMutation.mutateAsync(payload);

      toast.success("Profile updated successfully");

      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleClose = () => {
  if (isSaving) return;

  reset();
  onClose();
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-2xl rounded-2xl bg-base-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              Update your personal information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close edit profile modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          {/* Avatar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                  alt={user?.name || "User"}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Profile Photo</h3>

              <p className="text-sm text-base-content/60">Your profile photo</p>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div className="form-control md:col-span-2">
              <label htmlFor="name" className="label">
                <span className="label-text font-medium">Name</span>
              </label>

              <input 
              id="name"
               type="text"
                className="input input-bordered w-full"
                {...register("name")} />

              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control md:col-span-2">
              <label htmlFor="email" className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                value={user?.email ?? ""}
                disabled
                className="input input-bordered w-full cursor-not-allowed bg-base-200"
              />

              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Email address cannot be changed here.
                </span>
              </label>
            </div>

            {/* Phone */}
            <div className="form-control">
              <label htmlFor="phone" className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter phone number"
                maxLength={10}
                {...register("phone")}
                inputMode="numeric"
                className="input input-bordered w-full"
              />
              {errors.phone && (
                <p className="text-error">{errors.phone.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-control">
              <label htmlFor="dateOfBirth" className="label">
                <span className="label-text font-medium">Date of Birth</span>
              </label>

              <input
                id="dateOfBirth"
                type="date"
                className="input input-bordered w-full"
                {...register("dateOfBirth")}
              />

              {errors.dateOfBirth && (
                <p className="text-error">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="form-control">
              <label htmlFor="gender" className="label">
                <span className="label-text font-medium">Gender</span>
              </label>
              <div className="w-full">
                   <select id="gender"
                    className="input input-bordered w-full"
                    {...register("gender")}
                    >
                <option value="">Select gender</option>

                <option value="male">Male</option>

                <option value="female">Female</option>

                <option value="other">Other</option>
              </select>
              </div>
              {errors.gender && (
                <p className="text-error">{errors.gender.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-base-300 px-6 py-4">
          <button
            type="button"
            disabled={isSaving}
            onClick={handleClose}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
