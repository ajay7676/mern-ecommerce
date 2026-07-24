import { useState } from "react";
import { addressesData } from '../../../constants/address/addresses.data'
import {
  createEmptyAddress,
  getAddressTypeLabel,
} from "../../../utils/address.utils";

const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const useAddresses = () => {
  const [addresses, setAddresses] = useState(addressesData);
  const [form, setForm] = useState(createEmptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      nextErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      nextErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (!form.addressLine1.trim()) {
      nextErrors.addressLine1 = "Address is required";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required";
    }

    if (!form.state) {
      nextErrors.state = "State is required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const startAddAddress = () => {
    setEditingAddressId(null);
    setForm(createEmptyAddress());
    setErrors({});

    document
      .getElementById("address-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const startEditAddress = (address) => {
    setEditingAddressId(address.id);
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      pincode: address.pincode,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      type: address.type,
      isDefault: address.isDefault,
    });

    setErrors({});

    document
      .getElementById("address-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingAddressId(null);
    setForm(createEmptyAddress());
    setErrors({});
  };

  const saveAddress = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await wait(400);

      const newAddress = {
        ...form,
        id: editingAddressId ?? `address-${Date.now()}`,
        label: getAddressTypeLabel(form.type),
        country: "India",
      };

      setAddresses((currentAddresses) => {
        let updatedAddresses;

        if (editingAddressId) {
          updatedAddresses = currentAddresses.map((address) =>
            address.id === editingAddressId
              ? newAddress
              : address,
          );
        } else {
          updatedAddresses = [
            ...currentAddresses,
            newAddress,
          ];
        }

        if (newAddress.isDefault) {
          return updatedAddresses.map((address) => ({
            ...address,
            isDefault: address.id === newAddress.id,
          }));
        }

        return updatedAddresses;
      });

      cancelEditing();
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDefaultAddress = (addressId) => {
    setAddresses((currentAddresses) =>
      currentAddresses.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    );
  };

  const deleteAddress = (addressId) => {
    setAddresses((currentAddresses) =>
      currentAddresses.filter(
        (address) => address.id !== addressId,
      ),
    );

    if (editingAddressId === addressId) {
      cancelEditing();
    }
  };

  return {
    addresses,
    form,
    errors,
    isEditing: Boolean(editingAddressId),
    isSubmitting,
    handleChange,
    startAddAddress,
    startEditAddress,
    cancelEditing,
    saveAddress,
    setDefaultAddress,
    deleteAddress,
  };
};

export default useAddresses;