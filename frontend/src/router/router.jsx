import { createBrowserRouter } from "react-router";

import { clientRoutes } from "../routes/client.routes";
import { authRoutes } from "../routes/auth.routes";
import { customerRoutes } from "../routes/customer.routes";
import { adminRoutes } from "../routes/admin.routes";

export const router = createBrowserRouter([
    ...clientRoutes,
    ...authRoutes,
    ...customerRoutes,
    ...adminRoutes,
]);