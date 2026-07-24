import { FiShare2, FiShoppingCart } from "react-icons/fi";

const WishlistHeader = ({
  totalItems,
  onShare,
  onMoveAllToCart,
  isMovingAll = false,
}) => {
  return (
    <header
      className="
        flex flex-col gap-5
        md:flex-row md:items-center md:justify-between
      "
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1
            className="
              text-2xl font-bold tracking-[-0.02em]
              text-slate-950
            "
          >
            My Wishlist
          </h1>

          <span
            className="
              inline-flex min-h-7 items-center rounded-md
              bg-indigo-50 px-3 text-sm font-semibold
              text-indigo-600
            "
          >
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Save your favorite items and buy them later.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onShare}
          className="
            btn h-11 min-h-11 rounded-md
            border-slate-200 bg-white px-5
            font-medium text-indigo-600
            shadow-none hover:border-indigo-200
            hover:bg-indigo-50
          "
        >
          <FiShare2 className="h-4.5 w-4.5" />
          Share Wishlist
        </button>

        <button
          type="button"
          disabled={isMovingAll || totalItems === 0}
          onClick={onMoveAllToCart}
          className="
            btn h-11 min-h-11 rounded-md border-none
            bg-indigo-600 px-5 font-medium text-white
            shadow-none hover:bg-indigo-700
            disabled:bg-indigo-300 disabled:text-white
          "
        >
          {isMovingAll ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <FiShoppingCart className="h-4.5 w-4.5" />
          )}

          Move All to Cart
        </button>
      </div>
    </header>
  );
};

export default WishlistHeader;