import { useState } from "react";
import { FiHeart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { calculateDiscount } from "../../utils/calculateDiscount";
import useUpdateCartItem from "../../hooks/mutations/cart/useUpdateCartItem";
import useRemoveCartItem from "../../hooks/mutations/cart/useRemoveCartItem";

const getErrorMessage = (error, fallbackMessage) => {
  return error?.response?.data?.message || error?.message || fallbackMessage;
};

const formatPrice = (price) => {
  const validPrice = Number(price);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(validPrice) ? validPrice : 0);
};

const CartItem = ({ item }) => {
  const [actionError, setActionError] = useState("");

  const updateCartItemMutation = useUpdateCartItem();
  const removeCartItemMutation = useRemoveCartItem();

  const cartItemId = item?.cartItemId;
  const quantity = Number(item?.quantity) || 1;

  const availableQuantity = Number(item?.availability?.availableStock);

  const hasStockInformation = Number.isFinite(availableQuantity);

  const hasReachedMaximumStock =
    hasStockInformation && quantity >= availableQuantity;

  const pricing = item?.pricing?.current ?? {};

  const originalPrice = Number(pricing.price) || 0;

  const finalPrice =
    pricing.finalPrice ?? pricing.discountPrice ?? pricing.price ?? 0;

  const hasDiscount =
    pricing.discountPrice !== null &&
    pricing.discountPrice !== undefined &&
    Number(pricing.discountPrice) < originalPrice;

  const discountPercentage = hasDiscount
    ? calculateDiscount(originalPrice, Number(pricing.discountPrice))
    : 0;

  const isUpdating = updateCartItemMutation.isPending;
  const isRemoving = removeCartItemMutation.isPending;
  const isBusy = isUpdating || isRemoving;

  const handleQuantityChange = (event, cartItemId, newQuantity) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      !cartItemId ||
      !Number.isInteger(newQuantity) ||
      newQuantity < 1 ||
      isBusy
    ) {
      return;
    }
    if (hasStockInformation && newQuantity > availableQuantity) {
      setActionError(`Only ${availableQuantity} item(s) are available`);

      return;
    }

    setActionError("");

    updateCartItemMutation.mutate(
      {
        cartItemId,
        quantity: newQuantity,
      },
      {
        onError: (error) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to update quantity";

          setActionError(message);
        },
      },
    );
  };

  const handleRemoveItem = () => {
    if (!cartItemId || isBusy) return;

    const shouldRemove = window.confirm(
      `Are you sure you want to remove "${item.name}" from your cart?`,
    );

    if (!shouldRemove) return;

    setActionError("");

    removeCartItemMutation.mutate(
      {
        cartItemId,
      },
      {
        onError: (error) => {
          setActionError(getErrorMessage(error, "Unable to remove cart item"));
        },
      },
    );
  };
  return (
    <article
      className="rounded-2xl border border-slate-200
                 bg-white p-4 shadow-sm md:p-5"
      aria-busy={isBusy}
    >
      {actionError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200
                     bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {actionError}
        </div>
      )}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
        <div className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr_auto] gap-4 md:gap-6">
          <div className="w-full h-36 md:h-40 rounded-xl overflow-hidden bg-slate-100">
            {item.image?.url ? (
              <img
                src={item.image.url}
                alt={item.image.alt || item.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No image
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {item?.brand?.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{item?.name}</p>
            {item.sku && (
              <p className="text-sm text-slate-600 mt-2">
                SKU: {item.sku} <span className="mx-2"></span>
              </p>
            )}

            {item.selectedAttributes?.length > 0 && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {item.selectedAttributes.map((attribute) => (
                  <span
                    key={`${attribute.attributeSlug}-${attribute.optionValue}`}
                    className="text-sm text-slate-600"
                  >
                    {attribute.attributeName}:{" "}
                    <strong className="font-semibold">
                      {attribute.optionLabel}
                    </strong>
                  </span>
                ))}
              </div>
            )}
            <p className="flex items-center gap-2 text-sm text-green-600 font-semibold mt-4">
              <FaRegCheckCircle />
              In Stock
            </p>

            <p className="text-sm text-slate-600 mt-2">
              Delivery by{" "}
              <span className="font-semibold text-slate-900">
                {/* {item.delivery} */}
              </span>
            </p>
          </div>

          <div className="col-span-2 md:col-span-1 flex md:flex-col justify-between md:items-end gap-4">
            <div className="md:text-right">
              <div className="flex items-center md:justify-end gap-3">
                <span className="text-xl font-black text-slate-900">
                  {formatPrice(finalPrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>

                    <span className="rounded-md border border-red-200 px-2 py-1 text-xs font-bold text-red-500">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="inline-flex items-center border border-slate-200 rounded-lg mt-5 overflow-hidden">
                <button
                  type="button"
                  disabled={isBusy || quantity <= 1}
                  onClick={(event) =>
                    handleQuantityChange(event, cartItemId, item.quantity - 1)
                  }
                  className="w-9 cur h-9 flex items-center justify-center
                 hover:bg-slate-50 cursor-pointer
                  disabled:cursor-not-allowed 
                  disabled:opacity-40 "
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(event) =>
                    handleQuantityChange(event, cartItemId, item.quantity + 1)
                  }
                  disabled={isBusy || hasReachedMaximumStock}
                  title={
                    hasReachedMaximumStock
                      ? `Only ${availableQuantity} item(s) available`
                      : "Increase quantity"
                  }
                  className="w-9 h-9 flex items-center justify-center
                 hover:bg-slate-50 cursor-pointer
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                 "
                >
                  <FiPlus />
                </button>
              </div>
              {hasReachedMaximumStock && (
                <p
                  role="status"
                  className="mt-2 text-xs font-medium text-orange-600"
                >
                  Maximum available quantity reached
                </p>
              )}
            </div>

            <div className="flex md:flex-col items-center md:items-end gap-4">
              <button
                type="button"
                aria-label={`Remove ${item.name} from cart`}
                onClick={handleRemoveItem}
                disabled={isBusy}
                className="text-slate-500 hover:text-red-500
                         disabled:cursor-not-allowed
                         disabled:opacity-40"
              >
                <FiTrash2
                  className={`text-xl  ${isRemoving ? "animate-pulse disabled:cursor-not-allowed" : "cursor-pointer"}`}
                />
              </button>

              <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-500">
                <FiHeart />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
