import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import settingsRoutes from "./views/settings/settingsRoutes";
import complaintsRoutes from "./views/complaints/complaintsRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/app/dashboard" />
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
  ...settingsRoutes,
  ...complaintsRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
