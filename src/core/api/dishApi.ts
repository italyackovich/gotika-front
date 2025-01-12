import type { DishDto } from '@/types/dto/DishDto.ts'
import type { DishChangeRequest } from '@/types/dto/DishChangeRequest.ts'
import apiClient from '@/core/api/configApi.ts'


export const createDish = async (dish: DishDto)=> {
  console.log(dish)
  const response = await apiClient.post('/dishes/create', dish )
  return response.data
}

export const deleteDish = async (dishId: number) => {
  const response = await apiClient.delete(`/dishes/${dishId}/delete`)
  return response.data
}

export const updateDish = async (dishId: number, dish: DishDto) => {
  const response = await apiClient.post(`/dishes/${dishId}/update`, dish )
  return response.data
}

export const patchDish = async (dishId: number | null, request: DishChangeRequest) => {
  const response = await apiClient.patch(`/dishes/${dishId}/patch`, request)
  return response.data
}

export const changeImgDish = async (dishId: number, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await apiClient.patch(`/dishes/${dishId}/change-img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data

  } catch (error: any) {
    console.error(error)
  }
}
