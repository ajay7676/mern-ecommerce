import PasswordInput from "./PasswordInput";

const selectClass = `
  h-11
  w-full
  rounded-lg
  border
  border-slate-200
  bg-white
  px-3
  text-sm
  text-slate-800
  outline-none
  transition
  focus:border-violet-500
  focus:ring-2
  focus:ring-violet-100
  disabled:cursor-not-allowed
  disabled:bg-slate-50
  disabled:text-slate-500
`;

const AccountInformationSection = ({
  values,
  errors = {},
  onChange,
  disabled = false,
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <div>
        <h3 className="font-semibold text-slate-900">Account Information</h3>

        <p className="mt-1 text-sm text-slate-500">
          Set account credentials and status.
        </p>
      </div>

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-x-6
          gap-y-5
          md:grid-cols-2
        "
      >
        {/* ROLE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            name="role"
            value={values.role}
            onChange={(event) => onChange("role", event.target.value)}
            disabled={disabled}
            aria-invalid={Boolean(errors.role)}
            className={selectClass}
          >
            <option value="user">User</option>

            <option value="admin">Admin</option>
          </select>

          {errors.role && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.role}
            </p>
          )}
        </div>

        {/* STATUS */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            name="status"
            value={values.status}
            onChange={(event) => onChange("status", event.target.value)}
            disabled={disabled}
            aria-invalid={Boolean(errors.status)}
            className={selectClass}
          >
            <option value="active">Active</option>

            <option value="blocked">Blocked</option>

            <option value="pending">Pending</option>
          </select>

          {errors.status && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.status}
            </p>
          )}
        </div>

        {/* PASSWORD */}

        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
          placeholder="Enter password"
          disabled={disabled}
          required
        />

        {/* CONFIRM PASSWORD */}

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={onChange}
          placeholder="Confirm password"
          disabled={disabled}
          required
        />

        {/* PASSWORD HELP */}

        <div className="md:col-span-2">
          <p className="text-xs text-slate-500">
            Minimum 8 characters with uppercase, lowercase, number and symbol.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccountInformationSection;
