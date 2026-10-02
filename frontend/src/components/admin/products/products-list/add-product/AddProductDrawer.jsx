import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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
  validateProductWizardInOrder,
} from "../../../../../utils/admin/products/product/productStepValidation";

import { buildProductPayload } from "../../../../../utils/admin/products/product/productPayloadUtils";
import { useCreateAdminProduct } from "../../../../../hooks/admin/mutations/products/useCreateAdminProduct";
import { useAdminProductDetail } from "../../../../../hooks/admin/queries/products/product-list/useAdminProductDetail";
import {
  applyCreateProductApiErrors,
  getProductApiErrorMessage,
} from "../../../../../utils/admin/products/product/productApiErrorUtils";

import {
  cleanupTemporaryProductImagesSafely,
  shouldCleanupImagesAfterCreateFailure,
} from "../../../../../utils/admin/products/product/productTempImageCleanup";
import { useDeleteTemporaryProductImages } from "../../../../../hooks/admin/mutations/products/useDeleteTemporaryProductImages";
import { validateProductAttributeSnapshot } from "../../../../../utils/admin/products/product/productAttributeSnapshotValidator";
import { getFirstProductFormError } from "../../../../../utils/admin/products/product/productFormErrorUtils";
import { PRODUCT_FORM_MODE } from "../../../../../constants/admin/products/productFormMode.constants";
import { mapAdminProductDetailToFormValues } from "../../../../../utils/admin/products/product/productEditFormMapper";
import { useUpdateAdminProduct } from "../../../../../hooks/admin/mutations/products/useUpdateAdminProduct";
import { collectTemporaryProductImagePublicIds } from "../../../../../utils/admin/products/product/productTemporaryImageUtils";

const DRAWER_ANIMATION_MS = 500;

