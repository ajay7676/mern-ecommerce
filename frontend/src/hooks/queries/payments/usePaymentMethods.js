import { useState } from "react";

import {
  EMPTY_CARD_FORM,
} from '../../../constants/payments/payment.constants';

import { paymentMethodsData } from "../../../constants/payments/paymentMethods.data";
import {
  detectCardBrand,
  formatCardNumberInput,
  formatExpiryDateInput,
  maskCardNumber,
} from "../../../utils/payment.utils";

const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const usePaymentMethods = () => {
  const [methods, setMethods] = useState(paymentMethodsData);
  const [form, setForm] = useState(EMPTY_CARD_FORM);
  const [errors, setErrors] = useState({});
  const [editingMethodId, setEditingMethodId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors = {};
    const normalizedCardNumber = form.cardNumber.replace(/\D/g, "");

    if (!form.cardHolderName.trim()) {
      nextErrors.cardHolderName = "Cardholder name is required";
    }

    if (normalizedCardNumber.length !== 16) {
      nextErrors.cardNumber = "Enter a valid 16-digit card number";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate)) {
      nextErrors.expiryDate = "Enter expiry date in MM/YY format";
    }

    if (!/^\d{3,4}$/.test(form.cvv)) {
      nextErrors.cvv = "Enter a valid CVV";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const openAddCardModal = () => {
    setEditingMethodId(null);
    setForm(EMPTY_CARD_FORM);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMethodId(null);
    setForm(EMPTY_CARD_FORM);
    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    let nextValue = type === "checkbox" ? checked : value;

    if (name === "cardNumber") {
      nextValue = formatCardNumberInput(value);
    }

    if (name === "expiryDate") {
      nextValue = formatExpiryDateInput(value);
    }

    if (name === "cvv") {
      nextValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const editMethod = (method) => {
    if (method.type === "upi") {
      return;
    }

    setEditingMethodId(method.id);

    setForm({
      cardHolderName: method.holderName,
      cardNumber: "",
      expiryDate: method.expiryDate,
      cvv: "",
      setAsDefault: method.isDefault,
    });

    setErrors({});
    setIsModalOpen(true);
  };

  const saveMethod = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await wait(500);

      const newMethod = {
        id: editingMethodId ?? `payment-${Date.now()}`,
        type: detectCardBrand(form.cardNumber),
        brand:
          detectCardBrand(form.cardNumber) === "visa"
            ? "Visa"
            : "Mastercard",
        maskedNumber: maskCardNumber(form.cardNumber),
        expiryDate: form.expiryDate,
        holderName: form.cardHolderName,
        isDefault: form.setAsDefault,
      };

      setMethods((currentMethods) => {
        let updatedMethods;

        if (editingMethodId) {
          updatedMethods = currentMethods.map((method) =>
            method.id === editingMethodId
              ? {
                  ...method,
                  ...newMethod,
                  maskedNumber:
                    newMethod.maskedNumber || method.maskedNumber,
                }
              : method,
          );
        } else {
          updatedMethods = [...currentMethods, newMethod];
        }

        if (newMethod.isDefault) {
          return updatedMethods.map((method) => ({
            ...method,
            isDefault: method.id === newMethod.id,
          }));
        }

        return updatedMethods;
      });

      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeMethod = (methodId) => {
    setMethods((currentMethods) =>
      currentMethods.filter(
        (method) => method.id !== methodId,
      ),
    );
  };

  const setDefaultMethod = (methodId) => {
    setMethods((currentMethods) =>
      currentMethods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      })),
    );
  };

  return {
    methods,
    form,
    errors,
    isModalOpen,
    isEditing: Boolean(editingMethodId),
    isSubmitting,
    openAddCardModal,
    closeModal,
    handleChange,
    editMethod,
    saveMethod,
    removeMethod,
    setDefaultMethod,
  };
};

export default usePaymentMethods;