const PRODUCT_NAME_MAX_LENGTH = 120;


const ProductNameField = ({
  value = "",
  error = "",
  disabled = false,
  onChange,
}) => {
  const handleChange  = (event) => {
     onChange?.(event.target.value);
     console.log(event.target.value);

  }

  const isNearLimit = value.length >= PRODUCT_NAME_MAX_LENGTH * 90;

  
  return (
    <div>
      <label
        htmlFor="product-name"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Product Name
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> required</span>
      </label>

      <div className="relative">
        <input
          id="product-name"
          name="name"
          type="text"
          value={value}
          maxLength={PRODUCT_NAME_MAX_LENGTH}
          disabled={disabled}
          required
          autoComplete="off"
          placeholder="Enter product name"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "product-name-error" : undefined
          }
          onChange={handleChange}
          className={`
            h-12 w-full rounded-lg border bg-white
            px-3 pr-20 text-sm text-slate-800
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

        <span
          className={`
            pointer-events-none absolute right-3 top-1/2
            -translate-y-1/2 text-xs font-medium
            ${isNearLimit ? "text-amber-600" : "text-slate-400"}
          `}
        >
          {value.length}/{PRODUCT_NAME_MAX_LENGTH}
        </span>
      </div>

      {error && (
        <p
          id="product-name-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default ProductNameField