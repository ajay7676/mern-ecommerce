import { useCallback, useState } from "react";
import PricingInventory from "./PricingInventory";

const initialProductData = {
  price: "2345",
  discountPrice: "",
  costPrice: "",
  currency: "INR",
  stock: "",
  lowStockThreshold: "5",
  trackInventory: true,
  allowBackorder: false,
};

const PricingInventoryCard = () => {
  const [productData, setProductData] = useState(initialProductData);
  const [errors, setErrors] = useState({});

  const handleFieldChange = useCallback((fieldName, value) => {
    setProductData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
  }, []);

  return (
     <PricingInventory
      values={productData}
      errors={errors}
      onChange={handleFieldChange}
    />
  )
};

export default PricingInventoryCard;
