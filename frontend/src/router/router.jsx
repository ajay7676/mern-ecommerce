import { createBrowserRouter } from "react-router";

import { clientRoutes } from "../routes/client.routes";
import { authRoutes } from "../routes/auth.routes";
import { userRoutes } from "../routes/user.routes";
import { adminRoutes } from "../routes/admin.routes";
import { errorRoutes } from "../routes/error.routes";


export const router = createBrowserRouter([
  ...clientRoutes,
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes,
  ...errorRoutes,
]);

