import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Complaints = MatxLoadable({
  loader: () => import("./Complaints")
})

const complaintsRoute = [
  {
    path: "/home/complaints",
    component: Complaints,
    auth: authRoles.admin
  }
];

export default complaintsRoute;
