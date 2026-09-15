
const toPlainObject = (document) => {
  if (!document) return null;
  return typeof document.toObject === "function" ? document.toObject() : document;
};

export const mapAdminCreatedProductResponse = ({ product, variants }) => {
  const plainProduct = toPlainObject(product);

  return {
    id: plainProduct._id,
    name: plainProduct.name,
    slug: plainProduct.slug,
    productType: plainProduct.productType,

    sku: plainProduct.inventory?.sku,
    status: plainProduct.status,

    category: plainProduct.category,
    subCategory: plainProduct.subCategory,
    brand: plainProduct.brand,

    pricing: plainProduct.pricing,
    inventory: plainProduct.inventory,

    images: plainProduct.images || [],
    videoUrl: plainProduct.videoUrl,

    attributes: plainProduct.attributes || [],

    variantCount: variants?.length || 0,

    variants: (variants || []).map((variant) => {
      const plainVariant = toPlainObject(variant);

      return {
        id: plainVariant._id,
        product: plainVariant.product,
        name: plainVariant.name,
        sku: plainVariant.sku,
        price: plainVariant.price,
        stock: plainVariant.stock,
        status: plainVariant.status,
        source: plainVariant.source,
        image: plainVariant.image,
        images: plainVariant.images || [],
        attributes: plainVariant.attributes || [],
        optionSignature: plainVariant.optionSignature,
        sortOrder: plainVariant.sortOrder,
      };
    }),

    visibility: plainProduct.visibility,
    publishOption: plainProduct.publishOption,
    scheduledAt: plainProduct.scheduledAt,
    publishedAt: plainProduct.publishedAt,

    createdBy: plainProduct.createdBy,
    createdAt: plainProduct.createdAt,
    updatedAt: plainProduct.updatedAt,
  };
};