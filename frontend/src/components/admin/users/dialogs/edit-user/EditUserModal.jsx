import { useEffect, useState } from "react";

import UserForm from "../UserForm";
import useUpdateUser from "../../../../../hooks/admin/mutations/users/useUpdateUser";
import { validateUser } from "../../../../../utils/userValidation";

const EditUserModal = ({ open, user, onClose }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const { mutateAsync, isPending } = useUpdateUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    setValues({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      role: user.role ?? "customer",
    });
  }, [user]);

  if (!open || !user) {
    return null;
  }

  const handleChange = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateUser(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    await mutateAsync({
      userId: user.id,
      payload: values,
    });

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        grid
        place-items-center
        bg-slate-950/40
        p-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-175
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900">Edit User</h2>

          <p className="mt-1 text-sm text-slate-500">
            Update user information and permissions.
          </p>
        </div>

        <div className="p-6">
          <UserForm
            values={values}
            errors={errors}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-slate-200
            px-6
            py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-10
              rounded-lg
              border
              border-slate-200
              px-5
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
              font-semibold
              text-white
              disabled:opacity-50
            "
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
