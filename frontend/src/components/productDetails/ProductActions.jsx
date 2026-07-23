import { FiHeart, FiShoppingBag } from "react-icons/fi";

const ProductActions = ({
  product,
  onAddToCart,
  addingToCart = false,
  addToCartDisabled = false,
  addToCartLabel = "Add To Bag",
}) => {
  const handleWishlist = () => {
    console.log("Wishlist product:", product?._id);
  };
  return (
    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={onAddToCart}
        disabled={addToCartDisabled || addingToCart}
        className="btn bg-red-500 hover:bg-red-600 text-white border-none rounded-lg disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
      >
        {addingToCart ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Adding...
          </>
        ) : (
          <>
            <FiShoppingBag />
            {addToCartLabel}
          </>
        )}
      </button>
      <button className="btn btn-outline rounded-lg" onClick={handleWishlist}>
        <FiHeart />
        Wishlist
      </button>
    </div>
  );
};

export default ProductActions;
