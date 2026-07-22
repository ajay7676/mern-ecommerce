import HandleError from "../../../utils/handleError.js";


/**
 * Convert a value into a clean string.
 */

const normalizeString = (value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue || undefined;
};

/**
 * Convert MongoDB ObjectId, populated document,
 * or string ID into a comparable string.
 */
const normalizeDocumentId = (value) => {
  if (!value) {
    return null;
  }

  const documentId = value._id ?? value;

  return documentId.toString();
};

/**
 * Convert a price to a valid money value.
 */
const normalizeMoney = (
  value,
  fieldName
) => {
  const numericValue = Number(value);

  if (
    !Number.isFinite(numericValue) ||
    numericValue < 0
  ) {
    throw new HandleError(
      `${fieldName} is not configured correctly`,
      500
    );
  }

  /*
   * Avoid unnecessarily long decimal values.
   *
   * Example:
   * 1199.999999 → 1200
   */
  return (
    Math.round(
      (numericValue + Number.EPSILON) * 100
    ) / 100
  );
};

/**
 * Calculate available stock.
 */
export const getAvailableStock = (
  inventorySource
) => {
  if (!inventorySource) {
    throw new HandleError(
      "Inventory information is unavailable",
      500
    );
  }

  /*
   * Stock restriction is not needed when:
   *
   * 1. Inventory tracking is explicitly disabled.
   * 2. Backorders are allowed.
   */
  if (
    inventorySource.trackInventory ===
      false ||
    inventorySource.allowBackorder === true
  ) {
    return Infinity;
  }

  const stock = Number(
    inventorySource.stock
  );

  const reservedStock = Number(
    inventorySource.reservedStock ?? 0
  );

  if (
    !Number.isFinite(stock) ||
    stock < 0
  ) {
    throw new HandleError(
      "Product stock is not configured correctly",
      500
    );
  }

  if (
    !Number.isFinite(reservedStock) ||
    reservedStock < 0
  ) {
    throw new HandleError(
      "Reserved stock is not configured correctly",
      500
    );
  }

  /*
   * Math.max() prevents a negative result.
   *
   * Example:
   * stock = 5
   * reservedStock = 7
   * availableStock = 0
   */
  return Math.max(
    stock - reservedStock,
    0
  );
};

/**
 * Create a trusted price snapshot.
 *
 * Variant price gets priority.
 * If the variant does not have its own price,
 * product price is used.
 */
export const getPriceSnapshot = (
  product,
  variant = null
) => {
  if (!product) {
    throw new HandleError(
      "Product pricing information is unavailable",
      500
    );
  }

  const variantHasOwnPrice =
    variant?.price !== null &&
    variant?.price !== undefined;

  const rawPrice = variantHasOwnPrice
    ? variant.price
    : product.price;

  const rawDiscountPrice =
    variantHasOwnPrice
      ? variant.discountPrice
      : product.discountPrice;

  const price = normalizeMoney(
    rawPrice,
    "Product price"
  );

  let discountPrice;

  if (
    rawDiscountPrice !== null &&
    rawDiscountPrice !== undefined
  ) {
    discountPrice = normalizeMoney(
      rawDiscountPrice,
      "Product discount price"
    );

    if (discountPrice >= price) {
      throw new HandleError(
        "Discount price must be less than the regular price",
        500
      );
    }
  }

  const finalPrice =
    discountPrice ?? price;

  const currency =
    normalizeString(
      variant?.currency
    ) ??
    normalizeString(product.currency) ??
    "INR";

  return {
    price,
    discountPrice,
    finalPrice,
    currency: currency.toUpperCase(),
  };
};

/**
 * Find the best image from an images array.
 *
 * Priority:
 * 1. Primary image
 * 2. Lowest position
 * 3. First valid image
 */
