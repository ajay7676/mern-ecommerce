import { useId } from "react";
import { DIMENSION_UNITS } from "../../../../../../constants/admin/products/product.constants";


const DimensionFields = ({
  values = {},
  error = "",
  disabled = false,
  onChange,
  onUnitChange,
}) => {
  const groupId = useId();
  const errorId = `${groupId}-error`;
  const dimensions = [
    {
      name: "length",
      label: "Product length",
      placeholder: "Length",
    },
    {
      name: "width",
      label: "Product width",
      placeholder: "Width",
    },
    {
      name: "height",
      label: "Product height",
      placeholder: "Height",
    },
  ];

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="mb-2 text-xs font-semibold text-slate-800">
        Dimensions (L × W × H)
      </legend>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(3,minmax(0,1fr))_72px]">
        {dimensions.map((dimension) => (
          <input
            key={dimension.name}
            name={`dimensions.${dimension.name}`}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={values[dimension.name] ?? ""}
            disabled={disabled}
            placeholder={dimension.placeholder}
            aria-label={dimension.label}
            aria-invalid={Boolean(error)}
            onChange={(event) =>
              onChange(
                dimension.name,
                event.target.value
              )
            }
            onWheel={(event) =>
              event.currentTarget.blur()
            }
            className={`input h-10 w-full rounded-md border bg-white px-3
                        text-sm outline-none transition
                        focus:border-violet-500 focus:ring-2 focus:ring-violet-100
                        disabled:cursor-not-allowed disabled:bg-slate-100 ${
                          error
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
          />
        ))}

        <select
          name="dimensions.unit"
          value={values.unit ?? "cm"}
          disabled={disabled}
          aria-label="Dimension unit"
          onChange={(event) =>
            onUnitChange(event.target.value)
          }
          className="select h-10 min-h-10 w-full rounded-md
                     border border-slate-200 bg-white px-2
                     text-sm font-medium outline-none
                     focus:border-violet-500 focus:ring-2 focus:ring-violet-100
                     disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          {DIMENSION_UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default DimensionFields;