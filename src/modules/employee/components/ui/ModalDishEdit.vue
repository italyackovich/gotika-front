<script setup lang="ts">

import { ref } from 'vue'
import type { DishDto } from '@/types/dto/DishDto.ts'
import { patchDish } from '@/core/api/dishApi.ts'
import type { DishChangeRequest } from '@/types/dto/DishChangeRequest.ts'

const { menuId, dishId } = defineProps<{
  menuId: number | null,
  dishId: number | null
}>()

const dish = ref<DishDto>({
  name: "",
  description: "",
  price: 0,
  category: "MAIN",
  menuId: menuId
})

const request = ref<DishChangeRequest>({
  name: '',
  description: "",
  price: 0
})


const updateDish = async () => {
  await patchDish(dishId, request.value)
  window.location.reload()
}

</script>

<template>
  <div class="bg-white font-inter p-6 rounded w-full">
    <h2 class="text-lg font-bold mb-4"> Редактировать блюдо</h2>
    <form @submit.prevent="updateDish">
      <div class="mb-4">
        <label class="block font-medium">Название:</label>
        <input v-model="request.name" type="text" class="w-full p-2 border rounded" />
      </div>
      <div class="mb-4">
        <label class="block font-medium">Описание:</label>
        <textarea v-model="request.description" class="w-full p-2 border rounded"></textarea>
      </div>
      <div class="mb-4">
        <label class="block font-medium">Цена:</label>
        <input v-model="request.price" type="number" class="w-full p-2 border rounded" />
      </div>
      <div class="flex">
        <button type="submit" class="bg-black text-white w-full py-2 px-4 rounded">
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
