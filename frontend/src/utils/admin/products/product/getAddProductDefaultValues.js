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
   }
   
}