
import PriceField from "./PriceField";
import DiscountField from "./DiscountField";
import CostPriceField from "./CostPriceField";
import CurrencySelect from "./CurrencySelect";
import StockField from "./StockField";
import LowStockField from "./LowStockField";
import InventorySwitches from "./InventorySwitches";
import Card from "../card/Card";


const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};


const PricingInventoryCard = ({
  values = {},
  errors = {},
  disabled = false,
  onChange,
}) => {

  const currency = values.currency || "INR";

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || currency;

  const trackInventory =
    values.trackInventory ?? true;

  const allowBackorder =
    values.allowBackorder ?? false;

  const handleTrackInventoryChange = (checked) => {
    onChange("trackInventory", checked);

    // Backorder is not required when inventory
    // tracking is disabled.
    if (!checked && allowBackorder) {
      onChange("allowBackorder", false);
    }
  };

  return (
    <Card
      title="Pricing &amp; Inventory"
      className="overflow-visible"
      bodyClassName="pt-5"
    >
      
      <div className="grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        <PriceField
          value={values.price ?? ""}
          currencySymbol={currencySymbol}
          error={errors.price}
          disabled={disabled}
          onChange={(value) => onChange("price", value)}
        />

        <DiscountField
          value={values.discountPrice ?? ""}
          currencySymbol={currencySymbol}
          error={errors.discountPrice}
          disabled={disabled}
          onChange={(value) =>
            onChange("discountPrice", value)
          }
        />

        <CostPriceField
          value={values.costPrice ?? ""}
          currencySymbol={currencySymbol}
          error={errors.costPrice}
          disabled={disabled}
          onChange={(value) =>
            onChange("costPrice", value)
          }
        />

        <CurrencySelect
          value={currency}
          error={errors.currency}
          disabled={disabled}
          onChange={(value) =>
            onChange("currency", value)
          }
        />

        <StockField
          value={values.stock ?? ""}
          error={errors.stock}
          disabled={disabled || !trackInventory}
          onChange={(value) => onChange("stock", value)}
        />

        <LowStockField
          value={values.lowStockThreshold ?? ""}
          error={errors.lowStockThreshold}
          disabled={disabled || !trackInventory}
          onChange={(value) =>
            onChange("lowStockThreshold", value)
          }
        />

        <InventorySwitches
          trackInventory={trackInventory}
          allowBackorder={allowBackorder}
          disabled={disabled}
          onTrackInventoryChange={
            handleTrackInventoryChange
          }
          onAllowBackorderChange={(checked) =>
            onChange("allowBackorder", checked)
          }
        />
      </div>
    </Card>
  );
};

export default PricingInventoryCard;




