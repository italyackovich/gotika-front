import apiClient from '@/core/api/configApi.ts'



export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const response = await apiClient.post(
    '/auth/register',
    { firstName, lastName, email, password }
  )
  return response.data
}

export const login = async (
  email: string,
  password: string
) => {
  const response = await apiClient.post(
    '/auth/login',
    { email, password }
  )
  console.log(response.data)
  return response.data
}

export const refreshAccessToken = async () => {
  const response = await apiClient.post(
    '/auth/refresh')
  return response.data
}
