import { useEffect, useState } from "react";

import { FiX } from "react-icons/fi";

import useCreateUser from "../../../../../hooks/admin/mutations/users/useCreateUser";

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

  const handleClose = () => {
    if (isPending) {
      return;
    }

    setValues(INITIAL_USER_VALUES);

    setErrors({});

    onClose();
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

    /*
     * Remove the error immediately
     * when user starts fixing the field.
     */
    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


     console.log("Create User button Clicked")


    const validationErrors = validateUser(values, {
      requirePassword: true,
    });

    /*
     * Confirm password validation
     */
    if (values.password !== values.confirmPassword) {
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
      address: values.address.trim(),
    };

    try {
      await mutateAsync(payload);

      setValues(INITIAL_USER_VALUES);

      setErrors({});

      onClose();
    } catch (error) {
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

   console.log(values);
   console.log(errors)

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
                disabled={isPending}
              />
            </main>

            {/* RIGHT SIDE */}

            <aside className="space-y-5">
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
            disabled={isPending}
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
