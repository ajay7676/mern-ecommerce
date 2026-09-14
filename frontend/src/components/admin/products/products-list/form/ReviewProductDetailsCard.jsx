// components/ReviewProductDetailsCard.jsx

import {
  BadgeIndianRupee,
  Boxes,
  FileText,
  ImageIcon,
  Info,
  ShieldCheck,
} from "lucide-react";

import ReviewSectionCard, { ReviewRow } from "./ReviewSectionCard";

import {
  calculatePricing,
  formatCurrency,
} from "../../../../../utils/admin/products/product/productPricingUtils";

const ReviewProductDetailsCard = ({ values, onEditStep }) => {
  const pricing = calculatePricing({
    sellingPrice: values.sellingPrice,
    discountType: values.discountType,
    discountValue: values.discountValue,
    taxClass: values.taxClass,
  });

  const primaryImage =
    values.images?.find((image) => image.isPrimary) || values.images?.[0];

  const visibleImages = values.images?.slice(0, 5) || [];
  const visibleVariants = values.variants?.slice(0, 3) || [];

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">
              Review Product Details
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Review all information before publishing your product.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="btn btn-outline btn-sm rounded-xl"
          >
            Edit All
          </button>
        </div>
      </section>

      <ReviewSectionCard
        title="Basic Information"
        icon={<Info className="h-4 w-4" />}
        onEdit={() => onEditStep(1)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ReviewRow label="Product Name" value={values.productName} />
          <ReviewRow label="SKU" value={values.sku} />
          <ReviewRow label="Product Type" value={values.productType} />
          <ReviewRow label="Category" value={values.category} />
          <ReviewRow label="Sub Category" value={values.subCategory} />
          <ReviewRow label="Brand" value={values.brand} />

          <div className="md:col-span-2">
            <ReviewRow
              label="Short Description"
              value={values.shortDescription}
            />
          </div>
        </div>
      </ReviewSectionCard>

      <ReviewSectionCard
        title="Pricing & Inventory"
        icon={<BadgeIndianRupee className="h-4 w-4" />}
        onEdit={() => onEditStep(2)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ReviewRow
            label="Selling Price"
            value={formatCurrency(values.sellingPrice || 0)}
          />

          <ReviewRow
            label="Final Price"
            value={formatCurrency(pricing.finalSellingPrice)}
          />

          <ReviewRow
            label="Discount"
            value={
              values.discountValue
                ? `${values.discountValue} ${
                    values.discountType === "percentage" ? "%" : "₹"
                  }`
                : "No discount"
            }
          />

          <ReviewRow label="MRP" value={formatCurrency(values.mrp || 0)} />

          <ReviewRow
            label="Stock Quantity"
            value={`${values.stockQuantity || 0} ${values.units || "pcs"}`}
          />

          <ReviewRow
            label="Low Stock Threshold"
            value={`${values.lowStockThreshold || 0} ${values.units || "pcs"}`}
          />
        </div>
      </ReviewSectionCard>

      <ReviewSectionCard
        title="Images & Media"
        icon={<ImageIcon className="h-4 w-4" />}
        onEdit={() => onEditStep(3)}
      >
        <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
          <div>
            <ReviewRow
              label="Total Images"
              value={`${values.images?.length || 0} images`}
            />

            <div className="mt-3">
              <ReviewRow
                label="Video"
                value={values.videoUrl ? "Added" : "Not Added"}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {visibleImages.map((image) => (
              <img
                key={image.imageId || image.id || image.previewUrl}
                src={image.previewUrl || image.url}
                alt={image.altText || "Product"}
                className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
              />
            ))}

            {(values.images?.length || 0) > 5 && (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600">
                +{values.images.length - 5}
              </div>
            )}

            {!primaryImage && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                No images uploaded
              </div>
            )}
          </div>
        </div>
      </ReviewSectionCard>

      <ReviewSectionCard
        title="Attributes & Variations"
        icon={<Boxes className="h-4 w-4" />}
        onEdit={() => onEditStep(4)}
      >
        <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
          <div className="space-y-3">
            <ReviewRow
              label="Attributes"
              value={
                values.attributes?.map((item) => item.name).join(", ") ||
                "No attributes"
              }
            />

            <ReviewRow
              label="Total Variants"
              value={`${values.variants?.length || 0} variants`}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {visibleVariants.map((variant) => (
              <div
                key={variant.variantId}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <img
                  src={variant.imageUrl}
                  alt={variant.name}
                  className="h-11 w-11 rounded-lg object-cover"
                />

                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {variant.name}
                  </p>

                  <p className="text-[11px] font-medium text-slate-500">
                    {variant.sku}
                  </p>
                </div>
              </div>
            ))}

            {(values.variants?.length || 0) > 3 && (
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600">
                +{values.variants.length - 3} more variants
              </div>
            )}
          </div>
        </div>
      </ReviewSectionCard>

      <ReviewSectionCard
        title="Additional Details"
        icon={<FileText className="h-4 w-4" />}
        onEdit={() => onEditStep(5)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ReviewRow label="Collection" value={values.collection} />
          <ReviewRow label="Tags" value={values.tags} />
          <ReviewRow label="HSN Code" value={values.hsnCode} />
          <ReviewRow label="Country of Origin" value={values.countryOfOrigin} />
          <ReviewRow label="Warranty" value={values.warrantyInformation} />
          <ReviewRow label="Return Policy" value={values.returnPolicy} />
          <ReviewRow
            label="Care Instructions"
            value={values.careInstructions}
          />
          <ReviewRow
            label="Safety Information"
            value={values.safetyInformation}
          />
        </div>
      </ReviewSectionCard>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />

          <div>
            <p className="text-sm font-extrabold text-emerald-700">
              You're almost done!
            </p>

            <p className="mt-1 text-sm font-medium text-emerald-700">
              Review everything carefully. Once published, this product can be
              visible on your store.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewProductDetailsCard;
