export const formatAttributeType = (type) => {
  const labels = {
    dropdown: "Dropdown",
    switch: "Switch",
    text: "Text",
    number: "Number",
    boolean: "Boolean",
  };

  return labels[type] || type;
};