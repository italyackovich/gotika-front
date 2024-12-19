import type { User } from '@/types/User.ts'

export interface Review {
  id: number,
  rating: number,
  comment: string,
  createdAt: string,
  userId: number,
  restaurantId: number,
  user: User
}
