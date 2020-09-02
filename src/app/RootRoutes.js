import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import settingsRoutes from "./views/settings/settingsRoutes";
import complaintsRoutes from "./views/complaints/complaintsRoutes";
import ordersRoutes from "./views/orders/ordersRoutes";
import productsRoutes from "./views/products/productsRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/session/signin" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...ordersRoutes,
  ...settingsRoutes,
  ...complaintsRoutes,
  ...productsRoutes,
  // ...redirectRoute,
  ...errorRoute
];

export default routes;
