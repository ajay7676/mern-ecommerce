import AdminLayout from '../layouts/AdminLayout'

import AdminRoute from '../guards/AdminRoute'

import DashboardPage from '../pages/admin/dashboard/DashboardPage'

import ProductListPage from '../pages/admin/products/ProductListPage'
import EditProductPage from '../pages/admin/products/EditProductPage'
import CreateProductPage from '../pages/admin/products/CreateProductPage'


import CategoryPage from '../pages/admin/categories/CategoryPage';

import BrandsPage from '../pages/admin/brands/BrandsPage';

import OrderListPage from '../pages/admin/orders/OrderListPage';
import OrderDetailsPage from '../pages/admin/orders/OrderDetailsPage';


import UserListPage from '../pages/admin/users/UserListPage';
import UserDetailsPage from '../pages/admin/users/UserDetailsPage';


import ReviewListPage from '../pages/admin/reviews/ReviewListPage';

import CouponListPage from '../pages/admin/coupons/CouponListPage';

import BannerListPage from '../pages/admin/banners/BannerListPage';

import SettingsPage from '../pages/admin/settings/SettingsPage';

import AdminProfilePage from '../pages/admin/profile/AdminProfilePage';

import { ROUTES } from "../constants/routes/";

// src/routes/admin.routes.jsx

export const adminRoutes = [
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.ADMIN.DASHBOARD,
            element: <DashboardPage />,
          },

          {
            path: ROUTES.ADMIN.PRODUCTS,
            element: <ProductListPage />,
          },

          {
            path: ROUTES.ADMIN.CREATE_PRODUCT,
            element: <CreateProductPage />,
          },

          {
            path: ROUTES.ADMIN.EDIT_PRODUCT,
            element: <EditProductPage />,
          },

          {
            path: ROUTES.ADMIN.CATEGORIES,
            element: <CategoryPage />,
          },

          {
            path: ROUTES.ADMIN.BRANDS,
            element: <BrandsPage />,
          },

          {
            path: ROUTES.ADMIN.ORDERS,
            element: <OrderListPage />,
          },

          {
            path: ROUTES.ADMIN.ORDER_DETAILS,
            element: <OrderDetailsPage />,
          },

          {
            path: ROUTES.ADMIN.USERS,
            element: <UserListPage />,
          },

          {
            path: ROUTES.ADMIN.USER_DETAILS,
            element: <UserDetailsPage />,
          },

          {
            path: ROUTES.ADMIN.REVIEWS,
            element: <ReviewListPage />,
          },

          {
            path: ROUTES.ADMIN.COUPONS,
            element: <CouponListPage />,
          },

          {
            path: ROUTES.ADMIN.BANNERS,
            element: <BannerListPage />,
          },

          {
            path: ROUTES.ADMIN.SETTINGS,
            element: <SettingsPage />,
          },

          {
            path: ROUTES.ADMIN.PROFILE,
            element: <AdminProfilePage />,
          },
        ],
      },
    ],
  },
];