export const getPrimaryImage = ({
  images = [],
  fallbackAlt = "",
} = {}) => {
  if (!Array.isArray(images)) {
    return {};
  }

  const validImages = images.filter(
    (image) => {
      return Boolean(
        normalizeString(image?.url)
      );
    }
  );

  if (validImages.length === 0) {
    return {};
  }

  const primaryImage = validImages.find(
    (image) => image.isPrimary === true
  );

  const selectedImage =
    primaryImage ??
    [...validImages].sort((a, b) => {
      const firstPosition =
        Number.isFinite(Number(a.position))
          ? Number(a.position)
          : Number.MAX_SAFE_INTEGER;

      const secondPosition =
        Number.isFinite(Number(b.position))
          ? Number(b.position)
          : Number.MAX_SAFE_INTEGER;

      return (
        firstPosition -
        secondPosition
      );
    })[0];

  return {
    public_id: normalizeString(
      selectedImage.public_id
    ),

    url: normalizeString(
      selectedImage.url
    ),

    alt:
      normalizeString(selectedImage.alt) ??
      normalizeString(fallbackAlt),
  };
};

/**
 * Variant image gets priority over product image.
 */
export const getCartItemImage = (
  product,
  variant = null
) => {
  const fallbackAlt =
    variant?.title ?? product?.name ?? "";

  const variantImage = getPrimaryImage({
    images: variant?.images,
    fallbackAlt,
  });

  if (variantImage.url) {
    return variantImage;
  }

  return getPrimaryImage({
    images: product?.images,
    fallbackAlt: product?.name,
  });
};

/**
 * Copy selected variant attributes into the cart.
 */
export const getSelectedAttributes = (
  variant = null
) => {
  if (!variant) {
    return [];
  }

  if (!Array.isArray(variant.attributes)) {
    throw new HandleError(
      "Variant attributes are not configured correctly",
      500
    );
  }

  return variant.attributes.map(
    (attribute) => {
      const attributeName =
        normalizeString(
          attribute.attributeName
        );

      const attributeSlug =
        normalizeString(
          attribute.attributeSlug
        )?.toLowerCase();

      const attributeType =
        normalizeString(
          attribute.attributeType
        );

      const optionLabel =
        normalizeString(
          attribute.optionLabel
        );

      const optionValue =
        normalizeString(
          attribute.optionValue
        )?.toLowerCase();

      const colorCode =
        normalizeString(
          attribute.colorCode
        );

      if (
        !attributeSlug ||
        !optionValue
      ) {
        throw new HandleError(
          "Variant attribute data is not configured correctly",
          500
        );
      }

      return {
        attributeName,
        attributeSlug,
        attributeType,
        optionLabel,
        optionValue,
        colorCode,
      };
    }
  );
};

/**
 * Find the same product and variant in the cart.
 */
export const findExistingCartItem = ({
  cart,
  productId,
  variantId = null,
}) => {
  if (
    !cart ||
    !Array.isArray(cart.items)
  ) {
    return undefined;
  }

  const normalizedProductId =
    normalizeDocumentId(productId);

  const normalizedVariantId =
    normalizeDocumentId(variantId);

  return cart.items.find((item) => {
    const cartProductId =
      normalizeDocumentId(item.product);

    const cartVariantId =
      normalizeDocumentId(item.variant);

    const isSameProduct =
      cartProductId ===
      normalizedProductId;

    const isSameVariant =
      cartVariantId ===
      normalizedVariantId;

    return (
      isSameProduct &&
      isSameVariant
    );
  });
};

/**
 * Create trusted cart-item data from product
 * and variant database documents.
 */
export const buildCartItemSnapshot = ({
  product,
  variant = null,
  priceSnapshot,
}) => {
  if (!product) {
    throw new HandleError(
      "Product information is unavailable",
      500
    );
  }

  if (!priceSnapshot) {
    throw new HandleError(
      "Price information is unavailable",
      500
    );
  }

  const name = normalizeString(
    product.name
  );

  if (!name) {
    throw new HandleError(
      "Product name is not configured correctly",
      500
    );
  }

  const sku =
    normalizeString(variant?.sku) ??
    normalizeString(product.sku);

  return {
    name,

    slug: normalizeString(
      product.slug
    )?.toLowerCase(),

    sku: sku?.toUpperCase(),

    image: getCartItemImage(
      product,
      variant
    ),

    selectedAttributes:
      getSelectedAttributes(variant),

    price: priceSnapshot.price,

    discountPrice:
      priceSnapshot.discountPrice,

    finalPrice:
      priceSnapshot.finalPrice,

    currency:
      priceSnapshot.currency,
  };
};