const AddProductDrawer = ({
  isOpen = false,
  productId = null,
  onClose,
  mode,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    title: "",
    payload: null,
  });
  const originalEditValuesRef = useRef(null);

  const [isCleaningUp, setIsCleaningUp] = useState(false);

  const [editResetVersion, setEditResetVersion] = useState(0);

  const isEditMode = mode === PRODUCT_FORM_MODE.EDIT;
  const isCreateMode = mode === PRODUCT_FORM_MODE.CREATE;
  const methods = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: getAddProductDefaultValues(),
    mode: "onChange",
  });

  const {
    data: editProduct,
    isLoading: isEditProductLoading,
    isError: isEditProductError,
    error: editProductError,
    refetch: refetchEditProduct,
  } = useAdminProductDetail(productId, {
    enabled: isOpen && isEditMode && Boolean(productId),
  });

  const loadedEditProductIdRef = useRef(null);

  const createProductMutation = useCreateAdminProduct();
  const updateProductMutation = useUpdateAdminProduct();

  const deleteTemporaryProductImages = useDeleteTemporaryProductImages();

  const variantsNeedRegeneration =
    useWatch({
      control: methods.control,
      name: "variantsNeedRegeneration",
    }) ?? false;

  const isCurrentStepBlocked = activeStep === 4 && variantsNeedRegeneration;
  useEffect(() => {
    if (!isOpen || !isCreateMode) return;

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
  }, [isOpen, isCreateMode, methods]);
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

  // useEffect(() => {
  //   if (!isOpen || !isEditMode || !editProduct) return;

  //   const currentProductId = editProduct.id || productId;

  //   if (loadedEditProductIdRef.current === currentProductId) {
  //     return;
  //   }

  //   const mappedValues = mapAdminProductDetailToFormValues(editProduct);

  //   methods.reset(mappedValues);

  //   setActiveStep(1);

  //   loadedEditProductIdRef.current = currentProductId;
  // }, [isOpen, isEditMode, editProduct, productId, methods]);

  useEffect(() => {
    if (mode !== PRODUCT_FORM_MODE.EDIT || !editProduct) {
      return;
    }

    const mappedValues = mapAdminProductDetailToFormValues(editProduct);

    /**
     * Keep the original server state.
     *
     * This is what "Reset Changes"
     * returns to.
     */
    originalEditValuesRef.current = structuredClone(mappedValues);

    methods.reset(mappedValues);
  }, [mode, editProduct, methods]);

  if (!shouldRender) {
    return null;
  }

  const totalSteps = PRODUCT_WIZARD_STEPS.length;
  // const currentStep = PRODUCT_WIZARD_STEPS.find(
  //   (step) => step.id === activeStep,
  // );
  const cleanupCurrentTempImages = async () => {
    const values = methods.getValues();

    return cleanupTemporaryProductImagesSafely({
      values,
      deleteTemporaryImages: deleteTemporaryProductImages.mutateAsync,
    });
  };
  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCloseWithoutSavingOrReset = () => {
    setIsDrawerVisible(false);

    setTimeout(() => {
      onClose();
    }, DRAWER_ANIMATION_MS);
  };

  const handlePublishProduct = async () => {
    const wizardValidation = await validateProductWizardInOrder(methods);

    if (!wizardValidation.isValid) {
      setActiveStep(wizardValidation.step);
      toast.error(wizardValidation.message);
      return;
    }

    const values = methods.getValues();

    const payload = buildProductPayload({
      values,
      action: "publish",
    });
    console.table(
  payload.attributesAndVariations?.variants?.map(
    (variant, index) => ({
      index,
      name: variant.name,
      variantId: variant.variantId,
      sku: variant.sku,
      optionSignature: variant.optionSignature,
      attributeValues: JSON.stringify(
        variant.attributeValues,
      ),
    }),
  ),
);

    try {
      if (isEditMode) {
        await updateProductMutation.mutateAsync({
          productId,
          payload,
        });

        toast.success("Product updated successfully");

        handleCloseWithoutSavingOrReset();

        return;
      }

      await createProductMutation.mutateAsync(payload);

      localStorage.removeItem("addProductDraft");

      methods.reset(getAddProductDefaultValues());

      setActiveStep(1);

      toast.success("Product created successfully");

      handleCloseWithoutSavingOrReset();
    } catch (error) {
      applyCreateProductApiErrors(methods, error);

      toast.error(
        error?.response?.data?.message ||
          (isEditMode
            ? "Failed to update product"
            : "Failed to create product"),
      );
    }
  };

  const handleNext = async () => {
    if (activeStep === 4 && methods.getValues("variantsNeedRegeneration")) {
      toast.error("Regenerate variants before continuing");

      return;
    }
    const isStepValid = await validateAllProductSteps(methods);

    if (!isStepValid) {
      const firstError = getFirstProductFormError(methods.formState.errors);

      if (firstError.step) {
        setActiveStep(firstError.step);
      }

      toast.error(firstError.message);

      return;
    }

    if (activeStep === totalSteps) {
      await handlePublishProduct();
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleSaveDraft = () => {
    if (!isCreateMode) {
      toast("Draft save is only available while creating a new product", {
        icon: "ℹ️",
      });
      return;
    }
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
      title: "Draft saved successfully",
      payload,
    });
  };
  const handleCloseAndKeepDraft = () => {
    const formValues = methods.getValues();
    if (isCreateMode) {
      localStorage.setItem(
        "addProductDraft",
        JSON.stringify({
          formValues,
          savedAt: new Date().toISOString(),
        }),
      );
    }
    setIsDrawerVisible(false);

    setTimeout(() => {
      onClose();
    }, DRAWER_ANIMATION_MS);
  };

  const handleDiscardDraft = async () => {
    try {
      await cleanupCurrentTempImages();

      localStorage.removeItem("addProductDraft");

      methods.reset(getAddProductDefaultValues());

      setActiveStep(1);

      toast.success("Draft discarded successfully");
    } catch (error) {
      toast.error("Failed to discard draft", error);
    }
  };

  const handleClose = () => {
    setIsDrawerVisible(false);

    setTimeout(() => {
      loadedEditProductIdRef.current = null;
      onClose?.();
    }, DRAWER_ANIMATION_MS);
  };

  // const handleResetEditChanges = () => {
  //   if (!isEditMode || !editProduct) return;

  //   const mappedValues = mapAdminProductDetailToFormValues(editProduct);

  //   methods.reset(mappedValues);

  //   setActiveStep(1);

  //   toast("Changes reset to original product data", {
  //     icon: "↩️",
  //   });
  // };

  const handleResetEditChanges = async () => {
    if (isCleaningUp || !originalEditValuesRef.current) {
      return;
    }

    try {
      setIsCleaningUp(true);

      /**
       * -------------------------------------------
       * 1. DELETE NEW TEMPORARY IMAGES
       * -------------------------------------------
       */
      await cleanupCurrentTemporaryImages();

      /**
       * -------------------------------------------
       * 2. RESET TO ORIGINAL SERVER STATE
       * -------------------------------------------
       */
      const originalValues = structuredClone(originalEditValuesRef.current);

      /**
       * Explicitly ensure sync state.
       *
       * Even if mapper already includes these,
       * this makes reset behavior predictable.
       */
      originalValues.attributesChanged = false;

      originalValues.variantsNeedRegeneration = false;

      originalValues.variantRegenerationReason = null;

      methods.reset(originalValues);

      /**
       * Optional:
       * clear remaining validation errors.
       */
      methods.clearErrors();

      /**
       * Return to first variant if you keep
       * selected variant state outside RHF.
       *
       * We'll handle this through a callback below
       * if needed.
       */

      toast.success("Product changes reset");
    } catch (error) {
      console.error("Reset product changes failed:", error);

      toast.error(
        error?.response?.data?.message || "Unable to reset product changes",
      );
    } finally {
      setIsCleaningUp(false);
    }
  };
  const cleanupCurrentTemporaryImages = async () => {
    const currentValues = methods.getValues();

    const temporaryPublicIds =
      collectTemporaryProductImagePublicIds(currentValues);

    if (temporaryPublicIds.length === 0) {
      return {
        success: true,
        deletedPublicIds: [],
      };
    }

    await deleteTemporaryProductImages.mutateAsync({
      publicIds: temporaryPublicIds,
    });

    return {
      success: true,
      deletedPublicIds: temporaryPublicIds,
    };
  };

  // const handleCancelEdit = async () => {
  //   const values = methods.getValues();

  //   try {
  //     await cleanupTemporaryProductImagesSafely({
  //       values,
  //       deleteTemporaryImages: deleteTemporaryProductImages.mutateAsync,
  //     });
  //   } catch (error) {
  //     console.error("Temporary edit images cleanup failed:", error);
  //   } finally {
  //     handleClose();
  //   }
  // };

  const handleCancelEdit = async () => {
    if (isCleaningUp || updateProductMutation.isPending) {
      return;
    }

    try {
      setIsCleaningUp(true);

      /**
       * Delete only newly uploaded TEMP images.
       *
       * Permanent existing images are ignored
       * by the collector.
       */
      await cleanupCurrentTemporaryImages();

      /**
       * Restore form locally before close.
       *
       * Useful if drawer component remains mounted.
       */
      if (originalEditValuesRef.current) {
        methods.reset(structuredClone(originalEditValuesRef.current));
      }

      /**
       * Close only after cleanup succeeds.
       */
      onClose();
    } catch (error) {
      console.error("Edit product cleanup failed:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to clean temporary images. Please try again.",
      );
    } finally {
      setIsCleaningUp(false);
    }
  };
  const handleRequestClose = async () => {
    if (
      isCleaningUp ||
      updateProductMutation.isPending ||
      createProductMutation.isPending
    ) {
      return;
    }

    if (isEditMode) {
      await handleCancelEdit();
      return;
    }

    /**
     * Create mode:
     * keep current draft and close.
     */
    handleCloseAndKeepDraft();
  };
  {
    isEditMode && isEditProductLoading && (
      <div className="space-y-5 p-5">
        <div className="skeleton h-8 w-64 rounded-xl" />
        <div className="skeleton h-32 rounded-3xl" />
        <div className="skeleton h-32 rounded-3xl" />
        <div className="skeleton h-32 rounded-3xl" />
      </div>
    );
  }

  {
    isEditMode && isEditProductError && (
      <div className="flex min-h-105 items-center justify-center p-5">
        <div className="max-w-md rounded-3xl border border-error/20 bg-error/5 p-8 text-center">
          <h3 className="text-lg font-bold text-error">
            Failed to load product
          </h3>

          <p className="mt-2 text-sm text-base-content/60">
            {editProductError?.response?.data?.message ||
              "Unable to load product detail for editing."}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={refetchEditProduct}
              className="btn btn-error rounded-xl text-white"
            >
              Retry
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="btn btn-outline rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-80 bg-black/40 transition-opacity duration-500 ease-out ${
        isDrawerVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleCloseAndKeepDraft}
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
          <AddProductDrawerHeader
            title={isEditMode ? "Edit Product" : "Add New Product"}
            subtitle={
              isEditMode
                ? "Update product information, images, pricing, inventory, and variants"
                : "Create a new product with images, pricing, inventory, and variants"
            }
            onClose={handleRequestClose}
          />
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
                  {activeStep === 4 && (
                    <ProductAttributesVariationsStep
                      mode={mode}
                      productId={productId}
                      editResetVersion={editResetVersion}
                    />
                  )}
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
            onCancel={handleRequestClose}
            onResetChanges={handleResetEditChanges}
            isEditMode={isEditMode}
            showSaveDraft={isCreateMode}
            isSubmitting={
              isEditMode
                ? isCleaningUp || updateProductMutation.isPending
                : createProductMutation.isPending
            }
            isCleaningUp={isCleaningUp}
            primaryButtonLabel={
              activeStep === totalSteps
                ? isEditMode
                  ? "Update Product"
                  : "Publish Product"
                : "Save & Next"
            }
            isNextDisabled={isCurrentStepBlocked}
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
