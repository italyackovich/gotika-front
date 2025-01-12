import type { Restaurant } from '@/types/Restaurant.ts'
import type { ChangeRequest } from '@/types/dto/ChangeRequest.ts'
import apiClient from '@/core/api/configApi.ts'

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const response = await apiClient.get<Restaurant[]>('/restaurants')
  return response.data
}

export const getRestaurantById = async (id: number) => {
  const response = await apiClient.get<Restaurant>(`/restaurants/${id}`)
  return response.data
}

export const changeImgRest = async (restaurantId: number | undefined, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await apiClient.patch(`/restaurants/${restaurantId}/change-img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data

  } catch (error: any) {
    console.error(error)
  }
}

export const patchRest = async (restaurantId: number | null, changeRequest: ChangeRequest) => {
  const response = await apiClient.patch(`/restaurants/${restaurantId}/patch`, changeRequest)
  return response.data
}


