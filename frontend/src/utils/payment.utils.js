export const getLastFourDigits = (cardNumber = "") => {
  return cardNumber.replace(/\D/g, "").slice(-4);
};

export const maskCardNumber  = (cardNumber = "") => {
      
    const lastFourDigits = getLastFourDigits(cardNumber);

    if(!lastFourDigits) return "";

    return `**** **** **** ${lastFourDigits}`;
}

export const detectCardBrand = (cardNumber = "") => {
  const normalizedCardNumber = cardNumber.replace(/\D/g, "");

  if (/^4/.test(normalizedCardNumber)) {
    return "visa";
  }

  if (/^(5[1-5]|2[2-7])/.test(normalizedCardNumber)) {
    return "mastercard";
  }

  return "unknown";
};

export const formatCardNumberInput = (value = "") => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatExpiryDateInput = (value = "") => {
  const normalizedValue = value.replace(/\D/g, "").slice(0, 4);

  if (normalizedValue.length <= 2) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, 2)}/${normalizedValue.slice(2)}`;
};