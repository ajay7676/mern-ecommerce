import { useState, useEffect } from "react";
import {
  getCategoryFormValues,
  buildCategoryPayload,
} from "../../../../../../utils/admin/products/category/categoryForm.helpers";
import CategoryForm from "../add-new/CategoryForm";
import EditCategoryHeader from "./EditCategoryHeader";
import EditCategoryFooter from "./EditCategoryFooter";
import useCategory from "../../../../../../hooks/admin/queries/products/categories/useCategory";
import { validateCategoryForm } from "../../../../../../utils/admin/categoryValidation";
import {
  getCategoryApiErrorMessage,
  getCategoryFieldErrors,
} from "../../../../../../utils/admin/products/category/categoryApiError";
import useUpdateCategory from "../../../../../../hooks/admin/mutations/products/categories/useUpdateCategory";

const EditCategoryModal = ({
  open,
  categoryId,
  parentCategories = [],
  onClose,
  mode = "edit",
}) => {
  const [values, setValues] = useState(() => getCategoryFormValues());

  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);


  const { data, isLoading, isError, error, refetch } = useCategory(categoryId, {
    enabled: open && Boolean(categoryId),
  });

  const category = data?.data?.category;


  const {
    mutateAsync: updateCategoryMutation,

    isPending,
  } = useUpdateCategory();

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

  if (!open || !categoryId) {
    return null;
  }

  const handleChange = (field, value) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleRemoveImage = () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateCategoryForm(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);

      return;
    }

    const payload = buildCategoryPayload({
      values,
    });

    try {
      await updateCategoryMutation({
        categoryId,
        payload,
      });

      setErrors({});

      onClose();
    } catch (error) {
      const fieldErrors = getCategoryFieldErrors(error);

      if (Object.keys(fieldErrors).length) {
        setErrors(fieldErrors);
      }
    }
  };

  const handleImageChange = () => {};

  const existingImage = removeExistingImage ? null : values.image;

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
        onClick={
          isPending
            ? undefined
            : onClose
        }
        className="
          absolute
          inset-0
          cursor-default
        "
      />

      <form
        onSubmit={
          handleSubmit
        }
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
          shadow-2xl
        "
      >
        <EditCategoryHeader onClose={onClose} isPending={isPending} />

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-6
            py-6
          "
        >
          {isLoading ? (
            <div
              className="
                flex
                min-h-105
                items-center
                justify-center
              "
            >
              <div className="text-center">
                <div
                  className="
                    mx-auto
                    h-8
                    w-8
                    animate-spin
                    rounded-full
                    border-2
                    border-violet-200
                    border-t-violet-600
                  "
                />

                <p className="mt-3 text-sm text-slate-500">
                  Loading category...
                </p>
              </div>
            </div>
          ) : isError ? (
            <div
              className="
                flex
                min-h-105
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <h3 className="font-semibold text-slate-900">
                Unable to load category
              </h3>

              <p className="mt-2 text-sm text-red-500">
                {getCategoryApiErrorMessage(
                  error,
                  "Failed to load category",
                )}
              </p>

              <button
                type="button"
                onClick={() =>
                  refetch()
                }
                className="
                  mt-4
                  rounded-lg
                  bg-violet-600
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Try Again
              </button>
            </div>
          ) : category ? (
            <CategoryForm
              values={values}
              errors={errors}
              image={image}
              mode={mode}
              imagePreview={
                imagePreview
              }
              existingImage={
                removeExistingImage
                  ? null
                  : category.image
              }
              parentCategories={
                parentCategories.filter(
                  (option) =>
                    String(
                      option.id ??
                        option._id,
                    ) !==
                    String(
                      categoryId,
                    ),
                )
              }
              onChange={
                handleChange
              }
              onImageChange={
                setImage
              }
              onRemoveImage={() => {
                if (image) {
                  setImage(null);
                  return;
                }

                setRemoveExistingImage(
                  true,
                );
              }}
              disabled={
                isPending
              }
            />
          ) : null}
        </div>

        {!isLoading &&
          !isError &&
          category && (
            <EditCategoryFooter onClose={onClose} isPending={isPending} />

          )}
      </form>
    </div>
  );
};

export default EditCategoryModal;
