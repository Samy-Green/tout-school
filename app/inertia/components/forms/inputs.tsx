import React, { useState } from 'react'

export interface TSBasicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  value: string
  setValue: (value: string) => void
  className?: string // pour le wrapper
  classNameInput?: string // pour l'input
}

export const TSBasicInput: React.FC<TSBasicInputProps> = ({
  label,
  error,
  value,
  setValue,
  className,
  classNameInput,
  id,
  ...rest // ← ici on récupère tous les props restants pour les passer à l’input
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${classNameInput || ''}`}
        {...rest} // ← on applique ici tous les props restants (placeholder, type, required, etc.)
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export interface TSPasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  value: string
  setValue: (value: string) => void
  className?: string
  classNameInput?: string
}

export const TSPasswordInput: React.FC<TSPasswordInputProps> = ({
  label,
  error,
  value,
  setValue,
  className,
  classNameInput,
  id,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)
  // const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${classNameInput || ''}`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
