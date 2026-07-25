import PasswordField from "../ui/PasswordField";

const ChangePasswordCard = ({
  form,
  errors,
  isUpdating,
  onChange,
  onSubmit,
}) => {
  return (
    <section
      className="
        rounded-xl border border-slate-200
        bg-white p-5
        shadow-[0_4px_18px_rgba(15,23,42,0.035)]
        sm:p-6
      "
    >
      <h2 className="text-base font-semibold text-slate-950">
        Change Password
      </h2>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Update your password regularly to keep your account secure.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-5"
        noValidate
      >
        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          value={form.currentPassword}
          placeholder="Enter current password"
          error={errors.currentPassword}
          onChange={onChange}
        />

        <PasswordField
          id="newPassword"
          name="newPassword"
          label="New Password"
          value={form.newPassword}
          placeholder="Enter new password"
          error={errors.newPassword}
          onChange={onChange}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          value={form.confirmPassword}
          placeholder="Confirm new password"
          error={errors.confirmPassword}
          onChange={onChange}
        />

        <button
          type="submit"
          disabled={isUpdating}
          className="
            btn h-11 min-h-11 rounded-md
            border-indigo-400 bg-white px-6
            text-sm font-medium text-indigo-600
            shadow-none hover:border-indigo-600
            hover:bg-indigo-50
          "
        >
          {isUpdating && (
            <span className="loading loading-spinner loading-sm" />
          )}

          Update Password
        </button>
      </form>
    </section>
  );
};

export default ChangePasswordCard;