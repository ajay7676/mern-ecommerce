import { useEffect, useState } from "react";

import { FiPlus, FiX } from "react-icons/fi";

import CategoryForm from "./CategoryForm";

import { validateCategoryForm } from "../../../../../../utils/admin/categoryValidation";
import { generateCategorySlug } from "../../../../../../utils/admin/generateCategorySlug";
import { buildCategoryPayload } from "../../../../../../utils/admin/products/category/categoryForm.helpers";

import useCreateCategory from "../../../../../../hooks/admin/mutations/products/categories/useCreateCategory";
import { getCategoryFieldErrors } from "../../../../../../utils/admin/products/category/categoryApiError";

const INITIAL_VALUES = {
  name: "",
  slug: "",
  description: "",
  parentCategory: "",
  status: "active",
  sortOrder: "",
  icon: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
};

const AddCategoryModal = ({
  open,
  onClose,
  parentCategories = [],
  isSubmitting = false,
  mode = "add",
}) => {
  const [values, setValues] = useState(INITIAL_VALUES);

  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const { mutateAsync: createCategory, isPending } = useCreateCategory();

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

  // ESC key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  const resetForm = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setImage(null);
    setSlugManuallyEdited(false);
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onClose();
  };

  const handleChange = (field, value) => {
    setValues((current) => {
      const next = {
        ...current,
        [field]: value,
      };

      if (field === "name" && !slugManuallyEdited) {
        next.slug = generateCategorySlug(value);
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

  const handleImageChange = (file) => {
    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((current) => ({
        ...current,
        image: "Only JPG, PNG and WEBP images are allowed",
      }));

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors((current) => ({
        ...current,
        image: "Image size cannot exceed 5 MB",
      }));

      return;
    }

    setImage(file);

    setErrors((current) => ({
      ...current,
      image: undefined,
    }));
  };

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
      await createCategory(payload);

      resetForm();

      onClose();
    } catch (error) {
      const fieldErrors = getCategoryFieldErrors(error);
      if (Object.keys(fieldErrors).length) {
        setErrors(fieldErrors);
      }
    }
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className={`
        fixed
        inset-0
        z-50
        ${open ? "pointer-events-auto" : "pointer-events-none"}
      `}
        aria-hidden={!open}
      >
        {/* Overlay */}

        <button
          type="button"
          aria-label="Close add category drawer"
          onClick={onClose}
          className={`
          absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0"}
        `}
        />

        {/* Drawer */}

        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-category-title"
          className={`
    absolute right-0 top-0
    flex h-dvh w-full max-w-7xl flex-col
    overflow-hidden
    bg-white
    shadow-[-12px_0_40px_rgba(15,23,42,0.12)]
    transition-transform duration-300 ease-out
    ${open ? "translate-x-0" : "translate-x-full"}
  `}
        >
          <form onSubmit={handleSubmit}
           className="flex h-full min-h-0 flex-col"
          >
            <header
              className="
            flex
            shrink-0
            items-start
            justify-between
            gap-5
            border-b
            border-slate-200
            bg-white
            px-5
            py-5
            sm:px-6
          "
            >
              <div>
                <h2
                  id="add-category-title"
                  className="text-xl font-bold text-slate-950"
                >
                  Add New Category
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new product category and configure its details.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-lg
              text-slate-500
              cursor-pointer
              transition
              hover:bg-slate-100
              hover:text-slate-900
            "
              >
                <FiX size={20} />
              </button>
            </header>

            <div
              className="
           min-h-0 overflow-y-auto
            flex-1
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
                parentCategories={parentCategories}
                onChange={handleChange}
                onImageChange={handleImageChange}
                onRemoveImage={() => setImage(null)}
                disabled={isSubmitting}
                mode={mode}
              />

              {errors.image && (
                <p className="mt-2 text-xs text-red-500">{errors.image}</p>
              )}
            </div>

            <footer
              className="
            flex
            shrink-0
            flex-col-reverse
            gap-3
            border-t
            border-slate-200
            bg-slate-50
            px-5
            py-4
            sm:flex-row
            sm:justify-end
            sm:px-6
          "
            >
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="
              h-10
              rounded-lg
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              cursor-pointer
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-violet-600
              px-5
              text-sm
              font-semibold
              cursor-pointer
              text-white
              transition
              hover:bg-violet-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
              >
                <FiPlus size={17} />

                {isPending ? "Creating..." : "Create Category"}
              </button>
            </footer>
          </form>
        </aside>
      </div>
    </>
  );
};

export default AddCategoryModal;
