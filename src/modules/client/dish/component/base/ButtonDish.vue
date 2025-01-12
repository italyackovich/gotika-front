<script setup lang="ts">

import { ref } from 'vue'
import { useOrderStore } from '@/core/stores/useOrderStore.ts'
import { getUserId } from '@/core/utils/tokenUtil.ts'
import type { Dish } from '@/types/Dish.ts'
import { useRoute } from 'vue-router'

const { dish } = defineProps<{
  dish: Dish
}>()

const isAdded = ref(false)

const orderStore = useOrderStore()

const userId = Number(getUserId())

const orderItemId = ref<number | null>(null)

const route = useRoute()

const restaurantId = Number(route.params.id)

const handleAddToOrder = async () => {
  const response = await orderStore.addDishToOrder(dish, userId, restaurantId)
  orderItemId.value = response.id
  console.log(orderItemId.value)
}

const handleRemoveFromOrder = async () => {
  if (orderItemId.value) {
    await orderStore.removeDishFromOrder(orderItemId.value)
  }
}

const firstAdd = () => {
  isAdded.value = true
  handleAddToOrder()
}

</script>

<template>
  <button v-if="!isAdded" class="w-full bg-black text-white py-2 rounded-md" @click="firstAdd">
    Добавить в корзину
  </button>
  <div v-else class="flex">
    <button @click="handleRemoveFromOrder" class="w-full bg-black text-white py-2 rounded-md">
      -
    </button>
    <button @click="handleAddToOrder" class="w-full bg-black text-white py-2 rounded-md">
      +
    </button>
  </div>
</template>

<style scoped>

</style>
