import ToggleSwitch from "../ui/ToggleSwitch";

const EmailPreferenceItem = ({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <article
      className="
        flex items-center justify-between
        gap-5 py-3
      "
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-full bg-indigo-50
            text-indigo-600
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <ToggleSwitch
        checked={checked}
        label={title}
        onChange={onChange}
      />
    </article>
  );
};

export default EmailPreferenceItem;