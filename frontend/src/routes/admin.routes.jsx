import AdminLayout from '../layouts/AdminLayout'

import AdminRoute from '../guards/AdminRoute'

import DashboardPage from '../pages/admin/dashboard/DashboardPage'

import ProductListPage from '../pages/admin/products/ProductListPage'
import EditProductPage from '../pages/admin/products/EditProductPage'
import CreateProductPage from '../pages/admin/products/CreateProductPage'


import ListingPage from '../pages/admin/listings/ListingPage'



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

import GrowthPage from '../pages/admin/growth/GrowthPage';
import AdsPage from '../pages/admin/ads/AdsPage';
import ReportsPage from '../pages/admin/reports/ReportsPage';


import { ROUTES } from "../constants/routes/";
import PaymentsPage from '../pages/admin/payments/PaymentsPage'

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
            path: ROUTES.ADMIN.LISTINGS,
            element: <ListingPage />,
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
            path: ROUTES.ADMIN.PAYMENTS,
            element: <PaymentsPage />,
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
            path: ROUTES.ADMIN.GROWTH,
            element: <GrowthPage />,
          },
          {
            path: ROUTES.ADMIN.ADS,
            element: <AdsPage />,
          },
          {
            path: ROUTES.ADMIN.REPORTS,
            element: <ReportsPage />,
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