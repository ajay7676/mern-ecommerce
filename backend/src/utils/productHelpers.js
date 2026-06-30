export const normalizeVariants = (variants = []) => {
    if (!Array.isArray(variants) || variants.length === 0) {
       throw new Error("At least one product variant is required");
    }
    const skuSet = new Set();
    const normalizedVariants = variants.map((variant, index) => {
    if (!variant.sku) {
      throw new Error(`SKU is required for variant ${index + 1}`);
    }

    const sku = variant.sku.trim().toUpperCase();

    if (skuSet.has(sku)) {
      throw new Error(`Duplicate SKU found: ${sku}`);
    }

    skuSet.add(sku);

    if (!Array.isArray(variant.attributes) || variant.attributes.length === 0) {
      throw new Error(`Attributes are required for SKU: ${sku}`);
    }

    if (!variant.price && variant.price !== 0) {
      throw new Error(`Price is required for SKU: ${sku}`);
    }

    if (variant.discountPrice && variant.discountPrice >= variant.price) {
      throw new Error(`Discount price must be less than price for SKU: ${sku}`);
    }
    return {
        ...variant,
        sku,
        isDefault: variant.isDefault ?? index === 0,
        isActive: variant.isActive ?? true,
        };
    });
    const defaultVariants = normalizedVariants.filter((v) => v.isDefault);
    if (defaultVariants.length > 1) {
        throw new Error("Only one default variant is allowed");
    }

    if (defaultVariants.length === 0) {
        normalizedVariants[0].isDefault = true;
    }

    return normalizedVariants;
}