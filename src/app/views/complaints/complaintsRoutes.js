import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Complaints = MatxLoadable({
  loader: () => import("./Complaints")
})

const complaintsRoute = [
  {
    path: "/app/complaints",
    component: Complaints,
    auth: authRoles.admin
  }
];

export default complaintsRoute;
