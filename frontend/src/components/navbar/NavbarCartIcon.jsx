import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/queries/useAuth";
import useCart from "../../hooks/queries/cart/useCart";

const NavbarCartIcon = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useCart({ enabled: isAuthenticated });

  const totalItems = isAuthenticated ? (data?.cart?.items.length ?? 0) : 0;
  const displayCount = totalItems > 99 ? "99+" : totalItems;
  const destination = isAuthenticated ? "/cart" : "/login";

  return (
    <Link
      to={destination}
      state={!isAuthenticated ? { from: "/cart" } : undefined}
      className="flex flex-col items-center text-xs font-semibold "
      
    >
      <FiShoppingCart className="relative flex text-2xl items-center justify-center  text-slate-700 transition hover:bg-slate-100"
      aria-label={
        isAuthenticated
          ? `Open cart with ${totalItems} items`
          : "Login to view cart"
      }
      />
        <span>Cart</span>
      {!isLoading && totalItems > 0 && (
        <span className="absolute right-1.5 top-2.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
          {displayCount}
        </span>
      )}
    </Link>
  );
};

export default NavbarCartIcon;
