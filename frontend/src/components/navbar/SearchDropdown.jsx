import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const SearchDropdown = ({
    products = [],
    isPending,
    isError,
    searchTerm,
    onClose,
}) => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return null;
  }
   console.log(products)
  return  <div className="absolute left-0 top-full mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-500">
          Search results for "{searchTerm}"
        </p>
      </div>

      {isPending && (
        <div className="px-4 py-5 text-sm text-slate-500">
          Searching products...
        </div>
      )}

      {isError && (
        <div className="px-4 py-5 text-sm text-red-500">
          Something went wrong. Please try again.
        </div>
      )}

      {!isPending && !isError && products.length === 0 && (
        <div className="px-4 py-5 text-sm text-slate-500">
          No products found.
        </div>
      )}

      {!isPending && !isError && products.length > 0 && (
        <ul className="max-h-80 overflow-y-auto">
          {products.map((product) => (
            <li key={product._id}>
              <Link
                to={`/products/${product._id}`}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiSearch className="text-slate-400" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                    {product.name}
                  </h4>

                  <p className="text-xs text-slate-500 truncate">
                    {product?.brand?.name} • {product?.category?.name}
                  </p>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  ₹{product.discountPrice || product.price}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>;
};

export default SearchDropdown;
