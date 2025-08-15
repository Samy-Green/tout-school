// hooks/useNavigate.ts
import { router, usePage } from '@inertiajs/react'
import { useCallback } from 'react'

export function useNavigate() {
  return useCallback((url: string, options?: { replace?: boolean; data?: any }) => {
    if (options?.replace) {
      router.replace(options?.data)
    } else {
      router.get(url, options?.data)
    }
  }, [])
}

// hooks/useParams.ts

export function useParams() {
  const page = usePage()
  return page.props
}

// hooks/useSearchParams.ts
import { useMemo } from 'react'

export function useSearchParams() {
  const page = usePage()
  const url = new URL(page.url, window.location.origin)

  const setSearchParams = useCallback(
    (newParams: Record<string, string | number | boolean | null | undefined>) => {
      const updatedUrl = new URL(page.url, window.location.origin)
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          updatedUrl.searchParams.delete(key)
        } else {
          updatedUrl.searchParams.set(key, String(value))
        }
      })
      router.get(
        updatedUrl.pathname + updatedUrl.search,
        {},
        { preserveState: true, replace: true }
      )
    },
    [page.url]
  )

  const searchParams = useMemo(() => {
    const paramsObj: Record<string, string> = {}
    url.searchParams.forEach((value, key) => {
      paramsObj[key] = value
    })

    return {
      ...paramsObj,
      get: (key: string) => paramsObj[key] ?? null,
      set: (key: string, value: string | number | boolean | null | undefined) => {
        setSearchParams({ [key]: value })
      },
      delete: (key: string) => {
        setSearchParams({ [key]: undefined })
      },
    }
  }, [page.url, setSearchParams])

  return [searchParams, setSearchParams] as const
}

export function useLocation() {
  const page = usePage()
  const url = new URL(page.url, window.location.origin)

  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
  }
}
