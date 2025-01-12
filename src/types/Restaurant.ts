import type { Menu } from '@/types/Menu.ts'
import type { User } from '@/types/User.ts'
import type { Order } from '@/types/Order.ts'

export interface Restaurant {
  id: number,
  name: string,
  address: string,
  phoneNumber: string,
  openingHours: string,
  imageUrl: string,
  rating: number,
  menu: Menu,
  userList: User[],
  orderList: Order[]
}
