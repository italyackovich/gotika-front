import type { Dish } from '@/types/Dish.ts'

export interface OrderItem {
  id?: number,
  quantity: number,
  name: string,
  price: number,
  orderId: number | null,
  dishId: number,
  dish?: Dish
}
