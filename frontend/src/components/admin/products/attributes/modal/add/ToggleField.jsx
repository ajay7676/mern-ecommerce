const ToggleField = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="toggle toggle-primary toggle-sm mt-1"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <span>
        <span className="block text-sm font-semibold text-slate-800">
          {label}
        </span>

        <span className="block text-xs text-slate-500">
          {description}
        </span>
      </span>
    </label>
  );
};

export default ToggleField;