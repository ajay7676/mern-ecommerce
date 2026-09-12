export const getAttributeDefaultValues = () => {
  return {
    name: "Size",
    slug: "size",
    type: "dropdown",

    values: [
      {
        label: "XS",
        value: "xs",
        colorCode: "#000000",
      },
      {
        label: "S",
        value: "s",
        colorCode: "#000000",
      },
      {
        label: "M",
        value: "m",
        colorCode: "#000000",
      },
      {
        label: "L",
        value: "l",
        colorCode: "#000000",
      },
      {
        label: "XL",
        value: "xl",
        colorCode: "#000000",
      },
    ],

    placeholder: "",
    defaultValue: "",

    minValue: "",
    maxValue: "",
    step: "",
    unit: "",

    maxLength: "",

    trueLabel: "Yes",
    falseLabel: "No",

    isRequired: false,
    showInFilter: true,
    showOnProductPage: true,
    status: "active",
    sortOrder: 0,
  };
};

export const getDefaultValuesByType = (type) => {
  const common = {
    name: "",
    slug: "",
    type,
    values: [],
    placeholder: "",
    defaultValue: "",
    minValue: "",
    maxValue: "",
    step: "",
    unit: "",
    maxLength: "",
    trueLabel: "",
    falseLabel: "",
    isRequired: false,
    showInFilter: true,
    showOnProductPage: true,
    status: "active",
    sortOrder: 0,
  };

  if (type === "dropdown") {
    return {
      ...common,
      name: "Size",
      slug: "size",
      values: [
        { label: "XS", value: "xs", colorCode: "#000000" },
        { label: "S", value: "s", colorCode: "#000000" },
        { label: "M", value: "m", colorCode: "#000000" },
        { label: "L", value: "l", colorCode: "#000000" },
        { label: "XL", value: "xl", colorCode: "#000000" },
      ],
    };
  }

  if (type === "switch") {
    return {
      ...common,
      name: "Color",
      slug: "color",
      values: [
        { label: "Black", value: "black", colorCode: "#000000" },
        { label: "White", value: "white", colorCode: "#ffffff" },
        { label: "Red", value: "red", colorCode: "#ef4444" },
        { label: "Blue", value: "blue", colorCode: "#2563eb" },
        { label: "Green", value: "green", colorCode: "#10b981" },
      ],
    };
  }

  if (type === "text") {
    return {
      ...common,
      name: "Engraving Text",
      slug: "engraving-text",
      placeholder: "Enter your text here",
      maxLength: "50",
      defaultValue: "",
      showInFilter: false,
    };
  }

  if (type === "number") {
    return {
      ...common,
      name: "Weight",
      slug: "weight",
      minValue: "0",
      maxValue: "100",
      step: "0.1",
      unit: "kg",
      defaultValue: "0.5",
    };
  }

  return {
    ...common,
    name: "Is Fragile",
    slug: "is-fragile",
    trueLabel: "Yes, this product is fragile",
    falseLabel: "No",
    defaultValue: "false",
    showInFilter: false,
  };
};

