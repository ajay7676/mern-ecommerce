export const getAddProductDefaultValues  = () => {
   return{
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
    
     // Later steps
    attributes: [],
    variants: [],

    productTypeDetail: "",
    collection: "",
    tags: "",
    hsnCode: "",
    countryOfOrigin: "",
    warrantyInformation: "",
    returnPolicy: "",
    careInstructions: "",
    safetyInformation: "",
    customFields: [],

    publishOption: "publishNow",
    scheduleDate: "",
    scheduleTime: "",
   }
   
}