import clsx from "clsx";

const ProfileField = ({
  id,
  label,
  value,
  className = "",
  type = "text",
  readOnly
}) => {
  return (
    <div className={clsx("min-w-0", className)}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium text-slate-500"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        readOnly={readOnly}
        className="
          h-10 w-full rounded-md border border-slate-200
          bg-white px-3 text-sm text-slate-700
          outline-none transition-colors
          focus:border-indigo-400 focus:ring-2
          focus:ring-indigo-100
        "
      />
    </div>
  );
};

export default ProfileField;