import { useMemo, useState } from "react";
import { ORDER_STATUS } from '../../../constants/orders/order.constants'
import { ordersData } from '../../../constants/orders/orders.data'
import { filterOrders } from '../../../utils/filterOrders'

const ITEMS_PER_PAGE = 4;

const useOrders = () => {
  const [activeFilter, setActiveFilter] = useState(
    ORDER_STATUS.ALL,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return filterOrders(ordersData, activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE),
    1,
  );

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredOrders.slice(startIndex, endIndex);
  }, [currentPage, filteredOrders]);

  const changeFilter = (status) => {
    setActiveFilter(status);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return {
    orders: paginatedOrders,
    activeFilter,
    currentPage,
    totalPages,
    changeFilter,
    changePage,
  };
};

export default useOrders;