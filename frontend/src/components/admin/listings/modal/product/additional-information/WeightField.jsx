import { useId } from "react";
import { WEIGHT_UNITS } from "../../../../../../constants/admin/products/product.constants";


const WeightField = ({
  value = "",
  unit = "kg",
  error = "",
  disabled = false,
  onValueChange,
  onUnitChange,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-semibold text-slate-800"
      >
        Weight
      </label>

      <div className="flex">
        <input
          id={inputId}
          name="weight"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={value}
          disabled={disabled}
          placeholder="Enter weight"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onValueChange(event.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
          className={`input h-10 min-w-0 flex-1 rounded-r-none border bg-white px-3
                      text-sm outline-none transition
                      focus:z-10 focus:border-violet-500 focus:ring-2 focus:ring-violet-100
                      disabled:cursor-not-allowed disabled:bg-slate-100 ${
                        error ? "border-red-400" : "border-slate-200"
                      }`}
        />

        <select
          name="weightUnit"
          value={unit}
          disabled={disabled}
          aria-label="Weight unit"
          onChange={(event) => onUnitChange(event.target.value)}
          className="select h-10 min-h-10 w-20 rounded-l-none
                     border border-l-0 border-slate-200 bg-white px-3
                     text-sm font-medium outline-none
                     focus:z-10 focus:border-violet-500
                     disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          {WEIGHT_UNITS.map((weightUnit) => (
            <option key={weightUnit} value={weightUnit}>
              {weightUnit}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default WeightField;
