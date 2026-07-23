
const SizeSelector = ({
  options = [],
  selectedValue,
  onChange,
  isOptionDisabled,
}) => {
     if (options.length === 0) {
    return null;
  }
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-3">
        <p className="text-sm font-bold text-slate-700">Size:</p>
        <button className="text-sm text-indigo-600 font-semibold">Size Guide</button>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Select size"
      >
        {options.map((option) => {
          const selected =
            selectedValue ===
            option.value;

          const disabled =
            isOptionDisabled(
              "size",
              option.value
            );

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() =>
                onChange(
                  "size",
                  option.value
                )
              }
              className={[
                "min-w-12 rounded-lg border px-4 py-2 text-sm font-medium transition",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selected
                  ? "border-primary bg-primary text-white cursor-pointer"
                  : "border-slate-300 bg-white text-slate-700 cursor-pointer",
                disabled
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 opacity-60 line-through"
                  : "hover:border-primary",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;