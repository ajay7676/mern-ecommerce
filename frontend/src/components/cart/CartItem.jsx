import { FiHeart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

const CartItem = ({ item }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
      <div className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr_auto] gap-4 md:gap-6">
        <div className="w-full h-36 md:h-40 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">{item.brand}</h3>
          <p className="text-sm text-slate-600 mt-1">{item.name}</p>

          <p className="text-sm text-slate-600 mt-2">
            {item.variant} <span className="mx-2">•</span> Size: {item.size}
          </p>

          <p className="flex items-center gap-2 text-sm text-green-600 font-semibold mt-4">
            <FaRegCheckCircle />
            In Stock
          </p>

          <p className="text-sm text-slate-600 mt-2">
            Delivery by{" "}
            <span className="font-semibold text-slate-900">
              {item.delivery}
            </span>
          </p>
        </div>

        <div className="col-span-2 md:col-span-1 flex md:flex-col justify-between md:items-end gap-4">
          <div className="md:text-right">
            <div className="flex items-center md:justify-end gap-3">
              <span className="text-xl font-black text-slate-900">
                ₹{item.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{item.mrp}
              </span>
              <span className="text-xs font-bold text-red-500 border border-red-200 rounded-md px-2 py-1">
                {item.discount}% OFF
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
