import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AddProductDrawerHeader from "./AddProductDrawerHeader";
import AddProductDrawerFooter from "./AddProductDrawerFooter";
import ProductStepIndicator from "./ProductStepIndicator";

import { PRODUCT_WIZARD_STEPS } from "../../../../../constants/admin/products/productWizardSteps";
import { addProductSchema } from "../../../../../validation/admin/products/addProductSchema";
import { getAddProductDefaultValues } from "../../../../../utils/admin/products/product/getAddProductDefaultValues";
import ProductBasicInfoStep from "./ProductBasicInfoStep";
import ProductPricingInventoryStep from "./ProductPricingInventoryStep";
import ProductImagesMediaStep from "./ProductImagesMediaStep";
import { revokeImagePreviewUrl } from "../../../../../utils/admin/products/product/productImageUtils";
import ProductAttributesVariationsStep from "./ProductAttributesVariationsStep";
import ProductAdditionalDetailsStep from "./ProductAdditionalDetailsStep";
import ProductReviewPublishStep from "./ProductReviewPublishStep";

const DRAWER_ANIMATION_MS = 500;

const AddProductDrawer = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const methods = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: getAddProductDefaultValues(),
    mode: "onChange",
  });

  useEffect(() => {
    let timer;

    if (isOpen) {
      setShouldRender(true);

      requestAnimationFrame(() => {
        setIsDrawerVisible(true);
      });
    } else {
      setIsDrawerVisible(false);

      timer = setTimeout(() => {
        setShouldRender(false);
      }, DRAWER_ANIMATION_MS);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  const totalSteps = PRODUCT_WIZARD_STEPS.length;
  // const currentStep = PRODUCT_WIZARD_STEPS.find(
  //   (step) => step.id === activeStep,
  // );

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = async () => {
    if (activeStep === 1) {
      const isValid = await methods.trigger([
        "productName",
        "sku",
        "shortDescription",
        "productType",
        "category",
        "brand",
        "description",
        "metaTitle",
        "metaDescription",
        "metaKeywords",
        "status",
        "visibility.onlineStore",
        "visibility.mobileApp",
        "visibility.pos",
      ]);

      if (!isValid) {
        return;
      }
    }
    if (activeStep === 2) {
      const isValid = await methods.trigger([
        "sellingPrice",
        "discountType",
        "discountValue",
        "taxClass",
        "costPrice",
        "mrp",
        "specialPrice",
        "specialPriceFrom",
        "specialPriceTo",
        "sku",
        "barcode",
        "trackInventory",
        "stockQuantity",
        "lowStockThreshold",
        "units",
        "allowBackorders",
      ]);

      if (!isValid) {
        return;
      }
    }

    if (activeStep === 3) {
      const isValid = await methods.trigger([
        "images",
        "imageAltText",
        "displayOrder",
        "imageZoom",
        "videoUrl",
      ]);

      if (!isValid) {
        return;
      }
    }

    if (activeStep === 4) {
      const isValid = await methods.trigger(["attributes", "variants"]);

      if (!isValid) return;
    }

    if (activeStep === 5) {
      const isValid = await methods.trigger([
        "productTypeDetail",
        "collection",
        "tags",
        "hsnCode",
        "countryOfOrigin",
        "warrantyInformation",
        "returnPolicy",
        "careInstructions",
        "userManual",
        "safetyInformation",
        "customFields",
      ]);

      if (!isValid) return;
    }
    if (activeStep === 6) {
      const isValid = await methods.trigger([
        "publishOption",
        "scheduleDate",
        "scheduleTime",
      ]);

      if (!isValid) return;

      console.log("Final product payload:", methods.getValues());

      return;
    }
    setActiveStep((prev) => prev + 1);
  };
  const handleSaveDraft = () => {
    console.log("Dummy save draft:", methods.getValues());
  };
  const handleClose = () => {
    setIsDrawerVisible(false);

    setTimeout(() => {
      const images = methods.getValues("images") || [];

      images.forEach((image) => {
        revokeImagePreviewUrl(image.previewUrl);
      });

      methods.reset(getAddProductDefaultValues());
      onClose();
      setActiveStep(1);
    }, DRAWER_ANIMATION_MS);
  };
  return createPortal(
    <div
      className={`fixed inset-0 z-80 bg-black/40 transition-opacity duration-500 ease-out ${
        isDrawerVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`fixed right-0 top-0 flex h-screen w-full flex-col overflow-hidden
           bg-slate-50 shadow-2xl transition-transform duration-500 ease-out 
           will-change-transform sm:w-[90%] lg:w-[86%] 2xl:w-[82%] ${
             isDrawerVisible ? "translate-x-0" : "translate-x-full"
           }`}
      >
        <FormProvider {...methods}>
          <AddProductDrawerHeader onClose={handleClose} />
          <ProductStepIndicator
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />

          <div className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            <div className="grid gap-6 w-full">
              <form className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
                  {activeStep === 1 && <ProductBasicInfoStep />}
                  {activeStep === 2 && <ProductPricingInventoryStep />}
                  {activeStep === 3 && <ProductImagesMediaStep />}
                  {activeStep === 4 && <ProductAttributesVariationsStep />}
                  {activeStep === 5 && <ProductAdditionalDetailsStep />}

                  {activeStep === 6 && (
                    <ProductReviewPublishStep onEditStep={setActiveStep} />
                  )}
                </div>
              </form>
            </div>
          </div>

          <AddProductDrawerFooter
            activeStep={activeStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
          />
        </FormProvider>
      </div>
    </div>,
    document.body,
  );
};

export default AddProductDrawer;
