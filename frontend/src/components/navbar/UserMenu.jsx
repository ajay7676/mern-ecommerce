import { FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

const UserMenu = () => {
  return (
    <div className="hidden md:flex items-center gap-6">
      <div className="flex flex-col items-center text-xs font-semibold text-slate-800 cursor-pointer">
        <FiUser className="text-2xl" />
        <span>Sign In</span>
      </div>

      <div className="flex flex-col items-center text-xs font-semibold text-slate-800 cursor-pointer">
        <FiHeart className="text-2xl" />
        <span>Wishlist</span>
      </div>

      <div className="relative flex flex-col items-center text-xs font-semibold text-slate-800 cursor-pointer">
        <FiShoppingBag className="text-2xl" />
        <span>Bag</span>

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
          2
        </span>
      </div>
    </div>
  );
};

export default UserMenu;