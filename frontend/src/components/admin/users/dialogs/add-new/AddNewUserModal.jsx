import { useEffect, useState } from "react";

import { FiX } from "react-icons/fi";

import useCreateUser from "../../../../../hooks/admin/mutations/users/useCreateUser";
import useDeleteTemporaryUserAvatar from "../../../../../hooks/admin/mutations/users/useDeleteTemporaryUserAvatar";

import { validateUser } from "../../../../../utils/userValidation";

import { INITIAL_USER_VALUES } from "./userForm.constants";

import BasicInformationSection from "./BasicInformationSection";
import AccountInformationSection from "./AccountInformationSection";
import AdditionalInformationSection from "./AdditionalInformationSection";
import UserPreview from "./UserPreview";
import AssignedPermissions from "./AssignedPermissions";

const AddNewUserModal = ({ open, onClose }) => {
  const [values, setValues] = useState(INITIAL_USER_VALUES);

  const [errors, setErrors] = useState({});

  const { mutateAsync, isPending } = useCreateUser();

  const { mutateAsync: deleteTemporaryAvatar, isPending: isDeletingAvatar } =
    useDeleteTemporaryUserAvatar();

  /*
   * Prevent background page scrolling
   * while modal is open.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleClose = async () => {
    if (isPending || isDeletingAvatar) {
      return;
    }

    try {
      if (values.profileImage?.publicId) {
        await deleteTemporaryAvatar(values.profileImage.publicId);
      }
    } catch (error) {
      console.error("Failed to cleanup temporary avatar:", error);
    } finally {
      setValues(INITIAL_USER_VALUES);

      setErrors({});

      onClose();
    }
  };

  /*
   * Close modal using Escape key.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isPending) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isPending]);

  if (!open) {
    return null;
  }

  const handleChange = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      const nextErrors = {
        ...current,
        [name]: undefined,
      };

      if (name === "password" || name === "confirmPassword") {
        nextErrors.confirmPassword = undefined;
      }

      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateUser(values, {
      requirePassword: true,
    });

    /*
     * Confirm password validation
     */
    if (!values.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm the password";
    } else if (values.password !== values.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    /*
     * Don't send frontend-only fields.
     */
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),

      role: values.role,
      status: values.status,

      password: values.password,

      department: values.department.trim(),
      designation: values.designation.trim(),

      address: {
        street: values.address.street.trim(),
        city: values.address.city.trim(),
        state: values.address.state.trim(),
        country: values.address.country.trim() || "India",
        pinCode: values.address.pinCode.trim(),
      },

      avatar: values.profileImage
        ? {
            url: values.profileImage.url,
            publicId: values.profileImage.publicId,
          }
        : null,
    };

    try {
      await mutateAsync(payload);

      setValues(INITIAL_USER_VALUES);

      setErrors({});

      onClose();
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to create user";

      /*
       * Cleanup temporary avatar
       * because user creation failed.
       */
      if (values.profileImage?.publicId) {
        try {
          await deleteTemporaryAvatar(values.profileImage.publicId);

          setValues((current) => ({
            ...current,
            profileImage: null,
          }));
        } catch (cleanupError) {
          console.error("Temporary avatar cleanup failed:", cleanupError);
        }
      }

      handleServerError(error);
    }
  };

  const handleServerError = (error) => {
    const message = error?.response?.data?.message || "Unable to create user";

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("email")) {
      setErrors((current) => ({
        ...current,
        email: message,
      }));

      return;
    }

    if (lowerMessage.includes("phone")) {
      setErrors((current) => ({
        ...current,
        phone: message,
      }));

      return;
    }

    if (lowerMessage.includes("password")) {
      setErrors((current) => ({
        ...current,
        password: message,
      }));
    }
  };

  const handleAddressChange = (name, value) => {
    setValues((current) => ({
      ...current,

      address: {
        ...current.address,

        [name]: value,
      },
    }));

    setErrors((current) => ({
      ...current,

      address: {
        ...current.address,

        [name]: undefined,
      },
    }));
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-3
        backdrop-blur-[2px]
        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-user-title"
    >
      <form
        onSubmit={handleSubmit}
        className="
          flex
          max-h-[94vh]
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-[#f8fafc]
          shadow-2xl
        "
      >
        {/* HEADER */}

        <header
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-5
            py-4
            sm:px-7
          "
        >
          <div>
            <h2
              id="add-user-title"
              className="
                text-xl
                font-bold
                text-slate-900
                sm:text-2xl
              "
            >
              Add New User
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new user and configure their account.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            aria-label="Close modal"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:bg-slate-50
              hover:text-slate-900
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FiX size={20} />
          </button>
        </header>

        {/* BODY */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
          "
        >
          <div
            className="
              grid
              gap-5
              xl:grid-cols-[minmax(0,1fr)_330px]
            "
          >
            {/* LEFT SIDE */}

            <main className="space-y-5">
              <BasicInformationSection
                values={values}
                errors={errors}
                onChange={handleChange}
                disabled={isPending}
              />

              <AccountInformationSection
                values={values}
                errors={errors}
                onChange={handleChange}
                disabled={isPending}
              />

              <AdditionalInformationSection
                values={values}
                errors={errors}
                onChange={handleChange}
                onAddressChange={handleAddressChange}
                disabled={isPending}
              />
            </main>

            {/* RIGHT SIDE */}

            <aside
              className="
              space-y-5
              xl:sticky
              xl:top-0
              xl:self-start
            "
            >
              <UserPreview values={values} />

              <AssignedPermissions role={values.role} />
            </aside>
          </div>
        </div>

        {/* FOOTER */}

        <footer
          className="
            flex
            shrink-0
            justify-end
            gap-3
            border-t
            border-slate-200
            bg-white
            px-5
            py-4
            sm:px-7
          "
        >
          <button
            type="button"
            disabled={isPending || isDeletingAvatar}
            onClick={handleClose}
            className="
              h-11
              rounded-lg
              border
              border-slate-300
              bg-white
              px-6
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="
              h-11
              min-w-32
              rounded-lg
              bg-violet-600
              px-6
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-violet-700
              focus:outline-none
              focus:ring-2
              focus:ring-violet-400
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isPending ? "Creating..." : "Create User"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default AddNewUserModal;
