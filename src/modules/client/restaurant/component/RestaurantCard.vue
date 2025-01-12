<script setup lang="ts">

import type { Restaurant } from '@/types/Restaurant.ts'

const { restaurant } = defineProps<{
  restaurant: Restaurant,
}>()

</script>

<template>
  <router-link :to="`/restaurants/${restaurant.id}`">
    <div class="w-72 h-36 font-inter rounded-lg shadow-subtle">
      <div class="w-full h-full rounded-lg">
        <img class="w-full h-full object-cover rounded-lg" :src="restaurant.imageUrl" alt="img"/>
      </div>
      <div class="flex items-center justify-between">
        <p class="mt-2.5 tracking-widest">{{ restaurant.name }}</p>
        <div class="flex">
          <p> 0.0 </p>
          <img src="../../../../assets/icons/rate.svg" alt="img" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
</style>
