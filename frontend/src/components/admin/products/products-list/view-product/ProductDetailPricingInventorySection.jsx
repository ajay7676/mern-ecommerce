import {
  BadgeIndianRupee,
  Boxes,
  CheckCircle2,
  CircleOff,
  IndianRupee,
  PackageCheck,
  PackageX,
  Percent,
  ShieldCheck,
  Warehouse,
} from "lucide-react";

import {
  formatCurrency,
  formatDateTime,
  formatDiscount,
  formatNumber,
  formatProductStatus,
  formatTaxClass,
  getProductStatusBadgeClass,
  getStockStatusBadgeClass,
  getStockStatusLabel,
}from '../../../../../utils/admin/products/product/productDetailFormatUtils'

const StatCard = ({ icon: Icon, label, value, helper, tone = "base" }) => {
  const toneClassMap = {
    base: "bg-base-200 text-base-content/70",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    info: "bg-info/10 text-info",
  };

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            toneClassMap[tone] || toneClassMap.base
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
            {label}
          </p>

          <p className="mt-1 wrap-break-word text-xl font-bold text-base-content">
            {value}
          </p>

          {helper && (
            <p className="mt-1 text-xs leading-5 text-base-content/50">
              {helper}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, valueClassName = "" }) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-base-200 py-3 last:border-b-0">
      <p className="text-sm text-base-content/60">{label}</p>

      <p className={`text-right text-sm font-semibold text-base-content ${valueClassName}`}>
        {value || "-"}
      </p>
    </div>
  );
};

const ProductStatusTimeline = ({ product }) => {
  const status = product?.basicInformation?.status;
  const publishing = product?.publishing || {};

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10 text-success">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-bold text-base-content">Status & Publishing</h3>
          <p className="text-xs text-base-content/50">
            Current product lifecycle information
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl bg-base-200 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase text-base-content/50">
              Current Status
            </p>

            <p className="mt-1 text-sm font-bold text-base-content">
              {formatProductStatus(status)}
            </p>
          </div>

          <span className={`badge ${getProductStatusBadgeClass(status)}`}>
            {status || "-"}
          </span>
        </div>

        <DetailRow
          label="Publish option"
          value={publishing.publishOption || "-"}
        />

        <DetailRow
          label="Published at"
          value={formatDateTime(publishing.publishedAt)}
        />

        <DetailRow
          label="Scheduled at"
          value={formatDateTime(publishing.scheduledAt)}
        />

        <DetailRow
          label="Last updated"
          value={formatDateTime(product?.updatedAt)}
        />
      </div>
    </div>
  );
};

