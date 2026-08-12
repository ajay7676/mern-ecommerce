import { useState } from "react";
import { FiX } from "react-icons/fi";

import UserForm from "../UserForm";

import useCreateUser from "../../../../../hooks/admin/mutations/users/useCreateUser";

import { validateUser } from "../../../../../utils/userValidation";

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  role: "user",
  password: "",
};

const AddNewUserModal = ({ open, onClose }) => {
  const [values, setValues] = useState(INITIAL_VALUES);

  const [errors, setErrors] = useState({});

  const { mutateAsync, isPending } = useCreateUser();

  if (!open) {
    return null;
  }

  const handleChange = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateUser(values, {
      requirePassword: true,
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      await mutateAsync(values);

      setValues(INITIAL_VALUES);

      onClose();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
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
        bg-slate-950/40
        p-4
        backdrop-blur-[1px]
      "
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-175
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        <header
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New User</h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new user and assign their access role.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              hover:bg-slate-100
            "
          >
            <FiX size={20} />
          </button>
        </header>

        <div className="p-6">
          <UserForm
            values={values}
            errors={errors}
            onChange={handleChange}
            disabled={isPending}
          />

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Temporary Password
            </label>

            <input
              type="password"
              value={values.password}
              onChange={(event) => handleChange("password", event.target.value)}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-slate-200
                px-3
                outline-none
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-100
              "
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        <footer
          className="
            flex
            justify-end
            gap-3
            border-t
            border-slate-200
            bg-slate-50
            px-6
            py-4
          "
        >
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="
              h-10
              rounded-lg
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="
              h-10
              rounded-lg
              bg-violet-600
              px-5
              text-sm
              font-semibold
              text-white
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
