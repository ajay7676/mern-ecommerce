import CategoryBasicFields from "./CategoryBasicFields";
import CategoryMediaFields from "./CategoryMediaFields";
import CategorySeoFields from "./CategorySeoFields";

const CategoryForm = ({
  values,
  errors,

  image,
  imagePreview,
  existingImage,

  parentCategories,

  onChange,
  onImageChange,
  onRemoveImage,
  disabled,
  mode={mode}
}) => {
  const preview = imagePreview || existingImage?.url || "";

  return (
    <div className="space-y-7">
      <CategoryBasicFields
        values={values}
        errors={errors}
        parentCategories={parentCategories}
        onChange={onChange}
        disabled={disabled}
      />

      <CategoryMediaFields
        image={image}
        imagePreview={preview}
        icon={values.icon}
        onImageChange={onImageChange}
        onRemoveImage={onRemoveImage}
        onIconChange={(value) => onChange("icon", value)}
        disabled={disabled}
      />

      <CategorySeoFields
        values={values}
        errors={errors}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default CategoryForm;
