// export const initialBasicInformation = {
//   name: "Adidas Men Essential Cotton T-Shirt",
//   shortDescription: "Comfortable cotton T-shirt for men.",
//   description:
//     "Adidas men's casual T-shirt made with soft and breathable cotton fabric. Suitable for daily wear, gym and outdoor activities.",
//   category: "6a47bf6a0f7d0e36f53eb31",
//   brand: "6a4725cbdc5bd8607c8c72b9",
//   sku: "ADIDAS-MEN-TSHIRT-001",
//   barcode: "",
// };

export const categoryOptions = [
  {
    value: "t-shirts",
    label: "Men > Clothing > T-Shirts",
    secondaryText: "Men T-Shirts",
  },
  {
    value: "women-tops",
    label: "Women > Clothing > Tops",
    secondaryText: "women-tops",
  },
];

export const brandOptions = [
  {
    value: "adidas",
    label: "Adidas",
    secondaryText: "adidas",
  },
  {
    value: "nike",
    label: "Nike",
    secondaryText: "nike",
  },
  {
    value: "puma",
    label: "Puma",
    secondaryText: "puma",
  },
];

export const initialProductData = {
  name: "Adidas Men Essential Cotton T-Shirt",
  shortDescription: "Comfortable cotton T-shirt for men.",
  description:
    "Adidas men's casual T-shirt made with soft and breathable cotton fabric. Suitable for daily wear, gym and outdoor activities.",
  category: "6a47bf6a0f7d0e36f53eb31",
  brand: "6a4725cbdc5bd8607c8c72b9",
  sku: "ADIDAS-MEN-TSHIRT-001",
  barcode: "",
  price: "2345",
  discountPrice: "1599",
  costPrice: "2345",
  currency: "INR",
  stock: "25",
  lowStockThreshold: "5",
  trackInventory: true,
  allowBackorder: false,
  images: [
    {
        "public_id": "blue-l-tshirt",
        "url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
        "alt": "Blue L T SHIRT",
        "isPrimary": true,
        "position": 0
    },
    {
        "public_id": "blue-m-tshirt",
        "url": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        "alt": "Blue M T SHIRT",
        "isPrimary": true,
        "position": 0
    },
    {
        "public_id": "blue-s-tshirt",
        "url": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
        "alt": "Blue S T SHIRT",
        "isPrimary": true,
        "position": 0
    }
],
  weight: {
    value: "",
    unit: "kg",
  },
  dimensions: {
    length: "",
    width: "",
    height: "",
    unit: "cm",
  },
  status: "draft",
  visibility: "public", 
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: false,
   seoTitle: "",
  seoDescription: "",
  seoKeywords: [
    "tshirt",
    "cotton",
    "mens fashion",
    "casual wear",
    "sportswear",
    "adidas",
  ],
};
