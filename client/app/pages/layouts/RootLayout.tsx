import { Outlet } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid-pro/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";

import { UserProvider } from "../../providers/UserProvider";

import AppTheme from "../../theme/AppTheme";
import {
  chartsCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../../theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function RootLayout(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <UserProvider>
        <AppTheme {...props} themeComponents={xThemeComponents}>
          <CssBaseline enableColorScheme />
          <Outlet />
        </AppTheme>
      </UserProvider>
    </>
  );
}
