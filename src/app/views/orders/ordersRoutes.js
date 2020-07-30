import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Orders = MatxLoadable({
  loader: () => import("./Orders")
})

const ordersRoutes = [
  {
    path: "/app/orders",
    component: Orders,
    auth: authRoles.admin
  }
];

export default ordersRoutes;
