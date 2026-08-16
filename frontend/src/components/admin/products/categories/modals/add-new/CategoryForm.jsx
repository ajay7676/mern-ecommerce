import CategoryBasicFields from "./CategoryBasicFields";
import CategoryMediaFields from "./CategoryMediaFields";
import CategorySeoFields from "./CategorySeoFields";

const CategoryForm = ({
  values,
  errors,
  image,
  imagePreview,
  parentCategories,
  onChange,
  onImageChange,
  onRemoveImage,
  disabled,
}) => {
  return (
    <div className="space-y-7">
      <CategoryBasicFields
        values={values}
        errors={errors}
        parentCategories={
          parentCategories
        }
        onChange={onChange}
        disabled={disabled}
      />

      <CategoryMediaFields
        image={image}
        imagePreview={imagePreview}
        icon={values.icon}
        onImageChange={onImageChange}
        onRemoveImage={onRemoveImage}
        onIconChange={(value) =>
          onChange("icon", value)
        }
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