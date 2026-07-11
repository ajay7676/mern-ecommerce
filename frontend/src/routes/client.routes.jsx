import MainLayout from '../layouts/MainLayout'

import Home from "../pages/client/home/Home";
import ProductList from "../pages/client/products/ProductList";
import ProductDetails from "../pages/client/product-details/ProductDetails";
import CategoryProductsPage from "../pages/client/categories/CategoryProductsPage";
import BrandProducts from "../pages/client/brands/BrandProducts";
import SearchPage from "../pages/client/search/SearchPage";
import Cart from "../pages/client/cart/Cart";
import { ROUTES } from "../constants/routes";



export const clientRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.PUBLIC.PRODUCTS,
        element: <ProductList />,
      },
      {
        path: ROUTES.PUBLIC.PRODUCTS,
        element: <ProductList />,
      },
      {
        path: ROUTES.PUBLIC.PRODUCT_DETAILS,
        element: <ProductDetails />,
      },
      {
        path: ROUTES.PUBLIC.CATEGORY_DETAILS,
        element: <CategoryProductsPage />,
      },
      {
        path: ROUTES.PUBLIC.BRAND_DETAILS,
        element: <BrandProducts />,
      },
      {
        path: ROUTES.PUBLIC.SEARCH,
        element: <SearchPage />,
      },
      {
        path: ROUTES.PUBLIC.CART,
        element: <Cart />,
      },
      // {
      //   path: ROUTES.PUBLIC.ABOUT,
      //   element: <AboutPage />,
      // },
      // {
      //   path: ROUTES.PUBLIC.CONTACT,
      //   element: <ContactPage />,
      // },
    ],
  },
];