import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  ImageIcon,
  Underline,
} from "lucide-react";

import { TextAreaField, TextInputField } from "../form/FormField";

import ProductPreviewCard from "../form/ProductPreviewCard";
import ProductStatusCard from "../form/ProductStatusCard";
import ProductVisibilityCard from "../form/ProductVisibilityCard";
import SeoInformationCard from "../form/SeoInformationCard";
import { useProductCategoryOptions } from "../../../../../hooks/admin/queries/products/product-list/useProductCategoryOptions";
import { useProductBrandOptions } from "../../../../../hooks/admin/queries/products/product-list/useProductBrandOptions";
import { useMemo } from "react";
import { SelectPickerField } from "../form/SelectPickerField";

const ProductBasicInfoStep = () => {
  const { data: categoryData = [], isLoading: isCategoriesLoading } =
    useProductCategoryOptions();

  const { data: brandData = [], isLoading: isBrandsLoading } =
    useProductBrandOptions();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const categoryOptions = useMemo(
    () => categoryData?.options ?? [],
    [categoryData?.options],
  );
  const brandOptions = useMemo(() => brandData ?? [], [brandData]);
  console.log("brandOptions");
  console.log(brandOptions);

  const productName = useWatch({
    control,
    name: "productName",
  });

  const sku = useWatch({
    control,
    name: "sku",
  });

  const shortDescription = useWatch({
    control,
    name: "shortDescription",
  });

  const description = useWatch({
    control,
    name: "description",
  });

  const watchedCategoryId = useWatch({
    control,
    name: "category",
  });

  const parentCategories = useMemo(() => {
    return categoryOptions.filter((category) => !category.parentCategory);
  }, [categoryOptions]);

  const subCategories = useMemo(() => {
    if (!watchedCategoryId) return [];

    return categoryOptions.filter((category) => {
      return String(category.parentCategory) === String(watchedCategoryId);
    });
  }, [categoryOptions, watchedCategoryId]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Basic Information
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Enter the basic details about your product.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TextInputField
              label="Product Name"
              required
              placeholder="Enter product name"
              rightText={`${productName?.length || 0}/150`}
              error={errors.productName?.message}
              {...register("productName")}
            />

            <TextInputField
              label="SKU (Stock Keeping Unit)"
              required
              placeholder="Enter SKU"
              helper="Unique identifier for this product"
              rightText={`${sku?.length || 0}/100`}
              error={errors.sku?.message}
              {...register("sku")}
            />

            <TextAreaField
              label="Short Description"
              required
              placeholder="Enter short description"
              helper="A brief summary of your product"
              rows={3}
              rightText={`${shortDescription?.length || 0}/200`}
              error={errors.shortDescription?.message}
              {...register("shortDescription")}
            />

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-800">
                Product Type <span className="text-error">*</span>
              </label>

              <Controller
                name="productType"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-start gap-4">
                      <input
                        type="radio"
                        className="radio radio-primary mt-1"
                        checked={field.value === "simple"}
                        onChange={() => field.onChange("simple")}
                      />

                      <span>
                        <span className="block text-sm font-bold text-slate-900">
                          Simple Product
                        </span>

                        <span className="block text-xs font-medium text-slate-500">
                          Single SKU, fixed price
                        </span>
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-start gap-4">
                      <input
                        type="radio"
                        className="radio radio-primary mt-1"
                        checked={field.value === "variable"}
                        onChange={() => field.onChange("variable")}
                      />

                      <span>
                        <span className="block text-sm font-bold text-slate-900">
                          Variable Product
                        </span>

                        <span className="block text-xs font-medium text-slate-500">
                          Multiple variants like size, color, etc.
                        </span>
                      </span>
                    </label>
                  </div>
                )}
              />

              {errors.productType && (
                <p className="mt-1 text-xs font-medium text-error">
                  {errors.productType.message}
                </p>
              )}
            </div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <SelectPickerField
                  label="Category"
                  required
                  value={field.value}
                  onChange={(categoryId) => {
                    field.onChange(categoryId);

                    setValue("subCategory", "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  onBlur={field.onBlur}
                  placeholder="Select category"
                  searchPlaceholder="Search category..."
                  isLoading={isCategoriesLoading}
                  error={errors.category?.message}
                  options={parentCategories.map((category) => ({
                    label: category.name,
                    value: category.id,
                    description: category.slug,
                  }))}
                />
              )}
            />
            <Controller
              name="subCategory"
              control={control}
              render={({ field }) => (
                <SelectPickerField
                  label="Sub Category"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={
                    !watchedCategoryId
                      ? "Select category first"
                      : "Select subcategory"
                  }
                  searchPlaceholder="Search subcategory..."
                  disabled={!watchedCategoryId}
                  isLoading={isCategoriesLoading}
                  error={errors.subCategory?.message}
                  options={subCategories.map((category) => ({
                    label: category.name,
                    value: category._id,
                    description: category.slug,
                  }))}
                />
              )}
            />
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <SelectPickerField
                  label="Brand"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Select brand"
                  searchPlaceholder="Search brand..."
                  isLoading={isBrandsLoading}
                  error={errors.brand?.message}
                  options={brandOptions.map((brand) => ({
                    label: brand.name,
                    value: brand._id,
                  }))}
                />
              )}
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Product Description <span className="text-error">*</span>
              </label>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2">
                  <select className="select select-ghost h-8 min-h-8 w-32 text-xs">
                    <option>Paragraph</option>
                    <option>Heading</option>
                  </select>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <Bold className="h-4 w-4" />
                  </button>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <Italic className="h-4 w-4" />
                  </button>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <Underline className="h-4 w-4" />
                  </button>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <List className="h-4 w-4" />
                  </button>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <ListOrdered className="h-4 w-4" />
                  </button>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <Link className="h-4 w-4" />
                  </button>

                  <button type="button" className="btn btn-ghost btn-xs">
                    <ImageIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={5}
                    placeholder="Enter detailed description about the product..."
                    className="textarea w-full resize-none border-0 bg-white pr-20 text-sm focus:outline-none"
                    {...register("description")}
                  />

                  <span className="absolute bottom-3 right-4 text-xs font-medium text-slate-400">
                    {description?.length || 0}/5000
                  </span>
                </div>
              </div>

              {errors.description && (
                <p className="mt-1 text-xs font-medium text-error">
                  {errors.description.message}
                </p>
              )}

              <p className="mt-1 text-xs font-medium text-slate-500">
                Provide complete details about your product
              </p>
            </div>
          </div>
        </section>

        <SeoInformationCard
          register={register}
          control={control}
          errors={errors}
        />
      </div>

      <aside className="space-y-6">
        <ProductPreviewCard control={control} />

        <ProductStatusCard control={control} />

        <ProductVisibilityCard control={control} />
      </aside>
    </div>
  );
};

export default ProductBasicInfoStep;
