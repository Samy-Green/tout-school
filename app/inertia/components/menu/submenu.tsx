import { Link, usePage } from '@inertiajs/react'

interface MenuItem {
  url?: string
  name?: string
  icon?: string
  slug?: string | string[]
  target?: string
  badge?: [string, string]
  submenu?: MenuItem[]
}

interface Props {
  menu: MenuItem[]
}

export default function Menu({ menu }: Props) {
  const { url: currentUrl } = usePage()

  const isActive = (item: MenuItem) => {
    if (!item.slug) return false

    if (Array.isArray(item.slug)) {
      return item.slug.some((slug) => currentUrl.startsWith(slug))
    }
    return currentUrl.startsWith(item.slug)
  }

  return (
    <ul className="space-y-1">
      {menu.map((item, index) => {
        const active = isActive(item)

        return (
          <li
            key={index}
            className={`menu-item ${active ? 'bg-primary/10 text-primary font-semibold' : ''}`}
          >
            <Link
              href={item.url || '#'}
              target={item.target || undefined}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/5 transition-colors ${
                item.submenu ? 'cursor-pointer' : ''
              }`}
            >
              {item.icon && <i className={`${item.icon} text-lg`} />}
              <span>{item.name}</span>

              {item.badge && (
                <span
                  className={`ml-auto px-2 py-0.5 text-xs rounded-full bg-${item.badge[0]} text-white`}
                >
                  {item.badge[1]}
                </span>
              )}
            </Link>

            {item.submenu && item.submenu.length > 0 && (
              <div className="ml-4 mt-1 border-l pl-3">
                <Menu menu={item.submenu} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
