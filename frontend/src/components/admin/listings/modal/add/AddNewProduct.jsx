import { useCallback, useState } from "react";
import BasicInformationCard from "../product/basic-information/BasicInformationCard";
import ProductEditorLayout from "../product/layout/ProductEditorLayout";
import {
  brandOptions,
  categoryOptions,
  initialProductData,
} from "../product/data/product.data";
import PricingInventoryCard from "../product/pricing-inventory/PricingInventoryCard";
import ProductImagesCard from "../product/product-media/ProductImagesCard";
import AdditionalInformationCard from "../product/additional-information/AdditionalInformationCard";
import ProductPreviewCard from "../product/product-preview/ProductPreviewCard";
import ProductStatusCard from "../product/product-status/ProductStatusCard";
import SeoCard from "../product/seo/SeoCard";
// import AdditionalInformationCard from "../product/product-media/AdditionalInformationCard";

const AddNewProduct = ({
  disabled,
  isSubmitting = false,
  isSavingDraft,
  isPublishing,
}) => {
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
    <main className="px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <ProductEditorLayout
          mainContent={
            <>
              <BasicInformationCard
                values={productData}
                errors={errors}
                categories={categoryOptions}
                brands={brandOptions}
                disabled={isSubmitting}
                onChange={handleFieldChange}
              />
              <PricingInventoryCard
                values={productData}
                errors={errors}
                onChange={handleFieldChange}
              />

              <ProductImagesCard
                images={productData.images}
                error={errors.images || errors.images?.message || " "}
                disabled={disabled}
                onChange={(images) => handleFieldChange("images", images)}
              />
              <AdditionalInformationCard
                values={productData}
                errors={errors}
                disabled={isSavingDraft || isPublishing}
                onChange={handleFieldChange}
              />
            </>
          }
          sidebarContent={
            <>
              {/* <PhasePlaceholder
                title="Product Preview"
                description="The live product preview will be added in Phase 6."
                minHeight="min-h-[405px]"
              /> */}
              <ProductPreviewCard
                product={productData}
                disabled={isSavingDraft || isPublishing}
                onViewFullPage={(product) => {
                  console.log("Preview full product:", product);
                }}
              />

              <ProductStatusCard
                values={productData}
                errors={errors}
                disabled={isSavingDraft || isPublishing}
                onChange={handleFieldChange}
              />

              <SeoCard
                values={productData}
                errors={errors}
                onChange={handleFieldChange}
                disabled={isSavingDraft || isPublishing}
                keywordSuggestions={productData?.seoKeywords}
              />
            </>
          }
        />
      </div>
    </main>
  );
};

// const PhasePlaceholder = ({ title, description, minHeight = "min-h-48" }) => {
//   return (
//     <section
//       className={`
//         ${minHeight}
//         rounded-xl border border-slate-200 bg-white
//         p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)]
//         sm:p-6
//       `}
//     >
//       <h2 className="text-base font-semibold text-slate-950">{title}</h2>

//       <div
//         className="
//           mt-5 flex min-h-28 items-center justify-center
//           rounded-lg border border-dashed border-slate-200
//           bg-slate-50/70 px-5 text-center
//         "
//       >
//         <p className="max-w-md text-sm leading-6 text-slate-500">
//           {description}
//         </p>
//       </div>
//     </section>
//   );
// };

export default AddNewProduct;
