import { createBrowserRouter } from "react-router";
import Dashboard from "../Dashboard";
import Login from "../pages/application/auth/Login";
import Register from "../pages/application/auth/Register";
import NotFound from "../pages/errors/NotFound";
import AppLayout from "../pages/layouts/AppLayout";
import AuthLayout from "../pages/layouts/AuthLayout";
import RootLayout from "../pages/layouts/RootLayout";
import WebSiteLayout from "../pages/layouts/WebSiteLayout";
import WebSiteHome from "../pages/website/WebSiteHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: WebSiteLayout,
        children: [{ index: true, Component: WebSiteHome }],
      },
      {
        path: "app",
        Component: AppLayout,
        children: [
          { index: true, Component: Dashboard },
          {
            path: "auth",
            Component: AuthLayout,
            children: [
              { path: "login", Component: Login },
              { path: "register", Component: Register },
            ],
          },
        ],
      },
      // Catch-all 404
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
