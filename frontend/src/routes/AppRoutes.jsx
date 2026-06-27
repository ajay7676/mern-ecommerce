import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/home/Home"
import ProductList from "../pages/products/ProductList"
import ProductDetails from "../pages/product-details/ProductDetails"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import NotFound from "../pages/NotFound"
import ProtectedRoute from './ProtectedRoute'
import Cart from "../pages/cart/Cart"
import Profile from "../pages/profile/Profile"
import Orders from "../pages/orders/Orders"
import OrderDetails from "../pages/orders/OrderDetails"
import AdminRoute from './AdminRoute'


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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
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