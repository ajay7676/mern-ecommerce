import { useCallback, useState } from "react";
import BasicInformationCard from "../product/basic-information/BasicInformationCard";
import ProductEditorLayout from "../product/layout/ProductEditorLayout";
import { brandOptions, categoryOptions, initialBasicInformation } from "../product/data/product.data";

const AddNewProduct = (
  {
    isSubmitting= false
  }
) => {
  const [basicInformation, setBasicInformation] = useState(
    initialBasicInformation,
  );

  const [basicInformationErrors, setBasicInformationErrors] = useState({});

  const handleBasicInformationChange = useCallback((fieldName, value) => {
    setBasicInformation((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setBasicInformationErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: "",
    }));
  }, []);
  return (
    <main className="px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <ProductEditorLayout
          mainContent={
            <>
              {/* <PhasePlaceholder
                  title="Basic Information"
                  description="Product name, category, description, brand, SKU and barcode will be added in Phase 2."
                  minHeight="min-h-[405px]"
                /> */}
              <BasicInformationCard
                values={basicInformation}
                errors={basicInformationErrors}
                categories={categoryOptions}
                brands={brandOptions}
                disabled={isSubmitting}
                onChange={handleBasicInformationChange}
              />

              <PhasePlaceholder
                title="Pricing & Inventory"
                description="Pricing, currency, stock and inventory controls will be added in Phase 3."
                minHeight="min-h-[205px]"
              />

              <PhasePlaceholder
                title="Product Images"
                description="Image upload and image management will be added in Phase 4."
                minHeight="min-h-[220px]"
              />
            </>
          }
          sidebarContent={
            <>
              <PhasePlaceholder
                title="Product Preview"
                description="The live product preview will be added in Phase 6."
                minHeight="min-h-[405px]"
              />

              <PhasePlaceholder
                title="Product Status"
                description="Status, visibility and featured controls will be added in Phase 7."
                minHeight="min-h-[220px]"
              />

              <PhasePlaceholder
                title="SEO Information"
                description="SEO title, description and keywords will be added in Phase 8."
                minHeight="min-h-[240px]"
              />
            </>
          }
        />
      </div>
    </main>
  );
};

const PhasePlaceholder = ({ title, description, minHeight = "min-h-48" }) => {
  return (
    <section
      className={`
        ${minHeight}
        rounded-xl border border-slate-200 bg-white
        p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)]
        sm:p-6
      `}
    >
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      <div
        className="
          mt-5 flex min-h-28 items-center justify-center
          rounded-lg border border-dashed border-slate-200
          bg-slate-50/70 px-5 text-center
        "
      >
        <p className="max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </section>
  );
};

export default AddNewProduct;
