import {
  useFormContext,
  useWatch,
} from "react-hook-form";

import PricingFormCard from "../form/PricingFormCard";
import InventoryFormCard from "../form/InventoryFormCard";
import InventorySummaryCard from "../form/InventorySummaryCard";
import PricingSummaryCard from "../form/PricingSummaryCard";
import PricingInventoryTipsCard from "../form/PricingInventoryTipsCard";

import {
  calculatePricing,
} from '../../../../../utils/admin/products/product/productPricingUtils'

const ProductPricingInventoryStep = () => {
  const {
    register,
    control,
    formState: {
      errors,
    },
  } = useFormContext();

  const watchedValues = useWatch({
    control,
  });

  const pricing = calculatePricing({
    sellingPrice: watchedValues.sellingPrice,
    discountType: watchedValues.discountType,
    discountValue: watchedValues.discountValue,
    taxClass: watchedValues.taxClass,
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <PricingFormCard
          register={register}
          errors={errors}
          pricing={pricing}
          discountType={watchedValues.discountType}
        />

        <InventoryFormCard
          register={register}
          control={control}
          errors={errors}
          sku={watchedValues.sku}
          stockQuantity={watchedValues.stockQuantity}
          lowStockThreshold={watchedValues.lowStockThreshold}
        />
      </div>

      <aside className="space-y-6">
        <InventorySummaryCard
          stockQuantity={watchedValues.stockQuantity}
          lowStockThreshold={watchedValues.lowStockThreshold}
          units={watchedValues.units}
        />

        <PricingSummaryCard
          pricing={pricing}
          mrp={watchedValues.mrp}
          taxClass={watchedValues.taxClass}
        />

        <PricingInventoryTipsCard />
      </aside>
    </div>
  );
};

export default ProductPricingInventoryStep;