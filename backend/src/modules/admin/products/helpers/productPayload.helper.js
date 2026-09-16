import mongoose from "mongoose";

import {
  DISCOUNT_TYPE,
  PRODUCT_MODE,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
  PUBLISH_OPTION,
} from "../constants/product.constants.js";

import HandleError from "../../../../utils/handleError.js";

const cleanString = (value) => {
  if (value === null || value === undefined) return null;

  const trimmed = String(value).trim();
  return trimmed || null;
};

const toNumberOrZero = (value) => {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
};

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const number = Number(value);
  return Number.isNaN(number) ? null : number;
};

const toDateOrNull = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const generateProductSlug = (name = "") => {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const assertValidObjectId = (value, fieldName, message) => {
  if (!value || !mongoose.isValidObjectId(value)) {
    throw new HandleError(message, 400, {
      [fieldName]: message,
    });
  }
};

export const calculateFinalProductPrice = ({
  sellingPrice,
  discountType,
  discountValue,
}) => {
  const price = toNumberOrZero(sellingPrice);
  const discount = toNumberOrZero(discountValue);

  if (discountType === DISCOUNT_TYPE.PERCENTAGE) {
    return Math.max(price - (price * discount) / 100, 0);
  }

  if (discountType === DISCOUNT_TYPE.FIXED) {
    return Math.max(price - discount, 0);
  }

  return price;
};

export const buildScheduledAt = ({
  publishOption,
  scheduleDate,
  scheduleTime,
}) => {
  if (publishOption !== PUBLISH_OPTION.SCHEDULE_PUBLISH) {
    return null;
  }

  if (!scheduleDate || !scheduleTime) {
    return null;
  }

  const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}:00`);

  if (Number.isNaN(scheduledAt.getTime())) {
    throw new HandleError("Invalid schedule date or time", 400, {
      schedule: "Please provide valid schedule date and time",
    });
  }

  return scheduledAt;
};

export const normalizeProductImages = (images = []) => {
  return images.map((image, index) => ({
    publicId: cleanString(image.publicId),
    url: cleanString(image.url),
    altText: cleanString(image.altText) || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: image.sortOrder || index + 1,
  }));
};

export const normalizeProductAttributes = (attributes = []) => {
  return attributes.map((attribute) => ({
    attributeId:
      attribute.source === "existing" &&
      mongoose.isValidObjectId(attribute.attributeId)
        ? attribute.attributeId
        : null,

    name: cleanString(attribute.name),
    type: cleanString(attribute.type),
    source: attribute.source || "existing",

    options: (attribute.options || []).map((option) => ({
      optionId: cleanString(option.optionId),
      label: cleanString(option.label),
      value: cleanString(option.value),
      colorCode: cleanString(option.colorCode),
    })),
  }));
};

export const buildVariantOptionSignature = (attributes = []) => {
  if (!attributes.length) return "default";

  return attributes
    .map((item) => {
      const attributeKey = item.attributeId || item.attributeName;
      return `${attributeKey}:${item.value}`;
    })
    .sort()
    .join("|")
    .toLowerCase();
};

export const normalizeVariantAttributes = (attributes = []) => {
  return attributes.map((item) => ({
    attributeId: mongoose.isValidObjectId(item.attributeId)
      ? item.attributeId
      : null,
    attributeName: cleanString(item.attributeName),
    optionId: cleanString(item.optionId),
    label: cleanString(item.label),
    value: cleanString(item.value),
    colorCode: cleanString(item.colorCode),
  }));
};

export const buildProductDocument = ({ payload, adminId }) => {
  const {
    basicInformation,
    seo,
    pricing,
    inventory,
    media,
    additionalDetails,
    publishing,
  } = payload;

  const finalPrice = calculateFinalProductPrice({
    sellingPrice: pricing.sellingPrice,
    discountType: pricing.discountType,
    discountValue: pricing.discountValue,
  });

  const isDraft = payload.mode === PRODUCT_MODE.DRAFT;

  const scheduledAt = buildScheduledAt({
    publishOption: publishing.publishOption,
    scheduleDate: publishing.scheduleDate,
    scheduleTime: publishing.scheduleTime,
  });

  return {
    name: basicInformation.name,
    slug: generateProductSlug(basicInformation.name),

    productType: basicInformation.productType || PRODUCT_TYPE.SIMPLE,
    shortDescription: basicInformation.shortDescription,
    description: basicInformation.description,

    category: basicInformation.category,
    subCategory: basicInformation.subCategory || null,
    brand: basicInformation.brand,

    seo: {
      metaTitle: seo?.metaTitle || null,
      metaDescription: seo?.metaDescription || null,
      metaKeywords: seo?.metaKeywords || [],
    },

    pricing: {
      sellingPrice: pricing.sellingPrice,
      discountType: pricing.discountType,
      discountValue: pricing.discountValue,
      finalPrice,
      taxClass: pricing.taxClass,
      costPrice: pricing.costPrice,
      mrp: pricing.mrp,
      specialPrice: pricing.specialPrice,
      specialPriceFrom: toDateOrNull(pricing.specialPriceFrom),
      specialPriceTo: toDateOrNull(pricing.specialPriceTo),
    },

    inventory: {
      sku: inventory.sku,
      barcode: inventory.barcode || null,
      trackInventory: inventory.trackInventory,
      stockQuantity: inventory.stockQuantity,
      lowStockThreshold: inventory.lowStockThreshold || 0,
      units: inventory.units,
      allowBackorders: inventory.allowBackorders,
    },

    images: normalizeProductImages(media.images),
    videoUrl: media.videoUrl || null,
    imageZoom: media.imageZoom,

    attributes: normalizeProductAttributes(
      payload.attributesAndVariations?.attributes || [],
    ),

    productTypeDetail: additionalDetails.productTypeDetail || null,
    productCollection: additionalDetails.collection || null,
    tags: additionalDetails.tags || [],
    hsnCode: additionalDetails.hsnCode || null,
    countryOfOrigin: additionalDetails.countryOfOrigin || null,
    warrantyInformation: additionalDetails.warrantyInformation || null,
    returnPolicy: additionalDetails.returnPolicy || null,
    careInstructions: additionalDetails.careInstructions || null,
    safetyInformation: additionalDetails.safetyInformation || null,

    userManual: additionalDetails.userManual || null,
    customFields: additionalDetails.customFields || [],

    visibility: publishing.visibility,

    status: isDraft ? PRODUCT_STATUS.DRAFT : publishing.status,
    publishOption: isDraft
      ? PUBLISH_OPTION.SAVE_AS_DRAFT
      : publishing.publishOption,

    scheduledAt,
    publishedAt:
      !isDraft && publishing.publishOption === PUBLISH_OPTION.PUBLISH_NOW
        ? new Date()
        : null,

    createdBy: adminId,
    updatedBy: null,
  };
};

export const buildProductVariantDocuments = ({
  payload,
  product,
  productId,
  adminId,
}) => {
  const inputVariants = payload.attributesAndVariations?.variants || [];

  if (!inputVariants.length) {
    const primaryImage =
      product.images.find((image) => image.isPrimary) || product.images[0];

    return [
      {
        product: productId,
        name: "Default",
        sku: product.inventory.sku,
        price: product.pricing.finalPrice,
        stock: product.inventory.stockQuantity,
        status:
          product.status === PRODUCT_STATUS.ACTIVE ? "active" : "inactive",
        source: "manual",
        image: {
          publicId: primaryImage?.publicId || null,
          url: primaryImage?.url || null,
        },
        images: primaryImage
          ? [
              {
                publicId: primaryImage.publicId || null,
                url: primaryImage.url,
                isPrimary: true,
                sortOrder: 1,
              },
            ]
          : [],
        attributes: [],
        optionSignature: "default",
        sortOrder: 1,
        createdBy: adminId,
        updatedBy: null,
      },
    ];
  }

  return inputVariants.map((variant, index) => {
    const variantAttributes = normalizeVariantAttributes(
      variant.attributes || [],
    );
    const primaryVariantImage = variant.images?.find(
      (image) => image.isPrimary,
    );

    return {
      product: productId,
      name: variant.name,
      sku: variant.sku,
      price: toNumberOrZero(variant.price),
      stock: toNumberOrZero(variant.stock),
      status: variant.status,
      source: variant.source || "auto",

      image: {
        publicId:
          variant.image?.publicId || primaryVariantImage?.publicId || null,
        url: variant.image?.url || primaryVariantImage?.url || null,
      },

      images: (variant.images || []).map((image, imageIndex) => ({
        publicId: image.publicId || null,
        url: image.url,
        isPrimary: image.isPrimary ?? imageIndex === 0,
        sortOrder: image.sortOrder || imageIndex + 1,
      })),

      attributes: variantAttributes,
      optionSignature: buildVariantOptionSignature(variantAttributes),
      sortOrder: variant.sortOrder || index + 1,

      createdBy: adminId,
      updatedBy: null,
    };
  });
};
