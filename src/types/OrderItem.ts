import type { Dish } from '@/types/Dish.ts'

export interface OrderItem {
  id: number,
  quantity: number,
  price: number,
  orderId: number,
  dishId: number,
  dish: Dish
}
