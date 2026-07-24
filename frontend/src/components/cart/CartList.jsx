import { Link } from "react-router";
import CartItem from "./CartItem";

const CartList = ({ items = [] }) => {
  if (items.length === 0) {
  
    return (
      <div className="rounded-xl border border-slate-200 p-10 text-center">
        <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
        <Link
          to="/products"
          className="btn bg-red-500 hover:bg-red-600
                     border-none text-white mt-5"
        >
          Start Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      
      {items.map((item) => (
        <CartItem key={item.cartItemId} item={item} />
      ))}
    </div>
  );
};

export default CartList;
