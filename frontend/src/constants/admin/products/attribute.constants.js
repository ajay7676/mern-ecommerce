export const ATTRIBUTE_TYPESS = {
  DROPDOWN: "dropdown",
  SWITCH: "switch",
  TEXT: "text",
  BOOLEAN: "boolean",
  NUMBER: "number",
};

export const ATTRIBUTE_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};
export const ATTRIBUTE_TYPES = [
  {
    value: "dropdown",
    label: "Dropdown",
  },
  {
    value: "switch",
    label: "Switch",
  },
  {
    value: "text",
    label: "Text",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
];

export const VALUE_DISPLAY_TYPES = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "color",
    label: "Color",
  },
  {
    value: "image",
    label: "Image",
  },
];

export const DEFAULT_ATTRIBUTE_VALUES = [
  {
    id: crypto.randomUUID(),
    value: "Black",
    color: "#000000",
    isDefault: true,
  },
  {
    id: crypto.randomUUID(),
    value: "White",
    color: "#ffffff",
    isDefault: false,
  },
  {
    id: crypto.randomUUID(),
    value: "Red",
    color: "#ef1d25",
    isDefault: false,
  },
  {
    id: crypto.randomUUID(),
    value: "Blue",
    color: "#243cff",
    isDefault: false,
  },
  {
    id: crypto.randomUUID(),
    value: "Green",
    color: "#16a34a",
    isDefault: false,
  },
];