import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    login: vine
      .string()
      .trim()
      .minLength(3)
      .regex(/^[A-Za-z][A-Za-z0-9_.]*[A-Za-z0-9_]$/),
    // `.unique('users', 'login')` ← à implémenter côté serveur si nécessaire
    last_name: vine.string().trim().minLength(1),
    first_name: vine.string().trim().minLength(1),
    email: vine.string().trim().email(),
    // `.unique('users', 'email')` ← à implémenter côté serveur si nécessaire
    phone: vine
      .string()
      .trim()
      .regex(/^[0-9]{8,15}$/),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).*$/)
      .confirmed({ confirmationField: 'password_confirmation' }),
  })
)
