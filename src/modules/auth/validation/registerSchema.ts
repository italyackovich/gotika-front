import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z
    .string()
    .nonempty("Имя обязательно"),
  lastName: z
    .string(),
  email: z
    .string()
    .nonempty("Email обязателен")
    .email("Некорректный email"),
  password: z
    .string()
    .nonempty("Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
  })

export type RegisterRequest = z.infer<typeof registerSchema>
