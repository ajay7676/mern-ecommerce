import { LuBarcode } from "react-icons/lu";

const BARCODE_MAX_LENGTH = 32;

const BarcodeField = ({
  value = "",
  error = "",
  disabled = false,
  onChange,
}) => {
  const handleChange = (event) => {
    const normalizedValue = event.target.value.replace(
      /[^a-zA-Z0-9-]/g,
      "",
    );

    onChange?.(normalizedValue);
  };

  return (
    <div>
      <label
        htmlFor="product-barcode"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Barcode (ISBN, UPC, EAN)
      </label>

      <div className="relative">
        <input
          id="product-barcode"
          name="barcode"
          type="text"
          value={value}
          maxLength={BARCODE_MAX_LENGTH}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          placeholder="Enter barcode (optional)"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "product-barcode-error" : undefined
          }
          onChange={handleChange}
          className={`
            h-12 w-full rounded-lg border bg-white
            px-3 pr-12 text-sm text-slate-800
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

        <LuBarcode
          aria-hidden="true"
          className="
            pointer-events-none absolute
            right-3 top-1/2 h-5 w-5
            -translate-y-1/2 text-slate-500
          "
        />
      </div>

      {error && (
        <p
          id="product-barcode-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default BarcodeField;