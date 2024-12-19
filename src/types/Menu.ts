import type { Dish } from '@/types/Dish.ts'

export interface Menu {
  id: number,
  restaurantId: number,
  name: string,
  dishList: Dish[]
}
