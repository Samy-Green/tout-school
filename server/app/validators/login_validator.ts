import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    login: vine
      .string()
      .trim()
      .minLength(3)
      .regex(/^[A-Za-z][A-Za-z0-9_.]*[A-Za-z0-9_]$/),

    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).*$/),
    remember: vine.boolean().optional(),
  })
)
