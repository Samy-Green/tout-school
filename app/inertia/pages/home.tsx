import DashboardLayout from '#components/mui/dashboard_layout'
import AppTheme from '#inertia/theme/AppTheme'
import {
  dataGridCustomizations,
  datePickersCustomizations,
  formInputCustomizations,
  sidebarCustomizations,
} from '#inertia/theme/customizations/index'
import { usePage } from '@inertiajs/react'

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
}

export default function CrudDashboard(props: { disableCustomTheme?: boolean }) {
  const page = usePage()

  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <DashboardLayout>
        <h1>TEST</h1>
      </DashboardLayout>
    </AppTheme>
  )
}
