import ClientAuthLayout from '../layouts/ClientAuthLayout'
import GuestRoute from '../guards/GuestRoute';
import Login from '../pages/client/auth/Login';
import Register from '../pages/client/auth/Register';
import ForgotPassword from "../pages/client/auth/ForgotPassword";
import ResetPassword from "../pages/client/auth/ResetPassword";

import { ROUTES } from "../constants/routes";


export const authRoutes = [
  {
    element: <GuestRoute />,
    children: [
      {
        element: <ClientAuthLayout />,
        children: [
          {
            path: ROUTES.AUTH.LOGIN,
            element: <Login />,
          },
          {
            path: ROUTES.AUTH.REGISTER,
            element: <Register />,
          },
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD,
            element: <ForgotPassword />,
          },
          {
            path: ROUTES.AUTH.RESET_PASSWORD,
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
];