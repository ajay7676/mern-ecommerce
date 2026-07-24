import useOrders from "../../hooks/queries/orders/useOrders";
import OrderFilters from "./OrderFilters";
import OrderList from "./OrderList";
// import OrdersHeader from "./OrdersHeader";
import OrdersPagination from "./OrdersPagination";

const OrdersContent = () => {
  const {
    orders,
    activeFilter,
    currentPage,
    totalPages,
    changeFilter,
    changePage,
  } = useOrders();

  return (
    <>
      <div className="mt-3">
        <OrderFilters activeFilter={activeFilter} onChange={changeFilter} />
      </div>

      <div className="mt-5">
        <OrderList orders={orders} />
      </div>

      <div className="mt-8">
        <OrdersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      </div>
    </>
  );
};

export default OrdersContent;
