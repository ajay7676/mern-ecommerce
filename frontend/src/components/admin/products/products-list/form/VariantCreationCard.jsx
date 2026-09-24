const VariantCreationCard = ({
  attributes,
  variants,
  onGenerateVariants,
  isEditMode,
  hasPersistedVariants,
}) => {
  const possibleVariantCount = attributes.reduce(
    (total, attribute) => {
      const optionsCount =
        attribute.options?.length || 0;

      if (!optionsCount) return total;

      return total * optionsCount;
    },
    attributes.length ? 1 : 0
  );

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">
            Generate Variants
          </h3>

          <p className="mt-1 text-sm text-base-content/60">
            Variants will be generated from current
            selected attribute options.
          </p>
        </div>

        <span className="badge badge-ghost">
          {possibleVariantCount} possible
        </span>
      </div>

      {isEditMode && hasPersistedVariants && (
        <div className="mt-4 rounded-xl bg-warning/10 p-3 text-sm text-warning">
          Existing variants are protected. Safe regeneration
          will preserve variant SKU, price, stock and images.
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary btn-sm mt-4"
        disabled={!possibleVariantCount}
        onClick={onGenerateVariants}
      >
        Generate Variants ({possibleVariantCount})
      </button>
    </div>
  );
};

export default VariantCreationCard;