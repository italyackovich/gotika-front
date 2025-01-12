import type { OrderItem } from '@/types/OrderItem.ts'
import apiClient from '@/core/api/configApi.ts'

// Добавление блюда в заказ
export const addOrderItem = async (orderItem: OrderItem) => {
  const { data } = await apiClient.post(`/orderItems/create`, orderItem);
  return data;
};

// Обновление количества блюда в заказе
export const updateOrderItem = async (orderItemId: number, updatedItem: OrderItem) => {
  const { data } = await apiClient.put(`/orderItems/${orderItemId}`, updatedItem);
  return data;
};
