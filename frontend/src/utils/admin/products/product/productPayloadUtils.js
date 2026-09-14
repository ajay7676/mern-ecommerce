
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

const mapProductImages = (images = []) => {
  return images.map((image, index) => ({
    publicId: image.publicId || null,
    url: image.url || image.previewUrl || null,
    altText: image.altText || image.imageAltText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: index + 1,

    // only for frontend dummy preview
    localName: image.name || null,
  }));
};

const mapProductAttributes = (attributes = []) => {
  return attributes.map((attribute) => ({
    attributeId: attribute.attributeId,
    name: attribute.name,
    type: attribute.type,
    source: attribute.source || "existing",
    options: (attribute.options || []).map((option) => ({
      optionId: option.optionId,
      label: option.label,
      value: option.value,
      colorCode: option.colorCode || null,
    })),
  }));
};

const mapProductVariants = (variants = []) => {
  return variants.map((variant, index) => ({
    variantId: variant.variantId,
    name: variant.name,
    sku: cleanString(variant.sku),
    price: toNumberOrNull(variant.price),
    stock: toNumberOrNull(variant.stock),
    status: variant.status ? "active" : "inactive",
    source: variant.source || "auto",
    sortOrder: index + 1,

    image: {
      publicId: variant.image?.publicId || null,
      url: variant.imageUrl || variant.images?.[0]?.url || null,
    },

    images: (variant.images || []).map((image, imageIndex) => ({
      publicId: image.publicId || null,
      url: image.url || null,
      isPrimary: image.isPrimary ?? imageIndex === 0,
      sortOrder: imageIndex + 1,
    })),

    attributes: Object.values(variant.attributeValues || {}).map((item) => ({
      attributeId: item.attributeId,
      attributeName: item.attributeName,
      optionId: item.optionId,
      label: item.label,
      value: item.value,
      colorCode: item.colorCode || null,
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