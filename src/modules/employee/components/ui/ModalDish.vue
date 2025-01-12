<script setup lang="ts">

import { ref } from 'vue'
import { createDish } from '@/core/api/dishApi.ts'
import { Dish } from '@/types/Dish.ts';
import type { DishDto } from '@/types/dto/DishDto.ts'

const { menuId } = defineProps<{
  menuId: number | null
}>()

const dish = ref<DishDto>({
  name: "",
  description: "",
  price: 0,
  category: "MAIN",
  menuId: menuId
})

const saveDish = async () => {
  await createDish(dish.value)
  window.location.reload()
}

</script>

<template>
  <div class="bg-white font-inter p-6 rounded w-full">
    <h2 class="text-lg font-bold mb-4"> Добавить блюдо</h2>
    <form @submit.prevent="saveDish">
      <div class="mb-4">
        <label class="block font-medium">Название:</label>
        <input v-model="dish.name" type="text" class="w-full p-2 border rounded" />
      </div>
      <div class="mb-4">
        <label class="block font-medium">Описание:</label>
        <textarea v-model="dish.description" class="w-full p-2 border rounded"></textarea>
      </div>
      <div class="mb-4">
        <label class="block font-medium">Цена:</label>
        <input v-model="dish.price" type="number" class="w-full p-2 border rounded" />
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
