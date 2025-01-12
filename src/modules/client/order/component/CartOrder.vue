<script setup lang="ts">

import { createPayment } from '@/core/api/paymentApi.ts'
import { useOrderStore } from '@/core/stores/useOrderStore.ts'

const orderStore = useOrderStore()

const handlePayment = async () => {
  try {

    const response = await createPayment(orderStore.orderId)

    window.location.href = response.confirmationUrl
  } catch (error) {
    console.error('Ошибка при создании платежа:', error)
  }
}

</script>

<template>
  <div class="grid grid-rows-8 grid-cols-1 w-1/5 m-4 h-auto text-black shadow-subtle rounded-2xl p-4 justify-between">
    <h2 class="text-lg font-bold mb-4 w-full">Заказ</h2>
    <div class="overflow-y-auto row-span-6 m-auto">
      <ul>
        <li v-for="item in orderStore.orderItems" :key="item.id" class="flex justify-between">
          <span> {{ item.name }} x {{ item.quantity }} = </span>
          <span> {{ (item.price * item.quantity).toFixed(2) }} ₽ </span>
        </li>
      </ul>
      <p v-if="!orderStore.orderItems.length"> Заказ пуст </p>
    </div>
    <div class="">
      <p class="font-bold">Итого: {{ orderStore.orderTotalAmount.toFixed(2)}} ₽</p>
      <button @click="handlePayment" class="w-full bg-black text-white py-2 rounded-md mt-4">
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
