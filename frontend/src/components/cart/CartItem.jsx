import { FiHeart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { calculateDiscount } from "../../utils/calculateDiscount";

const CartItem = ({ item }) => {
  const discountPercentage = calculateDiscount(
     item.pricing?.current?.price,
      item.pricing?.current?.discountPrice,
    );
  return (
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
          <h3 className="text-lg font-bold text-slate-900">{item?.brand?.name}</h3>
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
                ₹{item.pricing?.current?.discountPrice || item.pricing?.current?.price} 
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{item.pricing?.current?.price }
              </span>
              <span className="text-xs font-bold text-red-500 border border-red-200 rounded-md px-2 py-1">
                {discountPercentage}% OFF
              </span>
            </div>

            <div className="inline-flex items-center border border-slate-200 rounded-lg mt-5 overflow-hidden">
              <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-50">
                <FiMinus />
              </button>
              <span className="w-10 text-center font-semibold">
                {item.quantity}
              </span>
              <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-50">
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end gap-4">
            <button className="text-slate-500 hover:text-red-500">
              <FiTrash2 className="text-xl" />
            </button>

            <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-500">
              <FiHeart />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
