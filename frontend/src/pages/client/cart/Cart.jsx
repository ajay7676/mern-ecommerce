
import CartList from "../../../components/cart/CartList";
import CouponBox from "../../../components/cart/CouponBox";
import DeliveryAddress from "../../../components/cart/DeliveryAddress";
import OrderSummary from "../../../components/cart/OrderSummary";
import FeatureStrip from "../../../components/home/FeatureStrip";
import ValidCashBox from "../../../components/cart/ValidCashBox";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router";

const Cart = () => {
  return (
   <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">
            Your Cart <span className="text-slate-500 text-xl">(3 Items)</span>
          </h1>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 mt-3 hover:text-red-500"
          >
            <FiChevronLeft />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <CartList />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <CouponBox />
              <ValidCashBox />
            </div>
          </div>

          <div className="space-y-5">
            <DeliveryAddress />
            <OrderSummary />
          </div>
        </div>

        <FeatureStrip />
      </div>
    </div>
  )
}

export default Cart