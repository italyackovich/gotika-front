import type { Order } from '@/types/Order.ts'
import type { Review } from '@/types/Review.ts'

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  restaurantId: number,
  imageUrl: string,
  role: string,
  phoneNumber: string,
  address: string,
  orderList: Order[],
  reviewList: Review[]
}
