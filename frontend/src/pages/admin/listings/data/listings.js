const listings = [
  {
    id: "P001",

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",

    name: "AUSK Men's Running Shoes",

    sku: "SHOE-458745",

    brand: "AUSK",

    listingPrice: 369,

    finalPrice: 255,

    stock: 111,

    doh: 15,

    returnStatus: "NA",

    quality: {
      status: "excellent",
      score: 4.8,
      recommendation: "Excellent listing",
      reviews: 245,
    },

    info: {
      shipping: true,
      fulfilled: true,
      assured: true,
      cod: true,
      replacement: true,
      express: false,
    },
  },

  {
    id: "P002",

    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200",

    name: "Nike Air Max Sneakers",

    sku: "NK-9088",

    brand: "Nike",

    listingPrice: 4999,

    finalPrice: 4299,

    stock: 32,

    doh: 8,

    returnStatus: "Low",

    quality: {
      status: "good",
      score: 4.3,
      recommendation: "Good product page",
      reviews: 183,
    },

    info: {
      shipping: true,
      fulfilled: true,
      assured: true,
      cod: false,
      replacement: true,
      express: true,
    },
  },

  {
    id: "P003",

    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200",

    name: "Puma Sports Shoes",

    sku: "PM-2233",

    brand: "Puma",

    listingPrice: 2899,

    finalPrice: 2499,

    stock: 6,

    doh: 2,

    returnStatus: "High",

    quality: {
      status: "average",
      score: 3.6,
      recommendation: "Improve product images",
      reviews: 91,
    },

    info: {
      shipping: true,
      fulfilled: false,
      assured: false,
      cod: true,
      replacement: false,
      express: false,
    },
  },

  {
    id: "P004",

    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=200",

    name: "Adidas Ultraboost",

    sku: "AD-1020",

    brand: "Adidas",

    listingPrice: 6999,

    finalPrice: 5999,

    stock: 54,

    doh: 22,

    returnStatus: "NA",

    quality: {
      status: "poor",
      score: 2.4,
      recommendation: "Missing attributes",
      reviews: 15,
    },

    info: {
      shipping: true,
      fulfilled: true,
      assured: false,
      cod: false,
      replacement: false,
      express: false,
    },
  },
];

export default listings;