import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { calculateDiscount } from "../../utils/calculateDiscount";

const ProductCard = ({ product }) => {
  const image = product?.images?.[0]?.url;
  const finalPrice = product?.discountPrice || product?.price;
  const discount = calculateDiscount(product.price, product.discountPrice);
  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
      <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:text-red-500">
        <FiHeart />
      </button>

      <div className="h-44 bg-slate-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold text-slate-900 truncate">
          {product.brand}
        </h3>

        <p className="text-xs text-slate-500 truncate">{product.name}</p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-sm font-bold text-slate-900">
            ₹{finalPrice}
          </span>

          {product.discountPrice && (
            <span className="text-xs text-slate-400 line-through">
              ₹{product.price}
            </span>
          )}

          {discount > 0 && (
            <span className="text-xs text-red-500 font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs text-slate-600">
          <FaStar className="text-orange-400" />
          <span>{product.ratings || 0}</span>
          <span>({product.numReviews || 0})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;