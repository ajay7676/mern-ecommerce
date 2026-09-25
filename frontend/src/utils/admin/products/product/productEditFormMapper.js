import { getAddProductDefaultValues } from "./getAddProductDefaultValues";

const toStringValue = (value) => {
  if (value === null || value === undefined) return "";
  return String(value);
};

const toBooleanVariantStatus = (status) => {
  if (status === true || status === "active") return true;
  if (status === false || status === "inactive") return false;

  return true;
};

const formatDateForInput = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
};

const formatTimeForInput = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "";

  return date.toTimeString().slice(0, 5);
};

const mapMetaKeywordsToForm = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords.join(", ");
  }

  return keywords || "";
};

const mapProductImagesToForm = (images = []) => {
  return images.map((image, index) => ({
    imageId: image.publicId || image.imageId || "",
    publicId: image.publicId || "",
    url: image.url || "",
    previewUrl: image.url || "",
    altText: image.altText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: Number(image.sortOrder || index + 1),

    // important for edit mode
    isExisting: true,
    isTemporary: false,
    assetState: "permanent",
  }));
};

const mapAttributesToForm = (attributes = []) => {
  return attributes.map((attribute) => ({
    attributeId: attribute.attributeId || attribute._id || null,
    name: attribute.name || "",
    slug: attribute.slug || "",
    type: attribute.type || "dropdown",
    source: attribute.source || "existing",
    options: (attribute.options || []).map((option) => ({
      optionId: option.optionId || option.value || "",
      label: option.label || "",
      value: option.value || "",
      colorCode: option.colorCode || null,
      isCustom: Boolean(option.isCustom),
    })),
  }));
};

const mapVariantAttributeValuesToFormObject = (attributeValues) => {
  if (!attributeValues) return {};

  const valuesArray = Array.isArray(attributeValues)
    ? attributeValues
    : Object.values(attributeValues);

  return valuesArray.reduce((acc, item) => {
    const key = item.attributeName || item.name || item.attributeId || item.value;

    if (!key) return acc;

    acc[key] = {
      attributeId: item.attributeId || null,
      attributeName: item.attributeName || item.name || "",
      optionId: item.optionId || item.value || "",
      label: item.label || "",
      value: item.value || "",
      colorCode: item.colorCode || null,
      isCustom: Boolean(item.isCustom),
    };

    return acc;
  }, {});
};

const mapVariantImageToForm = (image) => {
  if (!image?.publicId && !image?.url) {
    return {
      publicId: null,
      url: null,
    };
  }

  return {
    publicId: image.publicId || null,
    url: image.url || null,

    // important for edit mode
    isExisting: true,
    isTemporary: false,
    assetState: "permanent",
  };
};

const mapVariantsToForm = (variants = []) => {
  return variants.map((variant, index) => ({
    variantId: variant.id || variant._id || variant.variantId || "",
    name: variant.name || "",
    sku: variant.sku || "",

    price: toStringValue(variant.price),
    stock: toStringValue(variant.stock),

    status: toBooleanVariantStatus(variant.status),

    source: variant.source || "auto",

    imageUrl: variant.image?.url || variant.images?.[0]?.url || "",

    image: mapVariantImageToForm(variant.image),

    images: mapProductImagesToForm(variant.images || []),

    attributeValues: mapVariantAttributeValuesToFormObject(
      variant.attributeValues
    ),

    optionSignature: variant.optionSignature || "",
    sortOrder: Number(variant.sortOrder || index + 1),

     // old saved image
    isExisting: true,
    isTemporary: false,
    assetState: "permanent",
  }));
};

const mapTagsToForm = (tags) => {
  if (Array.isArray(tags)) {
    return tags.join(", ");
  }

  return tags || "";
};

const mapCustomFieldsToForm = (customFields = []) => {
  return customFields.map((field) => ({
    id: field.id || field._id || `${field.label}-${field.value}`,
    label: field.label || "",
    value: field.value || "",
  }));
};

