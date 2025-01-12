import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Почта обязательна")
    .email("Некорректный формат почты"),
  password: z
    .string()
    .nonempty("Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов")
})

export type LoginRequest = z.infer<typeof loginSchema>
