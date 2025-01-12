import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { OrderItem } from '@/types/OrderItem.ts'
import axios from 'axios'
import type { Dish } from '@/types/Dish.ts'

export const useOrderStore = defineStore('order', () => {

  const orderId = ref<number | null>(null)
  const orderItems = ref<Array<OrderItem>>([])
  const orderTotalAmount = computed(() =>
    orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const createOrder = async (userId: number, restaurantId: number) => {
    if (!orderId.value) {
      const response = await axios.post('http://localhost:8080/api/v1/orders/create', {userId, restaurantId })
      orderId.value = response.data.id
      console.log(orderId)
    }
  }

  const addDishToOrder = async (
    dish: Dish,
    userId: number,
    restaurantId: number
  )=> {

    await createOrder(userId, restaurantId)

    const existingItem = orderItems
      .value
      .find((orderItem) => orderItem.dishId === dish.id)

    if (existingItem) {
      existingItem.quantity += 1
      await axios.put(`http://localhost:8080/api/v1/orderItems/${existingItem.id}/update`, existingItem)

      return { id: existingItem.id }
    } else {
      const response =await axios.post(
        'http://localhost:8080/api/v1/orderItems/create',
        {
          quantity: 1,
          dishId: dish.id,
          orderId: orderId.value
        })
      orderItems.value.push({ id: response.data.id, dishId: dish.id, name: dish.name, price: dish.price, dish: dish, quantity: 1, orderId: orderId.value})
      return {
        id: response.data.id
      }
    }
  }

  const removeDishFromOrder = async (id: number) => {
    const existingItem = orderItems.value.find((orderItem) => orderItem.id === id)
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1
        await axios.put(`http://localhost:8080/api/v1/orderItems/${id}/update`, existingItem)
      } else {
        orderItems.value = orderItems.value.filter((orderItem) => orderItem.id !== id)
        await axios.delete(`http://localhost:8080/api/v1/orderItems/${id}/delete`)

      }
    }
  }

  return {
    orderId,
    orderItems,
    orderTotalAmount,
    createOrder,
    addDishToOrder,
    removeDishFromOrder
  }

})
