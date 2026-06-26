import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
          {product.badge}
        </span>
      )}

      <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:text-red-500">
        <FiHeart />
      </button>

      <div className="h-44 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold text-slate-900 truncate">
          {product.brand}
        </h3>

        <p className="text-xs text-slate-500 truncate">{product.name}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-bold text-slate-900">
            ₹{product.price}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-xs text-red-500 font-semibold">
            {product.discount}% OFF
          </span>
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs text-slate-600">
          <FaStar className="text-orange-400" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;