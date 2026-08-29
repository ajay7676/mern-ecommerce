import { useBrand } from "../../../../../../hooks/admin/queries/products/brands/useBrand";
import { useUpdateBrand } from "../../../../../../hooks/admin/mutations/products/brands/useUpdateBrand";
import BrandBannerSection from "../brandform/BrandBannerSection";
import BrandInformationSection from "../brandform/BrandInformationSection";
import BrandLogoSection from "../brandform/BrandLogoSection";
import BrandPreview from "../brandform/BrandPreview";
import BrandSeoSection from "../brandform/BrandSeoSection";
import BrandVisibilitySection from "../brandform/BrandVisibilitySection";
import BrandFormSkeleton from "../brandform/BrandFormSkeleton";
import EditBrandHeader from "./EditBrandHeader";
import EditBrandFooter from "./EditBrandFooter";
import BrandFieldError from "../brandform/BrandFieldError";
import { useEffect, useState } from "react";
import { getBrandFormValues } from "../../../../../../utils/admin/products/brand/brandForm.helpers";

const EditBrandModal = ({ isOpen, brand=null, mode = "edit", onClose }) => {
    const [values, setValues] = useState((brand) => getBrandFormValues(brand))

    console.log(values)
    const [errors, setErrors] = useState({})
  const {
    data: brandData,
    isLoading,
    isError,
  } = useBrand(brand?._id, {
    enabled: open && Boolean(brand?._id),
  });
  if(!isOpen) return ;
  

//   console.log(values)

  const handleSubmit = async () => {};

  const handleChange = () => {
      
  }

  const handleLogoUpload = async() => {

  }

  const handleRemoveLogo = async ()  => {

  }

  const handleBannerUpload = () => {


  }

  const handleRemoveBanner = ()  => {
    
  }

  const handleCancel = async () => {};


  return (
    <div
      className={`
        fixed
        inset-0
        z-50
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close add brand drawer"
        onClick={onClose}
        className={`
          absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Drawer */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-brand-title"
        className={`absolute right-0 top-0 flex h-dvh w-full flex-col
             bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.12)] 
            transition-transform duration-300 ease-out max-w-7xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {isLoading ? (
          <BrandFormSkeleton />
        ) : isError ? (
          <BrandFieldError />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex h-full min-h-0 flex-col"
          >
            {/* Header */}

            <EditBrandHeader onClose={onClose} />

            {/* Scrollable content */}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                {/* LEFT SIDE */}

                <main className="space-y-5">
                  <BrandInformationSection
                  values={values}
                  errors={errors}
                  onChange={handleChange}
                />
                  <BrandLogoSection
                  logo={values?.logo}
                  error={errors.logo}
                  mode={mode}
                  isUploading={false}
                  onUpload={handleLogoUpload}
                  onRemove={handleRemoveLogo}
                />
                  <BrandBannerSection
                  banner={values?.banner}
                  error={errors.banner}
                  isUploading={false}
                  onUpload={handleBannerUpload}
                  onRemove={handleRemoveBanner}
                />
                  {/* <BrandVisibilitySection
                  values={values}
                  onChange={handleChange}
                /> */}
                </main>
                {/* RIGHT SIDE */}

                <aside
                  className="
              space-y-5
              xl:sticky
              xl:top-0
              xl:self-start
            "
                >
                  {/* <BrandPreview values={values} />
                <BrandSeoSection
                  seo={values.seo}
                  errors={errors}
                  onChange={handleSeoChange}
                /> */}
                </aside>
              </div>
            </div>
            {/* Footer */}

            {/* <EditBrandFooter
            onClose={handleCancel}
            disabled={
              createBrandMutation.isPending ||
              logoUpload.isPending ||
              bannerUpload.isPending
            }
            onSubmit={handleSubmit}
            isPending={createBrandMutation.isPending}
          /> */}
          </form>
        )}
      </aside>
    </div>
  );
};

export default EditBrandModal;
