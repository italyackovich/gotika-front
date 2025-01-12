import type { Dish } from '@/types/Dish.ts'
import type { Category } from '@/types/Category.ts'

export interface Menu {
  id: number,
  restaurantId: number,
  name: string,
  dishList: Dish[],
  categoryList: Category[]
}
