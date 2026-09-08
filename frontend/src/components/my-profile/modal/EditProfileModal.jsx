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
    setError,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const formatDateForInput = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toISOString().split("T")[0];
  };
  useEffect(() => {
    if (!user || !isOpen) return;

    reset({
      name: user.name ?? "",
      phone: user.phone ?? "",
      dateOfBirth: formatDateForInput(user.dateOfBirth),
      gender: user.gender ?? "",
    });
  }, [user, isOpen, reset]);

  const onSubmit = async (values) => {
    try {
      const payload = {
        name: values.name.trim(),
        phone: values.phone.trim() || null,
        dateOfBirth: values.dateOfBirth || null,
        gender: values.gender || null,
      };

      await updateProfileMutation.mutateAsync(payload);

      toast.success("Profile updated successfully");

      handleClose();
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;

      if (apiErrors) {
        Object.entries(apiErrors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message,
          });
        });

        return;
      }

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
                    src={
                      user?.avatar || "https://ui-avatars.com/api/?name=User"
                    }
                    alt={user?.name || "User"}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Profile Photo</h3>

                <p className="text-sm text-base-content/60">
                  Your profile photo
                </p>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>

                <input
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />

                <p className="mt-1 text-xs text-base-content/50">
                  Email address cannot be changed here.
                </p>
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter phone number"
                  {...register("phone")}
                  className={`input input-bordered w-full ${
                    errors.phone ? "input-error" : ""
                  }`}
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-error">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Date of Birth</span>
                </label>

                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("dateOfBirth")}
                  className={`input input-bordered w-full ${
                    errors.dateOfBirth ? "input-error" : ""
                  }`}
                />

                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-error">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>

                <select
                  {...register("gender")}
                  className={`select select-bordered w-full ${
                    errors.gender ? "select-error" : ""
                  }`}
                >
                  <option value="">Select gender</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>

                  <option value="other">Other</option>
                </select>

                {errors.gender && (
                  <p className="mt-1 text-sm text-error">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-base-300 px-6 py-4">
            <button
              type="button"
              disabled={updateProfileMutation.isPending}
              onClick={handleClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateProfileMutation.isPending || !isDirty}
              className="btn btn-primary"
            >
              {updateProfileMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
