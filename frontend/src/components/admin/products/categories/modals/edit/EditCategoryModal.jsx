import { useState, useEffect } from "react";
import { getCategoryFormValues } from "../../../../../../utils/admin/products/category/categoryForm.helpers";
import CategoryForm from "../add-new/CategoryForm";
import EditCategoryHeader from "./EditCategoryHeader";
import EditCategoryFooter from "./EditCategoryFooter";

const EditCategoryModal = ({
  open,
  category,
  parentCategories = [],
  isSubmitting = false,
  onClose,
  onSubmit,
  mode = "edit",
}) => {
  const [values, setValues] = useState(() => getCategoryFormValues());

  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);

  useEffect(() => {
    if (!open || !category) {
      return;
    }

    setValues(getCategoryFormValues(category));

    setErrors({});
    setImage(null);
    setImagePreview("");
    setRemoveExistingImage(false);

    // Existing slug should not
    // automatically change when
    // the name is edited.
    setSlugManuallyEdited(true);
  }, [open, category]);

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  if (!open || !category) {
    return null;
  }

  const handleChange = () => {};

  const handleRemoveImage = () => {};

  const handleSubmit = () => {};

  const handleImageChange = () => {};

  const existingImage = removeExistingImage ? null : category.image;

  return (
    <div
      className="
        fixed
        inset-0
        z-70
        flex
        items-center
        justify-center
        bg-slate-950/40
        p-3
        backdrop-blur-[2px]
        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-category-title"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="
          absolute
          inset-0
          cursor-default
        "
      />

      <form
        onSubmit={onSubmit}
        className="
          relative
          z-10
          flex
          max-h-[94vh]
          w-full
          max-w-205
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_24px_70px_rgba(15,23,42,0.2)]
        "
      >
        {/* Header */}

        <EditCategoryHeader onClose={onClose} isSubmitting={isSubmitting} />

        {/* Form */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-5
            py-6
            sm:px-6
          "
        >
          <CategoryForm
            values={values}
            errors={errors}
            image={image}
            imagePreview={imagePreview}
            existingImage={existingImage}
            parentCategories={parentCategories.filter(
              (parent) =>
                parent.id !== category.id && parent._id !== category._id,
            )}
            onChange={handleChange}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            disabled={isSubmitting}
          />
          {mode === "edit" && (
            <p className="mt-1 text-xs text-amber-600">
              Changing the slug may affect existing category URLs.
            </p>
          )}
          {errors.image && (
            <p
              className="
                mt-2
                text-xs
                text-red-500
              "
            >
              {errors.image}
            </p>
          )}
        </div>

        {/* Footer */}

        <EditCategoryFooter onClose={onClose} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default EditCategoryModal;
