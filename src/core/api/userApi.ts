import type { ChangeAddress } from '@/types/dto/ChangeAddress.ts'
import apiClient from '@/core/api/configApi.ts'

export const getUser = async (id: number) => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data
}

export const patchUser = async (userId: number | null, changeAddress: ChangeAddress) => {
  const response = await apiClient.patch(`/users/${userId}/patch`, changeAddress)
  return response.data
}
