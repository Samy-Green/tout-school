import { Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

interface MenuItem {
  url?: string
  name?: string
  icon?: string
  slug?: string | string[]
  target?: string
  badge?: [string, string]
  submenu?: MenuItem[]
  menuHeader?: string
}

interface PageProps {
  me: {
    name: string
    roles: string[]
  }
  menu: MenuItem[]
}

const Sidebar: React.FC = () => {
  const page = usePage()
  const props = page.props as unknown as PageProps
  const currentUrl = page.url

  const isActive = (item: MenuItem) => {
    if (!item.slug) return false
    if (Array.isArray(item.slug)) {
      return item.slug.some((slug) => currentUrl.startsWith(slug))
    }
    return currentUrl.startsWith(item.slug)
  }

  const renderMenu = (menu: MenuItem[], level = 0) => {
    return menu.map((item, idx) => {
      // Menu header
      if (item.menuHeader) {
        return (
          <li
            key={idx}
            className="px-4 pt-4 pb-2 text-[0.65rem] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider"
          >
            {item.menuHeader}
          </li>
        )
      }

      const active = isActive(item)
      const [open, setOpen] = useState(active)

      return (
        <li key={idx}>
          <div
            onClick={() => item.submenu && setOpen(!open)}
            className={`flex items-center px-3 py-2 rounded-md transition-all cursor-pointer 
              ${active ? 'bg-primary text-white shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            {item.icon && <i className={`${item.icon} text-lg`} />}
            <span className="ml-2 text-sm font-medium">{item.name}</span>

            {item.badge && (
              <span
                className={`ml-auto px-2 py-0.5 text-xs rounded-full bg-${item.badge[0]} text-white`}
              >
                {item.badge[1]}
              </span>
            )}

            {item.submenu && (
              <i
                className={`ml-auto fas fa-chevron-${open ? 'down' : 'right'} text-xs opacity-60`}
              ></i>
            )}
          </div>

          {/* Submenu */}
          {item.submenu && open && (
            <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3">
              {renderMenu(item.submenu, level + 1)}
            </ul>
          )}
        </li>
      )
    })
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* App brand */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-8" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Tout School</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <ul className="py-3 space-y-1">{renderMenu(props.menu)}</ul>
      </div>
    </aside>
  )
}

export default Sidebar