const ProductVisibilityCard = ({ visibility = {} }) => {
  const visibilityItems = [
    {
      key: "onlineStore",
      label: "Online Store",
      value: visibility.onlineStore,
    },
    {
      key: "mobileApp",
      label: "Mobile App",
      value: visibility.mobileApp,
    },
    {
      key: "pos",
      label: "POS",
      value: visibility.pos,
    },
  ];

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-info/10 text-info">
          <PackageCheck className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-bold text-base-content">Visibility</h3>
          <p className="text-xs text-base-content/50">
            Where this product is visible
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {visibilityItems.map((item) => {
          const isEnabled = Boolean(item.value);

          return (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-2xl bg-base-200 px-4 py-3"
            >
              <p className="text-sm font-semibold text-base-content">
                {item.label}
              </p>

              <span
                className={`badge gap-1 ${
                  isEnabled ? "badge-success" : "badge-ghost"
                }`}
              >
                {isEnabled ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <CircleOff className="h-3.5 w-3.5" />
                )}

                {isEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductDetailPricingInventorySection = ({ product }) => {
  const pricing = product?.pricing || {};
  const inventory = product?.inventory || {};
  const status = product?.basicInformation?.status;

  const discountText = formatDiscount({
    discountType: pricing.discountType,
    discountValue: pricing.discountValue,
  });

  const stockStatusLabel = getStockStatusLabel(inventory.stockStatus);

  const isBackorderAllowed = Boolean(inventory.allowBackorders);

  return (
    <section className="space-y-6">
      {/* Top stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={IndianRupee}
          label="Final Price"
          value={formatCurrency(pricing.finalPrice)}
          helper={`Selling price: ${formatCurrency(pricing.sellingPrice)}`}
          tone="primary"
        />

        <StatCard
          icon={Percent}
          label="Discount"
          value={discountText}
          helper={`Type: ${pricing.discountType || "none"}`}
          tone={pricing.discountType === "none" ? "base" : "success"}
        />

        <StatCard
          icon={Warehouse}
          label="Stock Quantity"
          value={formatNumber(inventory.stockQuantity)}
          helper={`Low stock at ${formatNumber(inventory.lowStockThreshold)}`}
          tone={
            inventory.stockStatus === "outOfStock"
              ? "error"
              : inventory.stockStatus === "lowStock"
                ? "warning"
                : "success"
          }
        />

        <StatCard
          icon={ShieldCheck}
          label="Product Status"
          value={formatProductStatus(status)}
          helper="Current admin status"
          tone={
            status === "active"
              ? "success"
              : status === "draft"
                ? "warning"
                : "base"
          }
        />
      </div>

      {/* Main cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Pricing Card */}
        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BadgeIndianRupee className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-bold text-base-content">
                Pricing Information
              </h3>
              <p className="text-xs text-base-content/50">
                Price, discount, tax and special pricing
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <DetailRow
              label="Selling Price"
              value={formatCurrency(pricing.sellingPrice)}
            />

            <DetailRow
              label="MRP"
              value={formatCurrency(pricing.mrp)}
              valueClassName={
                Number(pricing.mrp) > Number(pricing.finalPrice)
                  ? "line-through text-base-content/40"
                  : ""
              }
            />

            <DetailRow
              label="Final Price"
              value={formatCurrency(pricing.finalPrice)}
              valueClassName="text-primary"
            />

            <DetailRow
              label="Cost Price"
              value={formatCurrency(pricing.costPrice)}
            />

            <DetailRow label="Discount" value={discountText} />

            <DetailRow
              label="Tax Class"
              value={formatTaxClass(pricing.taxClass)}
            />

            <DetailRow
              label="Special Price"
              value={
                pricing.specialPrice
                  ? formatCurrency(pricing.specialPrice)
                  : "-"
              }
            />

            <DetailRow
              label="Special Price From"
              value={formatDateTime(pricing.specialPriceFrom)}
            />

            <DetailRow
              label="Special Price To"
              value={formatDateTime(pricing.specialPriceTo)}
            />
          </div>
        </div>

        {/* Inventory Card */}
        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10 text-warning">
              <Boxes className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-bold text-base-content">
                Inventory Information
              </h3>
              <p className="text-xs text-base-content/50">
                Stock, SKU, barcode and backorder settings
              </p>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-base-200 px-4 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-base-content/50">
                  Stock Status
                </p>

                <p className="mt-1 text-sm font-bold text-base-content">
                  {stockStatusLabel}
                </p>
              </div>

              <span
                className={`badge ${getStockStatusBadgeClass(
                  inventory.stockStatus
                )}`}
              >
                {stockStatusLabel}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <DetailRow label="SKU" value={inventory.sku} />

            <DetailRow label="Barcode" value={inventory.barcode} />

            <DetailRow
              label="Track Inventory"
              value={inventory.trackInventory ? "Enabled" : "Disabled"}
            />

            <DetailRow
              label="Stock Quantity"
              value={`${formatNumber(inventory.stockQuantity)} ${
                inventory.units || "pcs"
              }`}
            />

            <DetailRow
              label="Low Stock Threshold"
              value={`${formatNumber(inventory.lowStockThreshold)} ${
                inventory.units || "pcs"
              }`}
            />

            <DetailRow label="Unit" value={inventory.units || "pcs"} />

            <DetailRow
              label="Backorders"
              value={isBackorderAllowed ? "Allowed" : "Not allowed"}
            />
          </div>
        </div>
      </div>

      {/* Status + Visibility */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProductStatusTimeline product={product} />

        <ProductVisibilityCard visibility={product?.visibility || {}} />
      </div>

      {/* Inventory warning */}
      {inventory.stockStatus === "lowStock" && (
        <div className="rounded-3xl border border-warning/20 bg-warning/10 p-5 text-warning">
          <div className="flex items-start gap-3">
            <PackageX className="mt-0.5 h-5 w-5" />

            <div>
              <p className="font-bold">Low stock warning</p>
              <p className="mt-1 text-sm leading-6">
                This product stock is equal to or below the low stock threshold.
                Please update inventory soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {inventory.stockStatus === "outOfStock" && (
        <div className="rounded-3xl border border-error/20 bg-error/10 p-5 text-error">
          <div className="flex items-start gap-3">
            <PackageX className="mt-0.5 h-5 w-5" />

            <div>
              <p className="font-bold">Out of stock</p>
              <p className="mt-1 text-sm leading-6">
                This product is currently out of stock. Customers should not be
                able to purchase it unless backorders are enabled.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPricingInventorySection;