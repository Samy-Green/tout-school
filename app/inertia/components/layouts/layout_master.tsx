import { Head } from '@inertiajs/react'

export default function LayoutMaster({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Head title={title || ''} />
      {children}
    </>
  )
}
