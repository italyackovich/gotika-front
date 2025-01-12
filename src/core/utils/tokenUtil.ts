import type { User } from '@/types/User.ts'

export const saveTokens = (accessToken: string, refreshToken: string, user: User) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', String(user.id));
  localStorage.setItem('role', user.role)
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
}

export const getUserId = () => {
  return localStorage.getItem('userId');
}

export const getRole = () => {
  return localStorage.getItem('role');
}

export const clearTokens = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('role')
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
