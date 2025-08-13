import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export interface FlashProps {
  success?: string
  error?: string
}

export default function TSAlert({ alertMessage }: { alertMessage?: FlashProps }) {
  const flash = alertMessage || usePage<{ flash: FlashProps }>().props.flash
  const [visible, setVisible] = useState(true)

  // Réaffiche et auto-ferme quand un nouveau message arrive
  useEffect(() => {
    if (flash?.success || flash?.error) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [flash])

  if (!visible || (!flash?.success && !flash?.error)) return null

  const type: 'success' | 'error' = flash.success ? 'success' : 'error'
  const message = flash.success || flash.error || ''

  const styles = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: '✅',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: '🚫',
    },
  }

  return (
    <div
      className={`${styles[type].bg} ${styles[type].text} ${styles[type].border} border px-4 py-3 rounded relative flex items-center justify-between`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span>{styles[type].icon}</span>
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="ml-2 text-xl leading-none"
        aria-label="Close"
      >
        X
      </button>
    </div>
  )
}
