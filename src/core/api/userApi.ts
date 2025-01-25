import type { ChangeAddress } from '@/types/dto/ChangeAddress.ts'
import apiClient from '@/core/api/configApi.ts'
import type { ChangeUserCredentials } from '@/types/dto/ChangeUserCredentials.ts'

export const getUser = async (id: number) => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data
}

export const patchUser = async (userId: number | null, changeAddress: ChangeAddress) => {
  const response = await apiClient.patch(`/users/${userId}/patch`, changeAddress)
  return response.data
}

export const changeUserCred = async (userId: number | null, changeUserCredentials: ChangeUserCredentials) => {
  console.log(changeUserCredentials)
  const response = await apiClient.patch(`/users/${userId}/ch-cred`, changeUserCredentials)
  console.log(response)
  return response.data

}

export const changeImgUser = async (userId: number | null, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await apiClient.patch(`/users/${userId}/change-img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data

  } catch (error: any) {
    console.error(error)
  }
}
