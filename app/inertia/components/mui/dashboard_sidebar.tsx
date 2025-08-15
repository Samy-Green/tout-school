import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '#inertia/configs/constants'
import DashboardSidebarContext from '#inertia/context/DashboardSidebarContext'
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '#inertia/utilities/mixins'
import { usePage } from '@inertiajs/react'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'
import useMediaQuery from '@mui/material/useMediaQuery'
import * as React from 'react'
import DashboardSidebarDividerItem from './dashboard_sidebar_divider_item'
import DashboardSidebarHeaderItem from './dashboard_sidebar_header_item'
import DashboardSidebarPageItem from './dashboard_sidebar_pageI_iem'

export interface DashboardSidebarProps {
  expanded?: boolean
  setExpanded: (expanded: boolean) => void
  disableCollapsibleSidebar?: boolean
  container?: Element
}

export default function DashboardSidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
}: DashboardSidebarProps) {
  const theme = useTheme()

  const { url: currentUrl } = usePage()

  const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>([])

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'))
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'))

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded)
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded)

  React.useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(
        () => setIsFullyExpanded(true),
        theme.transitions.duration.enteringScreen
      )
      return () => clearTimeout(timeout)
    }
    setIsFullyExpanded(false)
  }, [expanded, theme.transitions.duration.enteringScreen])

  React.useEffect(() => {
    if (!expanded) {
      const timeout = setTimeout(
        () => setIsFullyCollapsed(true),
        theme.transitions.duration.leavingScreen
      )
      return () => clearTimeout(timeout)
    }
    setIsFullyCollapsed(false)
  }, [expanded, theme.transitions.duration.leavingScreen])

  const mini = !disableCollapsibleSidebar && !expanded

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded: boolean) => () => {
      setExpanded(newExpanded)
    },
    [setExpanded]
  )

  const handlePageItemClick = React.useCallback(
    (itemId: string, hasNestedNavigation: boolean) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previous) =>
          previous.includes(itemId) ? previous.filter((id) => id !== itemId) : [...previous, itemId]
        )
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false)
      }
    },
    [mini, setExpanded, isOverSmViewport]
  )

  const hasDrawerTransitions = isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport)

  const isPathMatch = (path: string) => currentUrl === path || currentUrl.startsWith(path + '/')

  const getDrawerContent = React.useCallback(
    (viewport: 'phone' | 'tablet' | 'desktop') => (
      <>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            scrollbarGutter: mini ? 'stable' : 'auto',
            overflowX: 'hidden',
            pt: !mini ? 0 : 2,
            ...(hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding') : {}),
          }}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? MINI_DRAWER_WIDTH : 'auto',
            }}
          >
            <DashboardSidebarHeaderItem>Main items</DashboardSidebarHeaderItem>
            <DashboardSidebarPageItem
              id="employees"
              title="Employees"
              icon={<PersonIcon />}
              href="/employees"
              selected={isPathMatch('/employees') || currentUrl === '/'}
            />
            <DashboardSidebarDividerItem />
            <DashboardSidebarHeaderItem>Example items</DashboardSidebarHeaderItem>
            <DashboardSidebarPageItem
              id="reports"
              title="Reports"
              icon={<BarChartIcon />}
              href="/reports"
              selected={isPathMatch('/reports')}
              defaultExpanded={isPathMatch('/reports')}
              expanded={expandedItemIds.includes('reports')}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  <DashboardSidebarPageItem
                    id="sales"
                    title="Sales"
                    icon={<DescriptionIcon />}
                    href="/reports/sales"
                    selected={isPathMatch('/reports/sales')}
                  />
                  <DashboardSidebarPageItem
                    id="traffic"
                    title="Traffic"
                    icon={<DescriptionIcon />}
                    href="/reports/traffic"
                    selected={isPathMatch('/reports/traffic')}
                  />
                </List>
              }
            />
            <DashboardSidebarPageItem
              id="integrations"
              title="Integrations"
              icon={<LayersIcon />}
              href="/integrations"
              selected={isPathMatch('/integrations')}
            />
          </List>
        </Box>
      </>
    ),
    [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds, currentUrl]
  )

  const getDrawerSharedSx = React.useCallback(
    (isTemporary: boolean) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH

      return {
        displayPrint: 'none',
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'none',
          ...getDrawerWidthTransitionMixin(expanded),
        },
      }
    },
    [expanded, mini]
  )

  const sidebarContextValue = React.useMemo(
    () => ({
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    }),
    [handlePageItemClick, mini, isFullyExpanded, isFullyCollapsed, hasDrawerTransitions]
  )

  return (
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: 'block',
            sm: disableCollapsibleSidebar ? 'block' : 'none',
            md: 'none',
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent('phone')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: disableCollapsibleSidebar ? 'none' : 'block',
            md: 'none',
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('tablet')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('desktop')}
      </Drawer>
    </DashboardSidebarContext.Provider>
  )
}
