import CartList from "../../../components/cart/CartList";
import CouponBox from "../../../components/cart/CouponBox";
import DeliveryAddress from "../../../components/cart/DeliveryAddress";
import OrderSummary from "../../../components/cart/OrderSummary";
import FeatureStrip from "../../../components/home/FeatureStrip";
import ValidCashBox from "../../../components/cart/ValidCashBox";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../../hooks/queries/useAuth";
import useCart from "../../../hooks/queries/cart/useCart";

const EMPTY_CART = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message || error?.message || "Something went wrong"
  );
};

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const {
    data,
    isPending: isCartLoading,
    isError,
    error,
    refetch,
  } = useCart({ enabled: isAuthenticated });

  const totalItems = isAuthenticated ? (data?.cart?.items.length ?? 0) : 0;
  const cart = data?.cart ?? EMPTY_CART;
  const cartItems = Array.isArray(cart.items) ? cart.items : [];

  if (isCartLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-9 w-52 bg-slate-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mt-8">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>

          <div className="h-80 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Cart load nahi ho paya
        </h2>

        <p className="mt-2 text-sm text-red-500">{getErrorMessage(error)}</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="btn bg-red-500 text-white mt-5"
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">
            Your Cart{" "}
            <span className="text-slate-500 text-xl">({totalItems} Items)</span>
          </h1>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 mt-3 hover:text-red-500"
          >
            <FiChevronLeft className="text-2xl" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <CartList items={cartItems} />
            {cartItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <CouponBox />
                <ValidCashBox />
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="space-y-5">
              <DeliveryAddress />
              <OrderSummary cart={cart} />
            </div>
          )}
        </div>

        <FeatureStrip />
      </div>
    </div>
  );
};

export default Cart;
