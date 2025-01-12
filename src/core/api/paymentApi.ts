import apiClient from '@/core/api/configApi.ts'

export const createPayment = async (orderId: number) => {
  const response = await apiClient.post('/payments/create', { orderId })
  return response.data
}
