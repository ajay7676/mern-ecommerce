const BACKEND_TO_FORM_FIELD_MAP = {
  "basicInformation.name": "productName",
  "basicInformation.sku": "sku",
  "basicInformation.shortDescription": "shortDescription",
  "basicInformation.description": "description",
  "basicInformation.productType": "productType",
  "basicInformation.category": "category",
  "basicInformation.subCategory": "subCategory",
  "basicInformation.brand": "brand",

  "seo.metaTitle": "metaTitle",
  "seo.metaDescription": "metaDescription",
  "seo.metaKeywords": "metaKeywords",

  "pricing.sellingPrice": "sellingPrice",
  "pricing.discountType": "discountType",
  "pricing.discountValue": "discountValue",
  "pricing.taxClass": "taxClass",
  "pricing.costPrice": "costPrice",
  "pricing.mrp": "mrp",
  "pricing.specialPrice": "specialPrice",
  "pricing.specialPriceFrom": "specialPriceFrom",
  "pricing.specialPriceTo": "specialPriceTo",

  "inventory.sku": "sku",
  "inventory.barcode": "barcode",
  "inventory.stockQuantity": "stockQuantity",
  "inventory.lowStockThreshold": "lowStockThreshold",
  "inventory.units": "units",

  "media.images": "images",
  "media.videoUrl": "videoUrl",

  "attributesAndVariations.attributes": "attributes",
  "attributesAndVariations.variants": "variants",

  "publishing.status": "status",
  "publishing.publishOption": "publishOption",
  "publishing.scheduleDate": "scheduleDate",
  "publishing.scheduleTime": "scheduleTime",

  category: "category",
  subCategory: "subCategory",
  brand: "brand",
  sku: "sku",
  images: "images",
  variants: "variants",
  attributes: "attributes",
  status: "status",
};

const getErrorMessage = (value) => {
  if (!value) return "Invalid value";
  if (typeof value === "string") return value;
  if (typeof value?.message === "string") return value.message;

  return "Invalid value";
};

export const getProductApiErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Product create failed"
  );
};


export const applyCreateProductApiErrors = (methods, error) => {
  const serverErrors = error?.response?.data?.errors || {};
  const appliedFields = [];

  Object.entries(serverErrors).forEach(([backendField, value]) => {
    const formField = BACKEND_TO_FORM_FIELD_MAP[backendField] || backendField;

    methods.setError(formField, {
      type: "server",
      message: getErrorMessage(value),
    });

    appliedFields.push(formField);
  });

  return appliedFields;
};