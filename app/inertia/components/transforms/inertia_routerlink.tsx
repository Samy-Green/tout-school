// InertiaLink.tsx
import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react'
import React from 'react'

type Props = Omit<InertiaLinkProps, 'href'> & { to: string }

export const Link = React.forwardRef<HTMLAnchorElement, Props>(({ to, ...props }, ref) => {
  return <InertiaLink href={to} ref={ref} {...props} />
})

export default Link
