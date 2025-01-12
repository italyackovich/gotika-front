import type { OrderItem } from '@/types/OrderItem.ts'
import apiClient from '@/core/api/configApi.ts'

// Получение заказа
export const fetchOrder = async (orderId: number) => {
  const { data } = await apiClient.get(`/orders/${orderId}`);
  return data;
};

// Добавление блюда в заказ
export const addOrderItem = async (orderItem: OrderItem) => {
  const { data } = await apiClient.post(`/orders/create`, orderItem);
  return data;
};

// Обновление количества блюда в заказе
export const updateOrderItem = async (orderItemId: number, updatedItem: OrderItem) => {
  const { data } = await apiClient.put(`/orders/${orderItemId}`, updatedItem);
  return data;
};
