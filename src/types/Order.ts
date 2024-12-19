import type { OrderItem } from '@/types/OrderItem.ts'
import type { Payment } from '@/types/Payment.ts'

export interface Order {
  id: number,
  status: string,
  totalAmount: number,
  orderDate: string,
  deliveryTime: string,
  orderItems: OrderItem[],
  userId: number,
  restaurantId: number,
  payment: Payment
}
