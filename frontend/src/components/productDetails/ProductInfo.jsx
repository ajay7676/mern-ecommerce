import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import OfferBox from "./OfferBox";
import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";
import { calculateDiscount } from "../../utils/calculateDiscount";
import useVariantSelection from "../../hooks/mutations/products/useVariantSelection";
import useAddToCart from "../../hooks/mutations/cart/useAddToCart";

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ??
    error?.message ??
    "Unable to add item to cart"
  );
};

const ProductInfo = ({ product, variantData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const variants = variantData?.variants ?? [];
  const options = variantData?.options ?? {};
  const {
    selectedOptions,
    selectedVariant,
    quantity,
    maximumQuantity,
    selectOption,
    isOptionDisabled,
    updateQuantity,
    allOptionsSelected,
    canAddToCart,
  } = useVariantSelection({
    variants,
    options,
    fallbackInventory: product,
  });

  const {
    mutate: addToCart,
    isPending: addingToCart,
    isSuccess: addedSuccessfully,
    isError: addToCartFailed,
    error: addToCartError,
    data: addToCartResponse,
  } = useAddToCart();

  console.log(selectedVariant);

  const priceSource = selectedVariant ?? product;

  const regularPrice = priceSource?.price ?? product?.price ?? 0;

  const finalPrice = priceSource?.discountPrice ?? regularPrice;

  const discountPercentage = calculateDiscount(
    regularPrice,
    priceSource?.discountPrice,
  );

  const handleAddToCart = () => {
    if (!product._id || !canAddToCart || addingToCart) return;

    addToCart(
      {
        productId: product._id,
        variantId: selectedVariant?._id ?? null,
        quantity,
      },
      {
        onError: (error) => {
          if (error?.response?.status === 401) {
            navigate("/login", {
              state: {
                from: location.pathname,
              },
            });
          }
        },
      },
    );
  };

   let addToCartLabel =
    "Add To Bag";

  if (
    variants.length > 0 &&
    !allOptionsSelected
  ) {
    addToCartLabel =
      "Select Options";
  } else if (
    allOptionsSelected &&
    variants.length > 0 &&
    !selectedVariant
  ) {
    addToCartLabel =
      "Combination Unavailable";
  } else if (!canAddToCart) {
    addToCartLabel =
      "Out of Stock";
  }
  return (
    <div className="flex flex-col">
      <p className="font-bold text-slate-700">
        {product?.brand.name || "Brand"}
      </p>
      <h1 className="text-2xl font-semibold text-slate-700 mt-1">
        {product?.name}
      </h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
        {product?.ratings > 0 && (
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            {product.ratings}

            <FaStar className="text-orange-400" />
          </span>
        )}

        {product?.reviews?.length > 0 && (
          <span>{product.reviews.length} Reviews</span>
        )}
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-black text-slate-700">₹{finalPrice}</h2>
        <p className="text-sm text-slate-500 mt-1">
          MRP <span className="line-through">₹{product?.price}</span>{" "}
          <span className="text-red-500 font-bold ml-2">
            {discountPercentage > 0 ? `${discountPercentage}% OFF` : ""}
          </span>
        </p>
        <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes</p>
      </div>
      {product?.description && (
        <p className="text-sm text-slate-600 leading-6 mt-5">
          {product.description}
        </p>
      )}
      <div className="mt-5 rounded-xl bg-cyan-100 p-4">
        <p className="text-sm font-bold text-slate-700">STYLE REWARDS</p>
        <p className="text-sm text-slate-600 mt-1">
          Earn Style Points with every purchase
        </p>
      </div>
      <OfferBox />
      <VariantSelector
        options={options}
        selectedOptions={selectedOptions}
        selectedVariant={selectedVariant}
        allOptionsSelected={allOptionsSelected}
        onSelectOption={selectOption}
        isOptionDisabled={isOptionDisabled}
      />
      <QuantitySelector
        value={quantity}
        max={Math.max(maximumQuantity, 1)}
        onChange={updateQuantity}
        disabled={!canAddToCart}
      />

       <ProductActions
        product={product}
        onAddToCart={
          handleAddToCart
        }
        addingToCart={
          addingToCart
        }
        addToCartDisabled={
          !canAddToCart
        }
        addToCartLabel={
          addToCartLabel
        }
      />

      <div
        className="mt-3 min-h-6"
        aria-live="polite"
      >
        {addedSuccessfully && (
          <p className="text-sm font-medium text-success">
            {addToCartResponse
              ?.message ??
              "Item added to cart successfully"}
          </p>
        )}

        {addToCartFailed &&
          addToCartError?.response
            ?.status !== 401 && (
            <p className="text-sm font-medium text-error">
              {getErrorMessage(
                addToCartError
              )}
            </p>
          )}
      </div>
    </div>
  );
};

export default ProductInfo;
