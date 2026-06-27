import { FiHeart, FiShoppingBag } from "react-icons/fi";

const ProductActions = () => {
  return (
    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button className="btn bg-red-500 hover:bg-red-600 text-white border-none rounded-lg">
        <FiShoppingBag />
        Add To Bag
      </button>

      <button className="btn btn-outline rounded-lg">
        <FiHeart />
        Wishlist
      </button>
    </div>
  );
};

export default ProductActions;