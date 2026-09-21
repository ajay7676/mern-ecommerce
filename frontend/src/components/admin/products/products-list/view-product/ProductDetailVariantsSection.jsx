import { useMemo, useState } from "react";
import {
  Boxes,
  ImageOff,
  Layers3,
  PackageSearch,
  Search,
} from "lucide-react";


import {
  formatCurrency,
  formatNumber,
  formatVariantStatus,
  getVariantStatusBadgeClass,
  normalizeVariantAttributes,
}  from "../../../../../utils/admin/products/product/productDetailFormatUtils";

const getVariantImageUrl = (variant) => {
  return variant?.image?.url || variant?.images?.[0]?.url || variant?.imageUrl || "";
};

const getVariantSearchText = (variant) => {
  const attributes = normalizeVariantAttributes(variant.attributeValues)
    .map((item) => `${item.attributeName || ""} ${item.label || ""} ${item.value || ""}`)
    .join(" ");

  return [
    variant.name,
    variant.sku,
    variant.status,
    attributes,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

const VariantAttributeChips = ({ attributeValues }) => {
  const attributes = normalizeVariantAttributes(attributeValues);

  if (!attributes.length) {
    return <span className="text-xs text-base-content/40">No attributes</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {attributes.map((attribute, index) => (
        <span
          key={`${attribute.attributeName}-${attribute.value}-${index}`}
          className="inline-flex items-center gap-1 rounded-lg bg-base-200 px-2 py-1 text-xs font-semibold text-base-content/70"
        >
          {attribute.colorCode && (
            <span
              className="h-3 w-3 rounded-full border border-base-300"
              style={{ backgroundColor: attribute.colorCode }}
            />
          )}

          <span className="text-base-content/50">
            {attribute.attributeName}:
          </span>

          <span>{attribute.label || attribute.value}</span>

          {attribute.isCustom && (
            <span className="rounded bg-primary/10 px-1 text-[10px] text-primary">
              Custom
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

const ProductDetailVariantsEmptyState = () => {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-200/50 p-8 text-center">
      <PackageSearch className="h-12 w-12 text-base-content/30" />

      <h4 className="mt-4 text-lg font-bold text-base-content">
        No variants found
      </h4>

      <p className="mt-2 max-w-md text-sm leading-6 text-base-content/60">
        This product does not have variants. Simple products usually have only
        one inventory and pricing setup.
      </p>
    </div>
  );
};

const ProductDetailVariantsSection = ({ variants = [] }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVariants = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return variants.filter((variant) => {
      const matchesSearch = searchText
        ? getVariantSearchText(variant).includes(searchText)
        : true;

      const normalizedStatus =
        variant.status === true
          ? "active"
          : variant.status === false
            ? "inactive"
            : variant.status;

      const matchesStatus =
        statusFilter === "all" || normalizedStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [variants, search, statusFilter]);

  const totalStock = useMemo(() => {
    return variants.reduce((total, variant) => {
      return total + Number(variant.stock || 0);
    }, 0);
  }, [variants]);

  const activeCount = useMemo(() => {
    return variants.filter(
      (variant) => variant.status === true || variant.status === "active"
    ).length;
  }, [variants]);

  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Layers3 className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-base-content">Product Variants</h3>
            <p className="text-xs text-base-content/50">
              Size, color, SKU, price, stock, and status for each variant
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-outline">
            Total: {variants.length}
          </span>

          <span className="badge badge-success">
            Active: {activeCount}
          </span>

          <span className="badge badge-outline">
            Stock: {formatNumber(totalStock)}
          </span>
        </div>
      </div>

      {!variants.length ? (
        <ProductDetailVariantsEmptyState />
      ) : (
        <>
          {/* Filters */}
          <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_220px]">
            <label className="input input-bordered flex h-11 items-center gap-2 rounded-xl">
              <Search className="h-4 w-4 text-base-content/40" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search variants by name, SKU, size, color..."
                className="grow text-sm"
              />
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="select select-bordered h-11 rounded-xl text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-3xl border border-base-300">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="border-base-300 bg-base-200/70">
                    <th>Variant</th>
                    <th>SKU</th>
                    <th>Attributes</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVariants.map((variant) => {
                    const imageUrl = getVariantImageUrl(variant);

                    return (
                      <tr key={variant.id || variant.variantId || variant.sku}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-base-200">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={variant.name || "Variant image"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageOff className="h-5 w-5 text-base-content/30" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-45 truncate font-semibold text-base-content">
                                {variant.name || "Unnamed variant"}
                              </p>

                              <p className="text-xs text-base-content/50">
                                Sort: {variant.sortOrder || "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="rounded-lg bg-base-200 px-2 py-1 text-xs font-semibold text-base-content/70">
                            {variant.sku || "-"}
                          </span>
                        </td>

                        <td className="min-w-65">
                          <VariantAttributeChips
                            attributeValues={variant.attributeValues}
                          />
                        </td>

                        <td>
                          <p className="font-bold text-base-content">
                            {formatCurrency(variant.price)}
                          </p>
                        </td>

                        <td>
                          <span
                            className={`badge gap-1 ${
                              Number(variant.stock || 0) <= 0
                                ? "badge-error"
                                : "badge-success"
                            }`}
                          >
                            <Boxes className="h-3.5 w-3.5" />
                            {formatNumber(variant.stock)}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${getVariantStatusBadgeClass(
                              variant.status
                            )}`}
                          >
                            {formatVariantStatus(variant.status)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {!filteredVariants.length && (
              <div className="flex min-h-45 flex-col items-center justify-center bg-base-100 p-6 text-center">
                <PackageSearch className="h-10 w-10 text-base-content/30" />

                <p className="mt-3 font-semibold text-base-content">
                  No matching variants
                </p>

                <p className="mt-1 text-sm text-base-content/50">
                  Try changing your search or status filter.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetailVariantsSection;