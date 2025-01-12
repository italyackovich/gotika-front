<script setup lang="ts">

import DishCard from '@/modules/client/dish/component/DishCard.vue'
import type { Restaurant } from '@/types/Restaurant.ts'
import type { Dish } from '@/types/Dish.ts'

const { restaurant } = defineProps<{
  restaurant: Restaurant | null
}>()

const dishList: Dish[] | undefined = restaurant?.menu.dishList

</script>

<template>
  <div class="flex-1 m-4 p-6 font-inter rounded-md overflow-y-auto">
    <div class="relative z-10 rounded-lg shadow-subtle h-[300px] transition-all duration-300 ease-in-out hover:scale-[1.01] ">
      <img class="rounded-lg blur-[1px] object-cover w-full h-full" :src="restaurant?.imageUrl" alt="img" />
      <p class="absolute z-10 text-white text-5xl font-bold left-2 bottom-0 bg-opacity-0">{{ restaurant?.name }}</p>
    </div>
    <h1 class="text-2xl font-bold mb-6">Список блюд</h1>
    <div class="grid grid-cols-4 gap-4">
      <template v-for="dish in dishList" :key="dish.id">
        <DishCard :dish="dish" />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
