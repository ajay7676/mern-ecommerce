import { FiHeart, FiShoppingBag } from "react-icons/fi";

const ProductActions = ({quantity , product}) => {
  const isOutOfStock = product?.stock <= 0;

  const handleAddToCart = () => {
    console.log("Product ID:", product?._id);
    console.log("Quantity:", quantity);
  }

  const handleWishlist = () => {
    console.log("Wishlist product:", product?._id);

  }
  return (
    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button className="btn bg-red-500 hover:bg-red-600
       text-white border-none rounded-lg disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
        onClick={handleAddToCart}
       disabled={isOutOfStock}
       >
        <FiShoppingBag />
           {isOutOfStock ? "Out of Stock" : "Add To Bag"}
      </button>
      <button className="btn btn-outline rounded-lg"
          onClick={handleWishlist}
      >
        <FiHeart />
        Wishlist
      </button>
    </div>
  );
};

export default ProductActions;