import ToggleSwitch from './../ui/ToggleSwitch'

const PreferenceItem = ({
  title,
  description,
  checked,
  onChange,
  showDivider = true,
}) => {
  return (
    <div
      className={`
        flex items-center justify-between gap-5 py-5
        ${showDivider ? "border-b border-slate-200" : ""}
      `}
    >
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-slate-700">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <ToggleSwitch
        checked={checked}
        onChange={onChange}
        label={title}
      />
    </div>
  );
};

export default PreferenceItem;