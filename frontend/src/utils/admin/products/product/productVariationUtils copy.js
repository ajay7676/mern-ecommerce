
export const DUMMY_VARIANT_IMAGES = {
  black: "https://placehold.co/120x120/111827/ffffff?text=Black",
  white: "https://placehold.co/120x120/f8fafc/111827?text=White",
  blue: "https://placehold.co/120x120/2563eb/ffffff?text=Blue",
  red: "https://placehold.co/120x120/dc2626/ffffff?text=Red",
  default: "https://placehold.co/120x120/f8fafc/111827?text=Product",
};

export const ATTRIBUTE_TYPE_OPTIONS = [
  { label: "Dropdown", value: "dropdown" },
  { label: "Color", value: "color" },
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
];


export const EXISTING_PRODUCT_ATTRIBUTES = [
  {
    attributeId: "attr-size",
    name: "Size",
    type: "dropdown",
    source: "existing",
    options: [
      { optionId: "size-s", label: "S", value: "s" },
      { optionId: "size-m", label: "M", value: "m" },
      { optionId: "size-l", label: "L", value: "l" },
      { optionId: "size-xl", label: "XL", value: "xl" },
    ],
  },
  {
    attributeId: "attr-color",
    name: "Color",
    type: "color",
    source: "existing",
    options: [
      { optionId: "color-black", label: "Black", value: "black", colorCode: "#111827" },
      { optionId: "color-white", label: "White", value: "white", colorCode: "#f8fafc" },
      { optionId: "color-blue", label: "Blue", value: "blue", colorCode: "#2563eb" },
      { optionId: "color-red", label: "Red", value: "red", colorCode: "#dc2626" },
    ],
  },
  {
    attributeId: "attr-material",
    name: "Material",
    type: "dropdown",
    source: "existing",
    options: [
      { optionId: "material-cotton", label: "Cotton", value: "cotton" },
      { optionId: "material-polyester", label: "Polyester", value: "polyester" },
      { optionId: "material-linen", label: "Linen", value: "linen" },
    ],
  },
  {
    attributeId: "attr-brand",
    name: "Brand",
    type: "dropdown",
    source: "existing",
    options: [
      { optionId: "brand-adidas", label: "Adidas", value: "adidas" },
      { optionId: "brand-nike", label: "Nike", value: "nike" },
    ],
  },
];


export const createClientId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const slugifyValue = (value = "") => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const cloneAttribute = (attribute) => ({
  ...attribute,
  attributeId: attribute.attributeId || createClientId(),
  options: attribute.options.map((option) => ({ ...option })),
});

export const createCustomAttribute = () => ({
  attributeId: createClientId(),
  name: "",
  type: "dropdown",
  source: "custom",
  options: [],
});

export const createAttributeOption = (label = "", type = "dropdown") => {
  const value = slugifyValue(label);

  return {
    optionId: createClientId(),
    label,
    value,
    colorCode: type === "color" ? "#111827" : null,
  };
};

export const getDefaultSelectedAttributes = () => [];

const getSkuPart = (value = "") => {
  const map = {
    black: "BLK",
    white: "WHT",
    blue: "BLU",
    red: "RED",
    cotton: "COT",
    polyester: "POL",
    linen: "LIN",
  };

  const key = String(value).toLowerCase();

  return map[key] || String(value).replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase();
};

const buildCombinations = (attributes = []) => {
  const validAttributes = attributes.filter(
    (attribute) => attribute.name?.trim() && attribute.options?.length
  );

  if (!validAttributes.length) return [];

  return validAttributes.reduce(
    (combinations, attribute) => {
      return combinations.flatMap((combination) => {
        return attribute.options.map((option) => ({
          ...combination,
          [attribute.name]: {
            attributeId: attribute.attributeId,
            attributeName: attribute.name,
            optionId: option.optionId,
            label: option.label,
            value: option.value,
            colorCode: option.colorCode || null,
          },
        }));
      });
    },
    [{}]
  );
};

export const calculatePossibleVariantCount = (attributes = []) => {
  const validAttributes = attributes.filter(
    (attribute) => attribute.name?.trim() && attribute.options?.length
  );

  if (!validAttributes.length) return 0;

  return validAttributes.reduce((total, attribute) => {
    return total * attribute.options.length;
  }, 1);
};

export const generateVariantsFromAttributes = ({
  attributes,
  baseSku = "TSHIRT",
  sellingPrice = "999.00",
}) => {
  const combinations = buildCombinations(attributes);

  return combinations.map((attributeMap, index) => {
    const values = Object.values(attributeMap);
    const variantName = values.map((item) => item.label).join(" / ");

    const skuSuffix = values.map((item) => getSkuPart(item.value)).join("-");

    const colorOption = values.find(
      (item) => item.attributeName.toLowerCase() === "color"
    );

    const imageUrl =
      DUMMY_VARIANT_IMAGES[colorOption?.value] || DUMMY_VARIANT_IMAGES.default;

    return {
      variantId: createClientId(),
      name: variantName,
      sku: `${baseSku || "TSHIRT"}-${skuSuffix}`,
      price: String(sellingPrice || "999.00"),
      stock: String([25, 30, 18, 12, 8, 22][index % 6]),
      status: true,
      source: "auto",
      imageUrl,
      images: [
        {
          imageId: createClientId(),
          url: imageUrl,
          isPrimary: true,
        },
      ],
      attributeValues: attributeMap,
    };
  });
};

export const getDefaultProductVariants = () => {
  return generateVariantsFromAttributes({
    attributes: getDefaultSelectedAttributes(),
    baseSku: "TSHIRT",
    sellingPrice: "999.00",
  });
};

export const createManualVariant = ({
  selectedOptions,
  baseSku = "TSHIRT",
  price = "999.00",
  stock = "0",
}) => {
  const values = Object.values(selectedOptions || {});
  const variantName = values.map((item) => item.label).join(" / ");
  const skuSuffix = values.map((item) => getSkuPart(item.value)).join("-");

  const colorOption = values.find(
    (item) => item.attributeName?.toLowerCase() === "color"
  );

  const imageUrl =
    DUMMY_VARIANT_IMAGES[colorOption?.value] || DUMMY_VARIANT_IMAGES.default;

  return {
    variantId: createClientId(),
    name: variantName,
    sku: `${baseSku || "TSHIRT"}-${skuSuffix}`,
    price: String(price || "999.00"),
    stock: String(stock || "0"),
    status: true,
    source: "manual",
    imageUrl,
    images: [
      {
        imageId: createClientId(),
        url: imageUrl,
        isPrimary: true,
      },
    ],
    attributeValues: selectedOptions,
  };
};

export const calculateVariantStats = (variants = [], lowStockThreshold = 10) => {
  const totalVariants = variants.length;
  const activeVariants = variants.filter((variant) => variant.status).length;
  const inactiveVariants = totalVariants - activeVariants;

  const lowStockVariants = variants.filter((variant) => {
    const stock = Number(variant.stock || 0);
    return stock > 0 && stock <= Number(lowStockThreshold || 10);
  }).length;

  return {
    totalVariants,
    activeVariants,
    inactiveVariants,
    lowStockVariants,
  };
};

export const createVariantImagePreview = (file) => ({
  imageId: createClientId(),
  name: file.name,
  size: file.size,
  type: file.type,
  url: URL.createObjectURL(file),
  file,
  isPrimary: true,
});