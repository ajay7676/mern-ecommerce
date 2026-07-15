import OrdersHeader from '../../../components/admin/orders/OrdersHeader'
// import OrdersBanner from "../../../components/admin/orders/OrdersBanner";
import OrderStatusGrid from "../../../components/admin/orders/OrderStatusGrid";
import EmptyOrdersState from "../../../components/admin/orders/EmptyOrdersState";
import OrdersTable from "../../../components/admin/orders/table/OrdersTable";
const OrderListPage = () => {
  return (
      <section className="space-y-5">
      <OrdersHeader />

      {/* <OrdersBanner /> */}

      <OrderStatusGrid />

      <EmptyOrdersState />
      <OrdersTable />
    </section>
  )
}

export default OrderListPage