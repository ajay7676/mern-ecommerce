import { useCallback, useEffect, useMemo, useState } from "react";
import {
    findDefaultVariant,
    findMatchingVariant,
    getAvailableQuantity,
    getVariantSelection,
    isOptionAvailable,
    isVariantAvailable,
} from '../../../utils/variantSelection';


const getAttributeOrder = (
  options
) => {
  const availableSlugs =
    Object.keys(options ?? {});

  const preferredOrder = [
    "color",
    "size",
  ];

  const orderedSlugs =
    preferredOrder.filter((slug) => {
      return availableSlugs.includes(
        slug
      );
    });

  const remainingSlugs =
    availableSlugs.filter((slug) => {
      return !orderedSlugs.includes(
        slug
      );
    });

  return [
    ...orderedSlugs,
    ...remainingSlugs,
  ];
};

const useVariantSelection = ({
  variants = [],
  options = {},
  fallbackInventory = null,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState({});

  const [quantity, setQuantity] =
    useState(1);

  const attributeOrder = useMemo(
    () => getAttributeOrder(options),
    [options]
  );

  const defaultVariant = useMemo(
    () => findDefaultVariant(variants),
    [variants]
  );

  /*
   * Initialize selection using default variant.
   * It will not reset during a normal refetch if
   * the default variant ID remains unchanged.
   */
  useEffect(() => {
    if (!defaultVariant) {
      setSelectedOptions({});
      return;
    }

    setSelectedOptions(
      getVariantSelection(
        defaultVariant
      )
    );
  }, [defaultVariant?._id]);

  const selectedVariant = useMemo(
    () =>
      findMatchingVariant({
        variants,
        selectedOptions,
        attributeOrder,
      }),
    [
      variants,
      selectedOptions,
      attributeOrder,
    ]
  );

  const selectOption = useCallback(
    (attributeSlug, optionValue) => {
      setSelectedOptions(
        (currentSelection) => {
          const nextSelection = {
            ...currentSelection,

            [attributeSlug]:
              optionValue,
          };

          const selectedIndex =
            attributeOrder.indexOf(
              attributeSlug
            );

          /*
           * Clear later selections that are no
           * longer valid.
           *
           * Example:
           * Black + L selected
           * Change Black to Red
           * If Red + L does not exist, size clears.
           */
          for (
            let index =
              selectedIndex + 1;
            index <
            attributeOrder.length;
            index += 1
          ) {
            const nextSlug =
              attributeOrder[index];

            const nextValue =
              nextSelection[nextSlug];

            if (!nextValue) continue;

            const available =
              isOptionAvailable({
                variants,
                selectedOptions:
                  nextSelection,
                attributeOrder,
                attributeSlug:
                  nextSlug,
                optionValue:
                  nextValue,
              });

            if (!available) {
              delete nextSelection[
                nextSlug
              ];
            }
          }

          return nextSelection;
        }
      );

      setQuantity(1);
    },
    [variants, attributeOrder]
  );

  const isOptionDisabled =
    useCallback(
      (
        attributeSlug,
        optionValue
      ) => {
        return !isOptionAvailable({
          variants,
          selectedOptions,
          attributeOrder,
          attributeSlug,
          optionValue,
        });
      },
      [
        variants,
        selectedOptions,
        attributeOrder,
      ]
    );

  const inventory =
    selectedVariant ??
    fallbackInventory;

  const availableQuantity =
    getAvailableQuantity(inventory);

  const maximumQuantity =
    availableQuantity === Infinity
      ? 100
      : Math.min(
          availableQuantity,
          100
        );

  useEffect(() => {
    setQuantity((current) => {
      if (maximumQuantity < 1) {
        return 1;
      }

      return Math.min(
        current,
        maximumQuantity
      );
    });
  }, [maximumQuantity]);

  const updateQuantity = useCallback(
    (value) => {
      const numericValue =
        Number(value);

      if (
        !Number.isInteger(
          numericValue
        )
      ) {
        return;
      }

      const safeMaximum =
        Math.max(
          maximumQuantity,
          1
        );

      setQuantity(
        Math.min(
          Math.max(numericValue, 1),
          safeMaximum
        )
      );
    },
    [maximumQuantity]
  );

  const hasVariants =
    variants.length > 0;

  const allOptionsSelected =
    attributeOrder.every((slug) => {
      return Boolean(
        selectedOptions[slug]
      );
    });

  const canAddToCart = hasVariants
    ? Boolean(
        allOptionsSelected &&
          selectedVariant &&
          isVariantAvailable(
            selectedVariant
          )
      )
    : isVariantAvailable(
        fallbackInventory
      );

  return {
    selectedOptions,
    selectedVariant,
    attributeOrder,

    quantity,
    updateQuantity,

    maximumQuantity,
    availableQuantity,

    selectOption,
    isOptionDisabled,

    allOptionsSelected,
    canAddToCart,
  };
};

export default useVariantSelection;
