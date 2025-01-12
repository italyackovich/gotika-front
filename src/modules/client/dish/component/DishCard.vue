<script setup lang="ts">

import type { Dish } from '@/types/Dish.ts'
import ButtonDish from '@/modules/client/dish/component/base/ButtonDish.vue'


const { dish } = defineProps<{
  dish: Dish
}>()

</script>

<template>
  <div class="flex flex-col justify-between rounded-2xl w-[250px] h-[362px] shadow-subtle p-4 hover:shadow-strong transition">
    <div>
      <img class="rounded-2xl" :src="dish.imageUrl" alt="img" />
      <h2 class="text-lg font-bold text-nowrap truncate"> {{ dish.name }} </h2>
      <p class="text-sm text-gray-500 truncate"> {{ dish.description }} </p>
    </div>
    <div>
      <p class="text-lg font-bold"> {{ dish.price }} ₽ </p>
<!--      <button class="w-full bg-black text-white py-2 rounded-md" @click="handleAddToCard">-->
<!--        Добавить в заказ-->
<!--      </button>-->
      <ButtonDish :dish="dish"/>
    </div>
  </div>
</template>

<style scoped>

</style>
