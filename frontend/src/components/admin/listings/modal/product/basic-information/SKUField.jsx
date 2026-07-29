const SKU_MAX_LENGTH = 80;

const SKUField = ({
  value = "",
  error = "",
  disabled = false,
  onChange,
}) => {
  const handleChange = (event) => {
    const normalizedValue = event.target.value
      .toUpperCase()
      .replace(/\s+/g, "-")
      .replace(/[^A-Z0-9-_]/g, "");

    onChange?.(normalizedValue);
  };

  return (
    <div>
      <label
        htmlFor="product-sku"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        SKU
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> required</span>
      </label>

      <input
        id="product-sku"
        name="sku"
        type="text"
        value={value}
        maxLength={SKU_MAX_LENGTH}
        disabled={disabled}
        required
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="ADIDAS-MEN-TSHIRT-001"
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? "product-sku-error" : "product-sku-helper"
        }
        onChange={handleChange}
        className={`
          h-12 w-full rounded-lg border bg-white
          px-3 text-sm uppercase text-slate-800
          outline-none transition
          placeholder:text-slate-400
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:text-slate-500
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          }
        `}
      />

      {error ? (
        <p
          id="product-sku-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      ) : (
        <p
          id="product-sku-helper"
          className="mt-1.5 text-xs text-slate-500"
        >
          Unique Stock Keeping Unit
        </p>
      )}
    </div>
  );
};

export default SKUField;