export const mapAdminProductDetailToFormValues = (product) => {
  const defaults = getAddProductDefaultValues();

  if (!product) {
    return defaults;
  }

  const basic = product.basicInformation || {};
  const pricing = product.pricing || {};
  const inventory = product.inventory || {};
  const media = product.media || {};
  const seo = product.seo || {};
  const additional = product.additionalDetails || {};
  const publishing = product.publishing || {};

  return {
    ...defaults,

    // Step 1 — Basic Information
    productName: basic.name || "",
    slug: basic.slug || "",
    shortDescription: basic.shortDescription || "",
    productType: basic.productType || defaults.productType,
    category: product.category?.id || product.category?._id || "",
    subCategory: product.subCategory?.id || product.subCategory?._id || "",
    brand: product.brand?.id || product.brand?._id || "",
    description: basic.description || "",
    status: basic.status || defaults.status,

    visibility: {
      onlineStore:
        product.visibility?.onlineStore ?? defaults.visibility.onlineStore,
      mobileApp: product.visibility?.mobileApp ?? defaults.visibility.mobileApp,
      pos: product.visibility?.pos ?? defaults.visibility.pos,
    },

    metaTitle: seo.metaTitle || "",
    metaDescription: seo.metaDescription || "",
    metaKeywords: mapMetaKeywordsToForm(seo.metaKeywords),

    // Step 2 — Pricing & Inventory
    sellingPrice: toStringValue(pricing.sellingPrice),
    costPrice: toStringValue(pricing.costPrice),
    mrp: toStringValue(pricing.mrp),
    specialPrice: toStringValue(pricing.specialPrice),
    specialPriceFrom: formatDateForInput(pricing.specialPriceFrom),
    specialPriceTo: formatDateForInput(pricing.specialPriceTo),
    discountType: pricing.discountType || defaults.discountType,
    discountValue: toStringValue(pricing.discountValue),
    taxClass: pricing.taxClass || defaults.taxClass,

    sku: inventory.sku || "",
    barcode: inventory.barcode || "",
    trackInventory:
      inventory.trackInventory ?? defaults.trackInventory,
    stockQuantity: toStringValue(inventory.stockQuantity),
    lowStockThreshold: toStringValue(inventory.lowStockThreshold),
    units: inventory.units || defaults.units,
    allowBackorders:
      inventory.allowBackorders ?? defaults.allowBackorders,

    // Step 3 — Images & Media
    images: mapProductImagesToForm(media.images || []),
    imageAltText: "",
    displayOrder: media.displayOrder || defaults.displayOrder,
    imageZoom: media.imageZoom ?? defaults.imageZoom,
    videoUrl: media.videoUrl || "",

    // Step 4 — Attributes & Variations
    attributes: mapAttributesToForm(product.attributes || []),
    variants: mapVariantsToForm(product.variants || []),

    // Existing backend variants are synchronized when loaded.
    attributesChanged: false,
    variantsNeedRegeneration: false,
    variantRegenerationReason: null,

    editProductId: product.id || product._id || null,
    isEditMode: true,

    // Step 5 — Additional Details
    productTypeDetail: additional.productTypeDetail || "",
    collection: additional.productCollection || additional.collection || "",
    tags: mapTagsToForm(additional.tags),
    hsnCode: additional.hsnCode || "",
    countryOfOrigin: additional.countryOfOrigin || "",
    warrantyInformation: additional.warrantyInformation || "",
    returnPolicy: additional.returnPolicy || "",
    careInstructions: additional.careInstructions || "",
    userManual: additional.userManual || null,
    safetyInformation: additional.safetyInformation || "",
    customFields: mapCustomFieldsToForm(additional.customFields || []),

    // Step 6 — Review & Publish
    publishOption: publishing.publishOption || defaults.publishOption,
    scheduleDate: formatDateForInput(publishing.scheduledAt),
    scheduleTime: formatTimeForInput(publishing.scheduledAt),

  };
};