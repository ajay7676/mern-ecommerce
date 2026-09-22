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
    publicId: image.publicId || image.imageId,
    url: image.url,
    altText: image.altText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: Number(image.sortOrder || index + 1),
  }));
};

export const normalizeVariantImage = (image) => {
  if (!image?.publicId && !image?.url) return null;

  return {
    publicId: image.publicId || null,
    url: image.url || null,
  };
};

export const normalizeVariantImages = (images = []) => {
  return images.map((image, index) => ({
    publicId: image.publicId || image.imageId,
    url: image.url,
    altText: image.altText || "",
    isPrimary: Boolean(image.isPrimary),
    sortOrder: Number(image.sortOrder || index + 1),
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
      isCustom: Boolean(option.isCustom),
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
    isCustom: Boolean(item.isCustom),
  }));
};

export const buildProductDocument = ({ payload, adminId,productId }) => {
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
    _id: productId,
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
  const variants = payload.attributesAndVariations?.variants || [];
  const productImages = payload.media?.images || [];

  const primaryProductImage =
    productImages.find((image) => image.isPrimary) || productImages[0] || null;

  // SIMPLE PRODUCT: create one default variant
  if (!variants.length) {
    return [
      {
        product: productId,

        name: product.name,
        sku: product.inventory?.sku,

        price: Number(product.pricing?.finalPrice || product.pricing?.sellingPrice || 0),
        stock: Number(product.inventory?.stockQuantity || 0),

        status: product.status === "active" ? "active" : "inactive",

        image: primaryProductImage
          ? {
              publicId: primaryProductImage.publicId,
              url: primaryProductImage.url,
            }
          : null,

        images: [],

        attributeValues: [],

        optionSignature: "default",

        sortOrder: 1,

        createdBy: adminId,
        updatedBy: adminId,
      },
    ];
  }

  // VARIABLE PRODUCT: create variants from payload
  return variants.map((variantItem, index) => {
    const normalizedVariantAttributes = normalizeVariantAttributes(
      variantItem.attributeValues || variantItem.attributes || []
    );

    return {
      product: productId,

      name: variantItem.name,
      sku: variantItem.sku,

      price: Number(variantItem.price || product.pricing?.finalPrice || 0),
      stock: Number(variantItem.stock || 0),

      status:
        variantItem.status === "active" || variantItem.status === true
          ? "active"
          : "inactive",

      image: normalizeVariantImage(variantItem.image),

      images: normalizeVariantImages(variantItem.images || []),

      attributeValues: normalizedVariantAttributes,

      optionSignature:
        variantItem.optionSignature ||
        buildVariantOptionSignature(normalizedVariantAttributes),

      sortOrder: Number(variantItem.sortOrder || index + 1),

      createdBy: adminId,
      updatedBy: adminId,
    };
  });
};

export const buildProductUpdateDocument = ({ payload, adminId, productId }) => {
  const productData = buildProductDocument({
    payload,
    adminId,
    productId,
  });

  delete productData._id;
  delete productData.createdBy;
  delete productData.createdAt;

  return {
    ...productData,
    updatedBy: adminId,
    updatedAt: new Date(),
  };
};

export const buildProductVariantUpdateDocuments = ({
  payload,
  product,
  productId,
  adminId,
}) => {
  const variants = payload.attributesAndVariations?.variants || [];

  return variants.map((variant, index) => {
    const variantId =
      variant.variantId && mongoose.isValidObjectId(variant.variantId)
        ? new mongoose.Types.ObjectId(variant.variantId)
        : new mongoose.Types.ObjectId();

    return {
      _id: variantId,

      product: productId,

      name: variant.name,
      sku: variant.sku,

      price: Number(variant.price || product.pricing?.finalPrice || 0),
      stock: Number(variant.stock || 0),

      status: variant.status === "active" || variant.status === true
        ? "active"
        : "inactive",

      image: variant.image || null,
      images: variant.images || [],

      attributeValues: normalizeVariantAttributes(
        variant.attributeValues || variant.attributes || []
      ),

      optionSignature:
        variant.optionSignature ||
        buildVariantOptionSignature(
          normalizeVariantAttributes(
            variant.attributeValues || variant.attributes || []
          )
        ),

      sortOrder: Number(variant.sortOrder || index + 1),

      createdBy: adminId,
      updatedBy: adminId,
    };
  });
};
