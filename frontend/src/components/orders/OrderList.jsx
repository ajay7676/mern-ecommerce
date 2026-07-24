import EmptyState from '../ui/EmptyState'
import OrderCard from "./OrderCard";

const OrderList = ({ orders = [] }) => {
  if (orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;