export const DEFAULT_ATTRIBUTE_VALUES = [
  {
    label: "",
    value: "",
    isDefault: true,
    sortOrder: 0,
  },
];

// export const defaultAttributeFormValues = {
//   name: "",
//   slug: "",
//   type: "dropdown",

//   unit: "",
//   description: "",

//   values: DEFAULT_ATTRIBUTE_VALUES,

//   defaultValue: "",

//   status: "active",

//   showInFilter: true,
//   showOnProductPage: true,

//   placeholder: "",

//   isRequired: false,

//   maxLength: null,

//   minValue: null,
//   maxValue: null,
//   stepValue: 1,
// };
export const defaultAttributeFormValues = () => ({
  name: "",
  slug: "",
  type: "dropdown",

  unit: "",
  description: "",

  values: DEFAULT_ATTRIBUTE_VALUES,

  defaultValue: "",

  status: "active",

  showInFilter: true,
  showOnProductPage: true,

  placeholder: "",

  isRequired: false,

  maxLength: null,

  minValue: null,
  maxValue: null,
  stepValue: 1,
});
