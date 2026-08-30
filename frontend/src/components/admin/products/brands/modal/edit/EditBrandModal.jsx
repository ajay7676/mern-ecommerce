import { useBrand } from "../../../../../../hooks/admin/queries/products/brands/useBrand";
import BrandFormSkeleton from "../brandform/BrandFormSkeleton";
import EditBrandHeader from "./EditBrandHeader";
import BrandFieldError from "../brandform/BrandFieldError";
import { useEffect, useState } from "react";
import {
  buildCreateBrandPayload,
  getBrandFormValues,
} from "../../../../../../utils/admin/products/brand/brandForm.helpers";
import BrandForm from "../brandform/BrandForm";
import { deleteTemporaryBrandAsset } from "../../../../../../api/admin/brands.api";
import toast from "react-hot-toast";
import { validateBrandForm } from "../../../../../../validation/admin/brand/brandForm.validators";
import { generateSlug } from "../../../../../../utils/generateSlug";
import { useUploadBrandLogo } from "../../../../../../hooks/admin/mutations/products/brands/useUploadBrandLogo";
import { useUploadBrandBanner } from "../../../../../../hooks/admin/mutations/products/brands/useUploadBrandBanner";
import { useDeleteTemporaryBrandAsset } from "../../../../../../hooks/admin/mutations/products/brands/useDeleteTemporaryBrandAsset";
import { useCreateBrand } from "../../../../../../hooks/admin/mutations/products/brands/useCreateBrand";
import EditBrandFooter from './EditBrandFooter';
import {useUpdateBrand} from '../../../../../../hooks/admin/mutations/products/brands/useUpdateBrand'


const EditBrandModal = ({ isOpen, brand, mode = "edit", onClose }) => {
  const [values, setValues] = useState((brand) => getBrandFormValues(brand));
  const [errors, setErrors] = useState({});
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const logoUpload = useUploadBrandLogo();
  const bannerUpload = useUploadBrandBanner();
  const deleteTemporaryAsset = useDeleteTemporaryBrandAsset();
  const createBrandMutation = useCreateBrand();
  const updateBrandMutation = useUpdateBrand();


  useEffect(() => {
    if (!brand) return;
    setValues(brand);
  }, [brand]);
  const {
    data: brandData,
    isLoading,
    isError,
  } = useBrand(brand?._id, {
    enabled: open && Boolean(brand?._id),
  });
  if (!isOpen) return;


  const brandId = brandData?.data?.brand?._id;
  const handleLogoUpload = async (file) => {
    if (!file) return;

    const previousLogo = values.logo;

    try {
      const response = await logoUpload.mutateAsync(file);

      const newLogo = response?.data?.logo;

      if (!newLogo) {
        throw new Error("Invalid upload response");
      }

      setValues((current) => ({
        ...current,
        logo: newLogo,
      }));

      if (
        previousLogo?.publicId &&
        previousLogo.publicId !== newLogo.publicId
      ) {
        try {
          await deleteTemporaryAsset.mutateAsync([previousLogo.publicId]);
        } catch (cleanupError) {
          console.error("Old temporary logo cleanup failed", cleanupError);
        }
      }
    } catch (error) {
      setErrors((current) => ({
        ...current,

        logo: error?.response?.data?.message || "Brand Logo upload failed",
      }));
    }
  };

  const handleBannerUpload = async (file) => {
    if (!file) return;

    const previousBanner = values.banner;

    try {
      const response = await bannerUpload.mutateAsync(file);

      const newBanner = response?.data?.banner;

      if (!newBanner) {
        throw new Error("Invalid banner upload response");
      }

      setValues((current) => ({
        ...current,

        banner: newBanner,
      }));

      if (
        previousBanner?.publicId &&
        previousBanner.publicId !== newBanner.publicId
      ) {
        try {
          await deleteTemporaryAsset.mutateAsync([previousBanner.publicId]);
        } catch (cleanupError) {
          console.error("Temporary banner cleanup failed", cleanupError);
          toast.error("Temporary banner cleanup failed");
        }
      }
    } catch (error) {
      setErrors((current) => ({
        ...current,
        banner: error?.response?.data?.message || "Banner upload failed",
      }));
      toast.error(error?.response?.data?.message || "Banner upload failed");
    }
  };
  const handleRemoveLogo = async () => {
    const logo = values.logo;

    if (!logo) return;

    setValues((current) => ({
      ...current,
      logo: null,
    }));

    try {
      await deleteTemporaryAsset.mutateAsync([logo.publicId]);
    } catch (error) {
      console.error("Brand Logo cleanup failed", error);
    }
  };

  const handleRemoveBanner = async () => {
    const banner = values.banner;

    if (!banner) return;

    setValues((current) => ({
      ...current,
      banner: null,
    }));

    try {
      await deleteTemporaryAsset.mutateAsync([banner.publicId]);
    } catch (error) {
      console.error("Banner cleanup failed", error);
    }
  };

  const handleChange = (field, value) => {
    setValues((current) => {
      const next = {
        ...current,
        [field]: value,
      };

      if (field === "name" && !slugManuallyEdited) {
        next.slug = generateSlug(value);
      }

      return next;
    });

    if (field === "slug") {
      setSlugManuallyEdited(true);
    }

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };
  const handleSeoChange = (field, value) => {
    setValues((current) => ({
      ...current,

      seo: {
        ...current.seo,
        [field]: value,
      },
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateBrandForm(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);

      return;
    }
    setErrors({});
    const payload = buildCreateBrandPayload(values);
    try {
      await updateBrandMutation.mutateAsync({
        brandId,
        payload,
      }) ;

      toast.success("Brand updated successfully");

      onClose();
    } catch (error) {
      const response = error?.response?.data;

      if (response?.errors) {
        setErrors(response.errors);
      }

      toast.error(response?.message || "Failed to update brand");
    }
  };

  const handleCancel = async () => {
    const publicIds = [values.logo?.publicId, values.banner?.publicId].filter(
      Boolean,
    );

    if (publicIds.length) {
      await Promise.allSettled(
        publicIds.map((publicId) => deleteTemporaryBrandAsset([publicId])),
      );
    }

    onClose();
  };
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
              <BrandForm
                mode="edit"
                values={values}
                errors={errors}
                handleChange={handleChange}
                islogoUploading={logoUpload.isPending}
                handleLogoUpload={handleLogoUpload}
                onRemoveLogo={handleRemoveLogo}
                isbannerUploading={bannerUpload.isPending}
                onUploadBanner={handleBannerUpload}
                onRemoveBanner={handleRemoveBanner}
                onSeoChange={handleSeoChange}
              />
            </div>
            {/* Footer */}

            <EditBrandFooter
            onClose={handleCancel}
            disabled={
              updateBrandMutation.isPending ||
              logoUpload.isPending ||
              bannerUpload.isPending
            }
            onSubmit={handleSubmit}
            isPending={updateBrandMutation.isPending}
          />
          </form>
        )}
      </aside>
    </div>
  );
};

export default EditBrandModal;
