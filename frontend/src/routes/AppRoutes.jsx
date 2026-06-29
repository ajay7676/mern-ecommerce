import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/client/home/Home"
import ProductList from "../pages/client/products/ProductList"
import ProductDetails from "../pages/client/product-details/ProductDetails"
import Login from "../pages/client/auth/Login"
import Register from "../pages/client/auth/Register"
import NotFound from "../pages/client/NotFound"
import ProtectedRoute from './ProtectedRoute'
import Cart from "../pages/client/cart/Cart"
import Profile from "../pages/client/profile/Profile"
import Orders from "../pages/client/orders/Orders"
import OrderDetails from "../pages/client/orders/OrderDetails"
import AdminRoute from './AdminRoute'
import PublicRoute from "./PublicRoute";

import { RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:orderId",
            element: <OrderDetails />,
          },
        ],
      },
       {
        element: <AdminRoute />,
        children: [
          {
            path: "admin",
            element: <div>Admin Dashboard</div>,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    
  }
])

const AppRoutes = () => {
     return <RouterProvider router={router} />;
}

export default AppRoutes