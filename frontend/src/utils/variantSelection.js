export const getVariantAttributeValue = (variant, attributeSlug) => {
  const attribute = variant?.attributes?.find((item) => {
    return item.attributeSlug === attributeSlug;
  });

  return attribute?.optionValue ?? null;
};

/**
 *const variant = {
  title: "Black / Large",
  attributes: [
    {
      attributeName: "Color",
      attributeSlug: "color",
      optionValue: "black",
    },
    {
      attributeName: "Size",
      attributeSlug: "size",
      optionValue: "large",
    },
  ],
};   
  {
  color: "black",
  size: "large",
}
 */
export const getVariantSelection = (variant) => {
  if (!variant?.attributes) {
    return {};
  }

  return variant.attributes.reduce((selection, attribute) => {
    selection[attribute.attributeSlug] = attribute.optionValue;

    return selection;
  }, {});
};

export const isVariantAvailable = (variant) => {
  if (!variant) return false;

  if (variant.isDeleted || (variant.status && variant.status !== "active")) {
    return false;
  }

  if (variant.trackInventory === false || variant.allowBackorder === true) {
    return true;
  }

  if (typeof variant.isInStock === "boolean") {
    return variant.isInStock;
  }

  const stock = Number(variant.availableStock ?? variant.stock);

  return Number.isFinite(stock) && stock > 0;
};

export const getAvailableQuantity = (inventory) => {
  if (!inventory) return 0;

  if (inventory.trackInventory === false || inventory.allowBackorder === true) {
    return Infinity;
  }

  const stock = Number(inventory.availableStock ?? inventory.stock);

  if (!Number.isFinite(stock)) {
    return 0;
  }

  return Math.max(Math.floor(stock), 0);
};

/**
 *const variant = {
  title: "Black / Large",
  attributes: [
    {
      attributeName: "Color",
      attributeSlug: "color",
      optionValue: "black",
    },
    {
      attributeName: "Size",
      attributeSlug: "size",
      optionValue: "large",
    },
  ],
};   
  

 */

export const findDefaultVariant = (variants = []) => {
  const defaultVariant = variants.find((variant) => {
    return variant.isDefault && isVariantAvailable(variant);
  });

  if (defaultVariant) {
    return defaultVariant;
  }

  return variants.find(isVariantAvailable) ?? variants[0] ?? null;
};

export const findMatchingVariant = ({
  variants = [],
  selectedOptions = {},
  attributeOrder = [],
}) => {
  if (
    attributeOrder.length === 0 ||
    attributeOrder.some((slug) => !selectedOptions[slug])
  ) {
    return null;
  }

  return (
    variants.find((variant) => {
      return attributeOrder.every((attributeSlug) => {
        return (
          getVariantAttributeValue(variant, attributeSlug) ===
          selectedOptions[attributeSlug]
        );
      });
    }) ?? null
  );
};

/**
 * Check availability using earlier selections.
 *
 * Color comes before size, so:
 * - Color availability is checked globally.
 * - Size availability depends on selected color.
 */
/**
 * 
 * 
 * const attributeOrder = ["color", "size"];

const selectedOptions = {
  color: "black",
};

const variants = [
  {
    attributes: [
      {
        attributeSlug: "color",
        optionValue: "black",
      },
      {
        attributeSlug: "size",
        optionValue: "m",
      },
    ],
    stock: 5,
    status: "active",
  },
  {
    attributes: [
      {
        attributeSlug: "color",
        optionValue: "black",
      },
      {
        attributeSlug: "size",
        optionValue: "l",
      },
    ],
    stock: 0,
    status: "active",
  },
];
 * 
 */

export const isOptionAvailable = ({
  variants = [],
  selectedOptions = {},
  attributeOrder = [],
  attributeSlug,
  optionValue,
}) => {
  const currentIndex = attributeOrder.indexOf(attributeSlug);

  if (currentIndex === -1) {
    return false;
  }

  const requiredSelection = {
    [attributeSlug]: optionValue,
  };

  for (let index = 0; index < currentIndex; index += 1) {
    const previousSlug = attributeOrder[index];

    if (selectedOptions[previousSlug]) {
      requiredSelection[previousSlug] = selectedOptions[previousSlug];
    }
  }

  return variants.some((variant) => {
    if (!isVariantAvailable(variant)) {
      return false;
    }

    return Object.entries(requiredSelection).every(([slug, value]) => {
      return getVariantAttributeValue(variant, slug) === value;
    });
  });
};
