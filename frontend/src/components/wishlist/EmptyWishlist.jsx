import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <section
      className="
        flex min-h-110 flex-col items-center
        justify-center rounded-xl border
        border-dashed border-slate-300
        bg-white px-6 text-center
      "
    >
      <div
        className="
          flex h-16 w-16 items-center justify-center
          rounded-full bg-indigo-50 text-indigo-600
        "
      >
        <FiHeart className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950">
        Your wishlist is empty
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Save products you like so you can find and buy them later.
      </p>

      <Link
        to="/products"
        className="
          btn mt-6 h-11 min-h-11 rounded-md
          border-none bg-indigo-600 px-5
          text-white shadow-none hover:bg-indigo-700
        "
      >
        <FiShoppingBag className="h-4.5 w-4.5" />
        Continue Shopping
      </Link>
    </section>
  );
};

export default EmptyWishlist;