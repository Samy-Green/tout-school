import { PageProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'

interface FlashMessages {
  success?: string
  error?: string
}

interface Props extends PageProps {
  flash: FlashMessages
}

export default function LoginPage() {
  const props = usePage<Props>().props
  const { flash } = props
  console.log('====================================')
  console.log(props)
  console.log('====================================')
  return (
    <>
      {flash.success && <div className="text-green-600">{flash.success}</div>}
      {flash.error && <div className="text-red-600">{flash.error}</div>}
    </>
  )
}
