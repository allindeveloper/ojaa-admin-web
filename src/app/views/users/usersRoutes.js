import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Users = MatxLoadable({
  loader: () => import("./Users")
})

const usersRoutes = [
  {
    path: "/home/users",
    component: Users,
    auth: authRoles.admin
  }
];

export default usersRoutes;
