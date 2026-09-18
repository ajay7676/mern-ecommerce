
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

const mapVariantAttributes = (variant) => {
  const attributeValues = variant.attributeValues || {};

  return Object.values(attributeValues).map((item) => ({
    attributeId: item.attributeId || null,
    attributeName: item.attributeName,
    optionId: item.optionId || item.value,
    label: item.label,
    value: item.value,
    colorCode: item.colorCode || null,
    isCustom: Boolean(item.isCustom),
  }));
};

const mapProductImages = (images = []) => {
  return images.map((image, index) => ({
    publicId: image.publicId || null,

    // For now previewUrl may be blob.
    // In Phase 9.4 this should become Cloudinary url.
    url: image.url || image.previewUrl,

    altText: image.altText || image.imageAltText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: image.sortOrder || index + 1,
  }));
};

const mapVariantImages = (images = []) => {
  return images.map((image, index) => ({
    publicId: image.publicId || null,
    url: image.url || image.previewUrl,
    isPrimary: image.isPrimary ?? index === 0,
    sortOrder: image.sortOrder || index + 1,
  }));
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

export const buildProductPayload = ({
  values,
  action = "draft",
}) => {
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
      metaKeywords: splitCommaText(values.metaKeywords),
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
      attributes: mapProductAttributes(values.attributes),
      variants: mapProductVariants(values.variants),
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