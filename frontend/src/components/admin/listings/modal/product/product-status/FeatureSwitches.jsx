import { useId } from "react";

const FeatureSwitch = ({
  name,
  title,
  description,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;

  const isDisabled = Boolean(disabled);

  return (
    <div className="flex items-start gap-3">
      <input
        id={inputId}
        name={name}
        type="checkbox"
        role="switch"
        checked={Boolean(checked)}
        disabled={isDisabled}
        aria-describedby={descriptionId}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="toggle toggle-sm mt-0.5 shrink-0
                   border-slate-300 bg-slate-200
                   checked:border-violet-600
                   checked:bg-violet-600
                   disabled:cursor-not-allowed
                   disabled:opacity-50"
      />

      <div>
        <label
          htmlFor={inputId}
          className={`block text-xs font-semibold text-slate-800 ${
            isDisabled
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {title}
        </label>

        <p
          id={descriptionId}
          className="mt-0.5 text-[11px] leading-4 text-slate-500"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const FeatureSwitches = ({
  isFeatured = false,
  isNewArrival = false,
  isBestSeller = false,
  disabled = false,
  onChange,
}) => {
  return (
    <fieldset className="space-y-3.5">
      <legend className="sr-only">
        Product feature settings
      </legend>

      <FeatureSwitch
        name="isFeatured"
        title="Featured Product"
        description="Show this product in featured sections"
        checked={isFeatured}
        disabled={disabled}
        onChange={(checked) =>
          onChange("isFeatured", checked)
        }
      />

      <FeatureSwitch
        name="isNewArrival"
        title="New Arrival"
        description="Mark as new arrival"
        checked={isNewArrival}
        disabled={disabled}
        onChange={(checked) =>
          onChange("isNewArrival", checked)
        }
      />

      <FeatureSwitch
        name="isBestSeller"
        title="Best Seller"
        description="Mark as best seller"
        checked={isBestSeller}
        disabled={disabled}
        onChange={(checked) =>
          onChange("isBestSeller", checked)
        }
      />
    </fieldset>
  );
};

export default FeatureSwitches;