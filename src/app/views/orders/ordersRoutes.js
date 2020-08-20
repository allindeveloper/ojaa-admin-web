import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Orders = MatxLoadable({
  loader: () => import("./Orders")
})

const ordersRoutes = [
  {
    path: "/home/orders",
    component: Orders,
    auth: authRoles.admin
  }
];

export default ordersRoutes;
