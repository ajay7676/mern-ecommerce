import {
  getDefaultProductVariants,
  getDefaultSelectedAttributes,
} from "./productVariationUtils";

export const getAddProductDefaultValues = () => {
  return {
    // Basic Information
    productName: "",
    sku: "",
    shortDescription: "",
    productType: "simple",
    category: "",
    subCategory: "",
    brand: "",
    description: "",
    // SEO
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",

    // Status
    status: "active",

    // Visibility
    visibility: {
      onlineStore: true,
      mobileApp: true,
      pos: false,
    },
    // Step 2: Pricing & Inventory
    sellingPrice: "",
    discountType: "percentage",
    discountValue: "",
    taxClass: "gst18",

    costPrice: "",
    mrp: "",
    specialPrice: "",
    specialPriceFrom: "",
    specialPriceTo: "",

    barcode: "",
    trackInventory: true,
    stockQuantity: "",
    lowStockThreshold: "",
    units: "pcs",
    allowBackorders: false,

    // Step 3
    images: [],
    imageAltText: "",
    displayOrder: "custom",
    imageZoom: true,
    videoUrl: "",

    // Step 4
    attributes: getDefaultSelectedAttributes() || [],
    variants: getDefaultProductVariants() || [],

     // Internal frontend-only variant sync state
    attributesChanged: false,
    variantsNeedRegeneration: false,
    variantRegenerationReason: null,

    // Step 5: Additional Details
    productTypeDetail: "",
    collection: "",
    tags: "",
    hsnCode: "",
    countryOfOrigin: "",
    warrantyInformation: "",
    returnPolicy: "",
    careInstructions: "",
    userManual: null,
    safetyInformation: "",
    customFields: [],

    // Step 6
    publishOption: "publishNow",
    scheduleDate: "",
    scheduleTime: "",
  };
};
