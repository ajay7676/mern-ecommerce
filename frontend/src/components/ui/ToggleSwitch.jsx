const ToggleSwitch = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <span className="sr-only">{label}</span>

      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />

      <span
        className="
          relative h-6 w-10.5 rounded-full bg-slate-300
          transition-colors duration-200
          after:absolute after:left-[3px] after:top-[3px]
          after:h-[18px] after:w-[18px] after:rounded-full
          after:bg-white after:shadow-sm after:transition-transform
          peer-checked:bg-indigo-600
          peer-checked:after:translate-x-[18px]
          peer-focus-visible:outline
          peer-focus-visible:outline-2
          peer-focus-visible:outline-offset-2
          peer-focus-visible:outline-indigo-500
          peer-disabled:cursor-not-allowed
          peer-disabled:opacity-50
        "
      />
    </label>
  );
};

export default ToggleSwitch;