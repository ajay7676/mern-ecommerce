const toNumberOrZero = (value) => {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
};

const cleanString = (value) => {
  if (value === null || value === undefined) return null;

  const trimmed = String(value).trim();

  return trimmed || null;
};

const toNumberOrNull = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);

  return Number.isNaN(number) ? null : number;
};

const toBoolean = (value) => Boolean(value);

const splitCommaText = (value) => {
  if (!value) return [];

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeMetaKeywords = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .join(", ");
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

const getImageAssetState = (image = {}) => {
  if (image.isTemporary === true || image.assetState === "temporary") {
    return "temporary";
  }

  return "permanent";
};

const getImageIsTemporary = (image = {}) => {
  return image.isTemporary === true || image.assetState === "temporary";
};

const getImageIsExisting = (image = {}) => {
  return image.isExisting === true && !getImageIsTemporary(image);
};

const mapVariantAttributes = (variant = {}) => {
  const values = variant.attributeValues || {};

  const valuesArray = Array.isArray(values) ? values : Object.values(values);

  return valuesArray.map((item) => ({
    attributeId: item.attributeId || null,

    attributeName: item.attributeName || "",

    attributeSlug: item.attributeSlug || null,

    optionId: item.optionId || item.value || null,

    label: item.label || "",

    value: item.value || "",

    colorCode: item.colorCode || null,

    isCustom: Boolean(item.isCustom),
  }));
};

const mapProductImages = (images = []) => {
  return images.map((image, index) => ({
    imageId: image.publicId || image.imageId,
    publicId: image.publicId,
    url: image.url,
    altText: image.altText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: Number(image.sortOrder || index + 1),

    isExisting: getImageIsExisting(image),
    isTemporary: getImageIsTemporary(image),
    assetState: getImageAssetState(image),
  }));
};

const mapVariantImage = (image) => {
  if (!image?.publicId && !image?.url) {
    return null;
  }

  return {
    publicId: image.publicId || null,

    url: image.url || null,

    isExisting: Boolean(image.isExisting),

    isTemporary: Boolean(image.isTemporary),

    assetState:
      image.assetState || (image.isTemporary ? "temporary" : "permanent"),
  };
};

const mapVariantImages = (images = []) => {
  return images.map((image, index) => ({
    imageId: image.imageId || image.publicId,
    publicId: image.publicId,
    url: image.url,
    altText: image.altText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: Number(image.sortOrder || index + 1),

    isExisting: getImageIsExisting(image),
    isTemporary: getImageIsTemporary(image),
    assetState: getImageAssetState(image),
  }));
};

const mapProductVariant = (variant, index) => {
  return {
    /**
     * Existing DB variant:
     * MongoDB id.
     *
     * New variant:
     * null.
     */
    variantId: variant.variantId || variant.id || variant._id || null,

    name: variant.name || "",

    sku: String(variant.sku || "").trim(),

    price: Number(variant.price || 0),

    stock: Number(variant.stock || 0),

    status:
      variant.status === true || variant.status === "active"
        ? "active"
        : "inactive",

    source: variant.source || "auto",

    image: mapVariantImage(variant.image),

    attributeValues: mapVariantAttributes(variant),

    optionSignature: variant.optionSignature || null,

    sortOrder: Number(variant.sortOrder || index + 1),
  };
};

const mapProductVariants = (variants = []) => {
  return variants.map((variant, index) => {
    const images = mapVariantImages(variant.images || []);

    return {
      variantId: variant.variantId || null,
      name: variant.name,
      sku: variant.sku,

      price: toNumberOrZero(variant.price),
      stock: toNumberOrZero(variant.stock),

      status: variant.status ? "active" : "inactive",
      source: variant.source || "auto",
      sortOrder: variant.sortOrder || index + 1,

      image: {
        publicId: variant.image?.publicId || null,
        url: variant.image?.url || variant.imageUrl || null,
      },

      images,

      attributes: mapVariantAttributes(variant),
    };
  });
};
const mapProductAttributes = (attributes = []) => {
  return attributes.map((attribute) => ({
    attributeId: attribute.attributeId || null,
    name: attribute.name,
    slug: attribute.slug || null,
    type: attribute.type,
    source: attribute.source || "existing",

    options: (attribute.options || []).map((option) => ({
      optionId: option.optionId || option.value,
      label: option.label,
      value: option.value,
      colorCode: option.colorCode || null,
      isCustom: Boolean(option.isCustom),
    })),
  }));
};

export const buildProductPayload = ({ values, action = "draft" }) => {
  const isDraft = action === "draft";

  return {
    mode: action,

    basicInformation: {
      name: cleanString(values.productName),
      sku: cleanString(values.sku),
      shortDescription: cleanString(values.shortDescription),
      description: cleanString(values.description),
      productType: values.productType,
      category: cleanString(values.category),
      subCategory: cleanString(values.subCategory),
      brand: cleanString(values.brand),
    },

    seo: {
      metaTitle: cleanString(values.metaTitle),
      metaDescription: cleanString(values.metaDescription),
      metaKeywords: normalizeMetaKeywords(values.metaKeywords),
    },

    pricing: {
      sellingPrice: toNumberOrNull(values.sellingPrice),
      discountType: values.discountType || "none",
      discountValue: toNumberOrNull(values.discountValue),
      taxClass: values.taxClass,
      costPrice: toNumberOrNull(values.costPrice),
      mrp: toNumberOrNull(values.mrp),
      specialPrice: toNumberOrNull(values.specialPrice),
      specialPriceFrom: cleanString(values.specialPriceFrom),
      specialPriceTo: cleanString(values.specialPriceTo),
    },

    inventory: {
      sku: cleanString(values.sku),
      barcode: cleanString(values.barcode),
      trackInventory: toBoolean(values.trackInventory),
      stockQuantity: toNumberOrNull(values.stockQuantity),
      lowStockThreshold: toNumberOrNull(values.lowStockThreshold),
      units: values.units || "pcs",
      allowBackorders: toBoolean(values.allowBackorders),
    },

    media: {
      images: mapProductImages(values.images),
      imageAltText: cleanString(values.imageAltText),
      displayOrder: values.displayOrder || "custom",
      imageZoom: toBoolean(values.imageZoom),
      videoUrl: cleanString(values.videoUrl),
    },

    attributesAndVariations: {
      attributes: mapProductAttributes(values.attributes || []),

      variants: (values.variants || []).map(mapProductVariant),
    },

    additionalDetails: {
      productTypeDetail: cleanString(values.productTypeDetail),
      collection: cleanString(values.collection),
      tags: splitCommaText(values.tags),
      hsnCode: cleanString(values.hsnCode),
      countryOfOrigin: cleanString(values.countryOfOrigin),
      warrantyInformation: cleanString(values.warrantyInformation),
      returnPolicy: cleanString(values.returnPolicy),
      careInstructions: cleanString(values.careInstructions),
      safetyInformation: cleanString(values.safetyInformation),

      userManual: values.userManual
        ? {
            name: values.userManual.name,
            size: values.userManual.size,
            type: values.userManual.type,
          }
        : null,

      customFields: (values.customFields || []).map((field) => ({
        label: cleanString(field.label),
        value: cleanString(field.value),
      })),
    },

    publishing: {
      status: isDraft ? "draft" : values.status,
      publishOption: isDraft ? "saveAsDraft" : values.publishOption,
      scheduleDate: cleanString(values.scheduleDate),
      scheduleTime: cleanString(values.scheduleTime),
      visibility: {
        onlineStore: toBoolean(values.visibility?.onlineStore),
        mobileApp: toBoolean(values.visibility?.mobileApp),
        pos: toBoolean(values.visibility?.pos),
      },
    },
  };
};
