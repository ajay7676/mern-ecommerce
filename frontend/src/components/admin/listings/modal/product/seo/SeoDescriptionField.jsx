import { SEO_DESCRIPTION_MAX_LENGTH } from "../../../../../../constants/admin/products/product.constants";

const SeoDescriptionField = ({
  value = "",
  error = "",
  onChange,
  disabled = false,
  maxLength = SEO_DESCRIPTION_MAX_LENGTH,
}) => {
  const safeValue = typeof value === "string" ? value : "";
  const characterCount = safeValue.length;

  return (
    <div>
      <label
        htmlFor="seoDescription"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        SEO Description
      </label>

      <div className="relative">
        <textarea
          id="seoDescription"
          name="seoDescription"
          value={safeValue}
          rows={3}
          maxLength={maxLength}
          disabled={disabled}
          placeholder="Write a short description for search engines"
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "seo-description-error" : undefined}
          className={`w-full resize-none rounded-lg border bg-white px-3 py-2.5
            pb-8 text-sm leading-6 text-slate-800 outline-none transition
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
          className={`absolute bottom-3 right-3 text-xs
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
        <p id="seo-description-error" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SeoDescriptionField;