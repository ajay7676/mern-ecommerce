import {
  Barcode,
  Boxes,
  Building2,
  CalendarDays,
  FileText,
  FolderTree,
  ShieldCheck,
  Tag,
} from "lucide-react";



import {
  formatDateTime,
  formatProductStatus,
  formatProductType,
  getProductStatusBadgeClass,
} from '../../../../../utils/admin/products/product/productDetailFormatUtils'

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-base-200 text-base-content/60">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
            {label}
          </p>

          <p className="mt-1 wrap-break-word text-sm font-semibold text-base-content">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductDetailInfoSection = ({ product }) => {
  const basic = product?.basicInformation || {};
  const inventory = product?.inventory || {};

  return (
    <section className="space-y-5">
      {/* Main Basic Card */}
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-bold text-base-content">
                {basic.name || "Untitled product"}
              </h3>

              <span className={`badge ${getProductStatusBadgeClass(basic.status)}`}>
                {formatProductStatus(basic.status)}
              </span>

              <span className="badge badge-outline">
                {formatProductType(basic.productType)}
              </span>
            </div>

            <p className="mt-2 text-sm text-base-content/60">
              {basic.shortDescription || "No short description added."}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <span className="badge badge-lg badge-outline">
              SKU: {inventory.sku || "-"}
            </span>

            <span className="badge badge-lg badge-outline">
              Variants: {product?.variants?.length || 0}
            </span>
          </div>
        </div>

        {basic.description && (
          <div className="mt-5 rounded-2xl bg-base-200 px-4 py-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-base-content/50" />
              <p className="text-sm font-bold text-base-content">
                Description
              </p>
            </div>

            <p className="whitespace-pre-line text-sm leading-6 text-base-content/70">
              {basic.description}
            </p>
          </div>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InfoItem
          icon={FolderTree}
          label="Category"
          value={product?.category?.name}
        />

        <InfoItem
          icon={FolderTree}
          label="Sub category"
          value={product?.subCategory?.name}
        />

        <InfoItem
          icon={Building2}
          label="Brand"
          value={product?.brand?.name}
        />

        <InfoItem
          icon={Barcode}
          label="Barcode"
          value={inventory.barcode}
        />

        <InfoItem
          icon={Boxes}
          label="Stock status"
          value={inventory.stockStatus}
        />

        <InfoItem
          icon={CalendarDays}
          label="Created on"
          value={formatDateTime(product?.createdAt)}
        />
      </div>

      {/* SEO Info */}
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-info/10 text-info">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-base-content">SEO Information</h3>
            <p className="text-xs text-base-content/50">
              Search engine metadata
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase text-base-content/50">
              Meta title
            </p>
            <p className="mt-1 text-sm font-semibold text-base-content">
              {product?.seo?.metaTitle || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-base-content/50">
              Meta description
            </p>
            <p className="mt-1 text-sm leading-6 text-base-content/70">
              {product?.seo?.metaDescription || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-base-content/50">
              Keywords
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {product?.seo?.metaKeywords ? (
                String(product.seo.metaKeywords)
                  .split(",")
                  .map((keyword) => keyword.trim())
                  .filter(Boolean)
                  .map((keyword) => (
                    <span
                      key={keyword}
                      className="badge badge-outline gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {keyword}
                    </span>
                  ))
              ) : (
                <span className="text-sm text-base-content/50">-</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailInfoSection;