import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "../app/Dashboard";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />{" "}
    </StyledEngineProvider>
  </StrictMode>
);
