import { useEffect, useState } from "react";

import BasicInformationSection from "../add-new/BasicInformationSection";
import AccountInformationSection from "../add-new/AccountInformationSection";
import AdditionalInformationSection from "../add-new/AdditionalInformationSection";
import UserPreview from "../add-new/UserPreview";
import AssignedPermissions from "../add-new/AssignedPermissions";

import useAdminUser from "../../../../../hooks/admin/queries/users/useAdminUser";
import useUpdateUser from "../../../../../hooks/admin/mutations/users/useUpdateUser";

import { getEditUserInitialValues } from "./editUser.helpers";
import { FiX } from "react-icons/fi";
import { validateEditUser } from "../../../../../utils/userEditValidation";
import buildPayload from "./buildPayload";

const EditUserModal = ({ open, userId, onClose }) => {
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: user, isLoading, isError } = useAdminUser(userId, open);

  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setValues(getEditUserInitialValues(user?.data?.user));
    }
  }, [user]);

  if (!open) {
    return null;
  }

  if (isLoading || !values) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50">
        <div className="rounded-xl bg-white p-6">Loading user...</div>
      </div>
    );
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

  const handleServerError = (error) => {
    const message = error?.response?.data?.message || "Failed to update user";

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

      return;
    }

    if (lowerMessage.includes("role")) {
      setErrors((current) => ({
        ...current,
        role: message,
      }));

      return;
    }

    if (lowerMessage.includes("status") || lowerMessage.includes("block")) {
      setErrors((current) => ({
        ...current,
        status: message,
      }));
    }
  };

  const handleSubmit = async () => {
    event.preventDefault();
    const validationErrors = validateEditUser(values);

    if (values.password || values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = buildPayload(values);
    try {
      await updateUser({
        userId,
        payload,
      });

      onClose();
    } catch (error) {
      handleServerError(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden
        rounded-2xl bg-slate-50"
      >
        {/* header */}
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
              Edit User
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Edit user and configure their account.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
            <main className="space-y-5">
              <BasicInformationSection
                values={values}
                errors={errors}
                onChange={handleChange}
                disabled={isPending}
                 mode="edit"
              />

              <AccountInformationSection
                values={values}
                errors={errors}
                onChange={handleChange}
                disabled={isPending}
                isEdit
              />

              <AdditionalInformationSection
                values={values}
                errors={errors}
                onChange={handleChange}
                onAddressChange={handleAddressChange}
                disabled={isPending}
              />
            </main>

            <aside className="space-y-5">
              <UserPreview values={values} />

              <AssignedPermissions role={values.role} />
            </aside>
          </div>
        </div>

        {/* footer */}
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
            onClick={onClose}
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
               cursor-pointer
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending || isError}
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
               cursor-pointer
              hover:bg-violet-700
              focus:outline-none
              focus:ring-2
              focus:ring-violet-400
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isPending ? "Updating..." : "Update User"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EditUserModal;
