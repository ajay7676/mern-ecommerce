import {orderStatus } from './data/orderStatus.data';
import OrderStatusCard from "./OrderStatusCard";

const OrderStatusGrid = () => {
  return (
     <section>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        {orderStatus.map((item) => (
          <OrderStatusCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </section>
  )
}

export default OrderStatusGrid