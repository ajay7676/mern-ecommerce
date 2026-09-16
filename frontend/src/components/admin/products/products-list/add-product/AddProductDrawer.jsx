import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AddProductDrawerHeader from "./AddProductDrawerHeader";
import AddProductDrawerFooter from "./AddProductDrawerFooter";
import ProductStepIndicator from "./ProductStepIndicator";

import { PRODUCT_WIZARD_STEPS } from "../../../../../constants/admin/products/productWizardSteps";
import { addProductSchema } from "../../../../../validation/admin/products/addProductSchema";
import { getAddProductDefaultValues } from "../../../../../utils/admin/products/product/getAddProductDefaultValues";
import ProductBasicInfoStep from "./ProductBasicInfoStep";
import ProductPricingInventoryStep from "./ProductPricingInventoryStep";
import ProductImagesMediaStep from "./ProductImagesMediaStep";
// import { revokeImagePreviewUrl } from "../../../../../utils/admin/products/product/productImageUtils";
import ProductAttributesVariationsStep from "./ProductAttributesVariationsStep";
import ProductAdditionalDetailsStep from "./ProductAdditionalDetailsStep";
import ProductReviewPublishStep from "./ProductReviewPublishStep";
import ProductPayloadPreviewModal from "../view-product/ProductPayloadPreviewModal";
import {
  getFirstStepFromFields,
  validateAllProductSteps,
  validateProductStep,
} from "../../../../../utils/admin/products/product/productStepValidation";

import { buildProductPayload } from "../../../../../utils/admin/products/product/productPayloadUtils";
import { useCreateAdminProduct } from "../../../../../hooks/admin/mutations/products/useCreateAdminProduct";
import {
  applyCreateProductApiErrors,
  getProductApiErrorMessage,
} from "../../../../../utils/admin/products/product/productApiErrorUtils";

const DRAWER_ANIMATION_MS = 500;

const AddProductDrawer = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    title: "",
    payload: null,
  });
  const methods = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: getAddProductDefaultValues(),
    mode: "onChange",
  });

  const createProductMutation = useCreateAdminProduct();

  const isCreatingProduct = createProductMutation.isPending;

  useEffect(() => {
    if (!isOpen) return;

    const savedDraft = localStorage.getItem("addProductDraft");

    if (!savedDraft) return;

    try {
      const parsedDraft = JSON.parse(savedDraft);

      if (parsedDraft?.formValues) {
        methods.reset({
          ...getAddProductDefaultValues(),
          ...parsedDraft.formValues,
        });
      }
    } catch (error) {
      console.error("Failed to restore product draft:", error);
    }
  }, [isOpen, methods]);
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

  const handlePublishProduct = async () => {
    const isValid = await validateAllProductSteps(methods);

    if (!isValid) {
      toast.error("Please fix form errors before publishing");
      return;
    }

    const values = methods.getValues();

    const payload = buildProductPayload({
      values,
      action: "publish",
    });
    try {
      const createdProduct = await createProductMutation.mutateAsync(payload);

      localStorage.removeItem("addProductDraft");

      toast.success("Product created successfully");

      methods.reset(getAddProductDefaultValues());
      setActiveStep(1);

      handleClose();

      console.log("Created product:", createdProduct);
    } catch (error) {
      const appliedFields = applyCreateProductApiErrors(methods, error);
      const firstErrorStep = getFirstStepFromFields(appliedFields);

      if (firstErrorStep) {
        setActiveStep(firstErrorStep);
      }

      toast.error(getProductApiErrorMessage(error));
      console.error("Create product failed:", error);
    }
  };

  const handleNext = async () => {
    const isStepValid = await validateProductStep({
      methods,
      activeStep,
    });

    if (!isStepValid) {
      return;
    }

    if (activeStep === totalSteps) {
      await handlePublishProduct();
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleSaveDraft = () => {
    const formValues = methods.getValues();

    const payload = buildProductPayload({
      values: formValues,
      action: "draft",
    });

    localStorage.setItem(
      "addProductDraft",
      JSON.stringify({
        formValues,
        payload,
        savedAt: new Date().toISOString(),
      }),
    );

    setPreviewModal({
      isOpen: true,
      title: "Product draft saved locally",
      payload,
    });

    console.log("Saved form values:", formValues);
    console.log("Backend payload:", payload);
  };

  // const handleClose = () => {
  //   setIsDrawerVisible(false);

  //   setTimeout(() => {
  //     const images = methods.getValues("images") || [];

  //     images.forEach((image) => {
  //       revokeImagePreviewUrl(image.previewUrl);
  //     });

  //     methods.reset(getAddProductDefaultValues());
  //     onClose();
  //     setActiveStep(1);
  //   }, DRAWER_ANIMATION_MS);
  // };
  const handleClose = () => {
    setIsDrawerVisible(false);

    setTimeout(() => {
      onClose();
    }, DRAWER_ANIMATION_MS);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem("addProductDraft");

    methods.reset(getAddProductDefaultValues());
    setPreviewModal({
      isOpen: false,
      title: "",
      payload: null,
    });

    console.log("Product draft discarded");

    setActiveStep(1);
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
            onDiscardDraft={handleDiscardDraft}
            isSubmitting={isCreatingProduct}
          />

          <ProductPayloadPreviewModal
            isOpen={previewModal.isOpen}
            title={previewModal.title}
            payload={previewModal.payload}
            onClose={() =>
              setPreviewModal({
                isOpen: false,
                title: "",
                payload: null,
              })
            }
          />
        </FormProvider>
      </div>
    </div>,
    document.body,
  );
};

export default AddProductDrawer;
