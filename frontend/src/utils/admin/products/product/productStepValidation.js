import { getFirstErrorFromFields } from "./productFormErrorUtils";

export const PRODUCT_STEP_FIELDS = {
  1: [
    "productName",
    "sku",
    "shortDescription",
    "productType",
    "category",
    "brand",
    "description",
    "metaTitle",
    "metaDescription",
    "metaKeywords",
    "status",
    "visibility.onlineStore",
    "visibility.mobileApp",
    "visibility.pos",
  ],

  2: [
    "sellingPrice",
    "discountType",
    "discountValue",
    "taxClass",
    "costPrice",
    "mrp",
    "specialPrice",
    "specialPriceFrom",
    "specialPriceTo",
    "sku",
    "barcode",
    "trackInventory",
    "stockQuantity",
    "lowStockThreshold",
    "units",
    "allowBackorders",
  ],

  3: [
    "images",
    "imageAltText",
    "displayOrder",
    "imageZoom",
    "videoUrl",
  ],

  4: ["attributes", "variants"],

  5: [
    "productTypeDetail",
    "collection",
    "tags",
    "hsnCode",
    "countryOfOrigin",
    "warrantyInformation",
    "returnPolicy",
    "careInstructions",
    "userManual",
    "safetyInformation",
    "customFields",
  ],

  6: ["publishOption", "scheduleDate", "scheduleTime"],
};

export const validateProductStep = async ({
  methods,
  activeStep,
}) => {
  const fields = PRODUCT_STEP_FIELDS[activeStep];

  if (!fields) {
    return true;
  }

  const isValid = await methods.trigger(fields, {
    shouldFocus: true,
  });

  return isValid;
};

export const validateAllProductSteps = async (methods) => {
  const allFields = Object.values(PRODUCT_STEP_FIELDS).flat();
  console.log(allFields)

  const isValid = await methods.trigger(allFields, {
    shouldFocus: true,
  });

  return isValid;
};


export const getFirstStepFromFields = (fieldNames = []) => {
  for (const fieldName of fieldNames) {
    const matchedEntry = Object.entries(PRODUCT_STEP_FIELDS).find(
      ([, fields]) =>
        fields.some(
          (field) => field === fieldName || fieldName.startsWith(`${field}.`)
        )
    );

    if (matchedEntry) {
      return Number(matchedEntry[0]);
    }
  }

  return null;
};

export const validateProductWizardInOrder = async (methods) => {
  const stepNumbers = Object.keys(PRODUCT_STEP_FIELDS)
    .map(Number)
    .sort((a, b) => a - b);

  for (const step of stepNumbers) {
    const fields = PRODUCT_STEP_FIELDS[step];

    const isStepValid = await methods.trigger(fields, {
      shouldFocus: true,
    });

    if (!isStepValid) {
      // Important: wait for RHF errors update
      await Promise.resolve();

      const firstError = getFirstErrorFromFields(
        methods.formState.errors,
        fields
      );

      return {
        isValid: false,
        step,
        field: firstError.field,
        message: firstError.message || "Please fill required fields",
      };
    }
  }

  return {
    isValid: true,
    step: null,
    field: null,
    message: "",
  };
};