import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Settings = MatxLoadable({
  loader: () => import("./Settings")
})

const settingsRoutes = [
  {
    path: "/app/settings",
    component: Settings,
    auth: authRoles.admin
  }
];

export default settingsRoutes;
