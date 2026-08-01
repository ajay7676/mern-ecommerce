import { SEO_TITLE_MAX_LENGTH } from "../../../../../../constants/admin/products/product.constants";

const SeoTitleField = ({
  value = "",
  error = "",
  onChange,
  disabled = false,
  maxLength = SEO_TITLE_MAX_LENGTH,
}) => {
  const safeValue = typeof value === "string" ? value : "";
  const characterCount = safeValue.length;

  return (
    <div>
      <label
        htmlFor="seoTitle"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        SEO Title
      </label>

      <div className="relative">
        <input
          id="seoTitle"
          name="seoTitle"
          type="text"
          value={safeValue}
          maxLength={maxLength}
          disabled={disabled}
          placeholder="Enter SEO title"
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "seo-title-error" : undefined}
          className={`h-11 w-full rounded-lg border bg-white px-3 pr-20
            text-sm text-slate-800 outline-none transition
            placeholder:text-slate-400
            focus:border-violet-500 focus:ring-2 focus:ring-violet-100
            disabled:cursor-not-allowed disabled:bg-slate-100
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300"
            }`}
        />

        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs
            ${
              characterCount >= maxLength
                ? "font-semibold text-red-500"
                : "text-slate-400"
            }`}
        >
          {characterCount}/{maxLength}
        </span>
      </div>

      {error && (
        <p id="seo-title-error" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SeoTitleField;