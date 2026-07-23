
const ColorSelector = ({
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
      <p className="text-sm font-bold text-slate-700 mb-3">
        Color:{" "}
        {
          selectedValue  && (
            <span className="font-medium text-slate-600">

              {
                 options.find((option) =>  option.value === selectedValue)?.label
              }
            </span>

          )
        }
      </p>
      <div
        className="flex flex-wrap gap-3"
        role="radiogroup"
        aria-label="Select color"
      >
        {options.map((option) => {
          const selected =
            selectedValue ===
            option.value;

          const disabled =
            isOptionDisabled(
              "color",
              option.value
            );

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={option.label}
              disabled={disabled}
              onClick={() =>
                onChange(
                  "color",
                  option.value
                )
              }
              className={[
                "relative flex h-11 w-11 items-center justify-center rounded-full",
                "border-2 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selected
                  ? "border-primary"
                  : "border-slate-300 cursor-pointer",
                disabled
                  ? "cursor-not-allowed opacity-30"
                  : "hover:border-slate-500",
              ].join(" ")}
              title={option.label}
            >
              <span
                className="h-8 w-8 rounded-full border border-black/10"
                style={{
                  backgroundColor:
                    option.colorCode ??
                    option.value,
                }}
              />

              {selected && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
