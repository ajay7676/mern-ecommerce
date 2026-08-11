import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import {createProduct} from '../../../../api/adminProduct.api';

import {
  validateProduct,
} from '../../../../utils/admin/products/product.validator';

export const createEmptyProductForm = () => ({
  name: "",
  shortDescription: "",
  description: "",

  category: "",
  brand: "",

  sku: "",
  barcode: "",

  price: "",
  discountPrice: "",
  costPrice: "",
  currency: "INR",

  stock: "0",
  lowStockThreshold: "5",
  trackInventory: true,
  allowBackorder: false,

  images: [],

  weight: {
    value: "",
    unit: "g",
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
  seoKeywords: [],
});