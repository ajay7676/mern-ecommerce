import { useId } from "react";

const InventorySwitch = ({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className={`mb-2 block text-xs font-semibold text-slate-800 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {title}
      </label>

      <input
        id={inputId}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => onChange(event.target.checked)}
        className="toggle toggle-sm border-slate-300 bg-slate-200
                   checked:border-violet-600 checked:bg-violet-600
                   disabled:cursor-not-allowed disabled:opacity-50"
      />

      <p
        id={descriptionId}
        className="mt-1 text-[11px] leading-4 text-slate-500"
      >
        {description}
      </p>
    </div>
  );
};

const InventorySwitches = ({
  trackInventory = true,
  allowBackorder = false,
  disabled = false,
  onTrackInventoryChange,
  onAllowBackorderChange,
}) => {
  return (
    <div className="grid gap-5 sm:col-span-2 sm:grid-cols-2 lg:col-span-2">
      <InventorySwitch
        title="Track Inventory"
        description="Enable to track stock quantity"
        checked={trackInventory}
        disabled={disabled}
        onChange={onTrackInventoryChange}
      />

      <InventorySwitch
        title="Allow Backorders"
        description="Allow selling when out of stock"
        checked={allowBackorder}
        disabled={disabled || !trackInventory}
        onChange={onAllowBackorderChange}
      />
    </div>
  );
};

export default InventorySwitches;