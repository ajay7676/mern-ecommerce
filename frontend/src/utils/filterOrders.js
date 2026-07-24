
import { ORDER_STATUS } from '../constants/orders/order.constants'

export const filterOrders = (orders = [], activeStatus) => {
  if (activeStatus === ORDER_STATUS.ALL) {
    return orders;
  }

  return orders.filter((order) => order.status === activeStatus);
};