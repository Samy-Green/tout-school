import DashboardSidebarContext from '#inertia/context/DashboardSidebarContext'
import { getDrawerSxTransitionMixin } from '#inertia/utilities/mixins'
import Divider from '@mui/material/Divider'
import type {} from '@mui/material/themeCssVarsAugmentation'
import * as React from 'react'

export default function DashboardSidebarDividerItem() {
  const sidebarContext = React.useContext(DashboardSidebarContext)
  if (!sidebarContext) {
    throw new Error('Sidebar context was used without a provider.')
  }
  const { fullyExpanded = true, hasDrawerTransitions } = sidebarContext

  return (
    <li>
      <Divider
        sx={{
          borderBottomWidth: 1,
          my: 1,
          mx: -0.5,
          ...(hasDrawerTransitions ? getDrawerSxTransitionMixin(fullyExpanded, 'margin') : {}),
        }}
      />
    </li>
  )
}
