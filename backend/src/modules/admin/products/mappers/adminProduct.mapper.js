
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


const getStockStatus = (inventory = {}) => {
  const stockQuantity = Number(inventory.stockQuantity || 0);
  const lowStockThreshold = Number(inventory.lowStockThreshold || 0);

  if (stockQuantity <= 0) return "outOfStock";
  if (stockQuantity <= lowStockThreshold) return "lowStock";

  return "inStock";
}; 

export const mapAdminProductListItem = (product) => {
  return {
    id: product._id,
    name: product.name,
    slug: product.slug,
    productType: product.productType,
    shortDescription: product.shortDescription,

    sku: product.inventory?.sku,
    stockQuantity: product.inventory?.stockQuantity || 0,
    lowStockThreshold: product.inventory?.lowStockThreshold || 0,
    stockStatus: getStockStatus(product.inventory),

    sellingPrice: product.pricing?.sellingPrice || 0,
    finalPrice: product.pricing?.finalPrice || 0,
    mrp: product.pricing?.mrp || null,
    discountType: product.pricing?.discountType || "none",
    discountValue: product.pricing?.discountValue || 0,

    image: product.primaryImage || product.images?.[0] || null,

    status: product.status,
    variantCount: product.variantCount || 0,

    category: product.category?._id
      ? {
          id: product.category._id,
          name: product.category.name,
          slug: product.category.slug,
        }
      : null,

    subCategory: product.subCategory?._id
      ? {
          id: product.subCategory._id,
          name: product.subCategory.name,
          slug: product.subCategory.slug,
        }
      : null,

    brand: product.brand?._id
      ? {
          id: product.brand._id,
          name: product.brand.name,
          slug: product.brand.slug,
          logo: product.brand.logo || null,
        }
      : null,

    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const mapAdminProductListResponse = ({
  products,
  totalProducts,
  page,
  limit,
}) => {
  const totalPages = Math.ceil(totalProducts / limit) || 1;

  return {
    products: products.map(mapAdminProductListItem),

    pagination: {
      page,
      limit,
      totalProducts,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

// View Product Data Mappper

const mapProductRef = (item) => {
  if (!item?._id) return null;

  return {
    id: item._id,
    name: item.name,
    slug: item.slug,
    status: item.status,
    logo: item.logo || null,
  };
};

const mapProductImage = (image) => {
  return {
    publicId: image.publicId,
    url: image.url,
    altText: image.altText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: image.sortOrder || 1,
  };
};

const mapVariantImage = (image) => {
  if (!image?.publicId && !image?.url) return null;

  return {
    publicId: image.publicId || null,
    url: image.url || null,
  };
};

export const mapAdminProductVariantDetail = (variant) => {
  return {
    id: variant._id,
    product: variant.product,

    name: variant.name,
    sku: variant.sku,

    price: variant.price || 0,
    stock: variant.stock || 0,
    status: variant.status,

    image: mapVariantImage(variant.image),
    images: (variant.images || []).map(mapProductImage),

    attributeValues: variant.attributeValues || [],
    optionSignature: variant.optionSignature,

    sortOrder: variant.sortOrder || 1,

    createdAt: variant.createdAt,
    updatedAt: variant.updatedAt,
  };
};

export const mapAdminProductDetailResponse = ({ product, variants = [] }) => {
  return {
    id: product._id,

    basicInformation: {
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      productType: product.productType,
      status: product.status,
    },

    category: mapProductRef(product.category),
    subCategory: mapProductRef(product.subCategory),
    brand: mapProductRef(product.brand),

    seo: {
      metaTitle: product.seo?.metaTitle || "",
      metaDescription: product.seo?.metaDescription || "",
      metaKeywords: product.seo?.metaKeywords || "",
    },

    pricing: {
      sellingPrice: product.pricing?.sellingPrice || 0,
      costPrice: product.pricing?.costPrice || 0,
      mrp: product.pricing?.mrp || 0,
      finalPrice: product.pricing?.finalPrice || 0,
      discountType: product.pricing?.discountType || "none",
      discountValue: product.pricing?.discountValue || 0,
      taxClass: product.pricing?.taxClass || null,
      specialPrice: product.pricing?.specialPrice || null,
      specialPriceFrom: product.pricing?.specialPriceFrom || null,
      specialPriceTo: product.pricing?.specialPriceTo || null,
    },

    inventory: {
      sku: product.inventory?.sku,
      barcode: product.inventory?.barcode || "",
      trackInventory: Boolean(product.inventory?.trackInventory),
      stockQuantity: product.inventory?.stockQuantity || 0,
      lowStockThreshold: product.inventory?.lowStockThreshold || 0,
      units: product.inventory?.units || "pcs",
      allowBackorders: Boolean(product.inventory?.allowBackorders),
      stockStatus: getStockStatus(product.inventory),
    },

    media: {
      images: (product.images || []).map(mapProductImage),
      primaryImage:
        (product.images || []).find((image) => image.isPrimary) ||
        product.images?.[0] ||
        null,
      videoUrl: product.videoUrl || "",
      imageZoom: Boolean(product.imageZoom),
      displayOrder: product.displayOrder || "custom",
    },

    attributes: product.attributes || [],

    variants: variants.map(mapAdminProductVariantDetail),

    additionalDetails: {
      productTypeDetail: product.productTypeDetail || "",
      productCollection: product.productCollection || "",
      tags: product.tags || [],
      hsnCode: product.hsnCode || "",
      countryOfOrigin: product.countryOfOrigin || "",
      warrantyInformation: product.warrantyInformation || "",
      returnPolicy: product.returnPolicy || "",
      careInstructions: product.careInstructions || "",
      safetyInformation: product.safetyInformation || "",
      customFields: product.customFields || [],
      userManual: product.userManual || null,
    },

    publishing: {
      publishOption: product.publishOption || null,
      scheduledAt: product.scheduledAt || null,
      publishedAt: product.publishedAt || null,
    },

    visibility: product.visibility || {},

    createdBy: product.createdBy || null,
    updatedBy: product.updatedBy || null,

    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
