import React from 'react'

export interface TSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  color?: string // Couleur principale (par défaut "blue")
  className?: string
}

export const TSButton: React.FC<TSButtonProps> = ({
  label,
  color = 'blue',
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${color} hover:bg-${color}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color} disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      {...rest}
    >
      {children || label}
    </button>
  )
}
