import MainLayout from '../layouts/MainLayout'

import ProtectedRoute from '../guards/ProtectedRoute'


import Profile from '../pages/client/profile/Profile'
import EditProfile from '../pages/client/profile/EditProfile'
import AddressList from '../pages/client/profile/AddressList'

import Orders from '../pages/client/orders/Orders'
import OrderDetails from '../pages/client/orders/OrderDetails'


import Checkout from '../pages/client/checkout/Checkout'
import Payment from '../pages/client/payment/Payment'
import WishList from '../pages/client/wishlist/WishList'


import { ROUTES } from "../constants/routes";


// src/routes/customer.routes.jsx

export const userRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.CUSTOMER.PROFILE,
            element: <Profile />,
          },
          {
            path: ROUTES.CUSTOMER.PROFILE_EDIT,
            element: <EditProfile />,
          },
          {
            path: ROUTES.CUSTOMER.ADDRESSES,
            element: <AddressList />,
          },
          {
            path: ROUTES.CUSTOMER.ORDERS,
            element: <Orders />,
          },
          {
            path: ROUTES.CUSTOMER.ORDER_DETAILS,
            element: <OrderDetails />,
          },
          {
            path: ROUTES.CUSTOMER.CHECKOUT,
            element: <Checkout />,
          },
          {
            path: ROUTES.CUSTOMER.PAYMENT,
            element: <Payment />,
          },
          {
            path: ROUTES.CUSTOMER.WISHLIST,
            element: <WishList />,
          },
        ],
      },
    ],
  },
];