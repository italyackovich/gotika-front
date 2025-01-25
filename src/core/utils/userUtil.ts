import type { User } from '@/types/User.ts'

export const getIsAuth = (): string | null => {
  return localStorage.getItem('isAuth')
}

export const saveUser = (user: User) => {
  localStorage.setItem('userId', String(user.id));
  localStorage.setItem('role', user.role)
}

export const getUserId = () => {
  return localStorage.getItem('userId');
}

export const getRole = () => {
  return localStorage.getItem('role');
}

export const clearUser = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('role')
}
