<script setup lang="ts">

import RestaurantCard from '@/modules/client/restaurant/component/RestaurantCard.vue'
import { useRestaurantStore } from '@/core/stores/useRestaurantStore.ts'
import { computed, onMounted } from 'vue'

const restaurantStore = useRestaurantStore()

const restaurantList = computed(() => restaurantStore.getRestaurantList)
const isLoading = computed(() => restaurantStore.getIsLoading)

const isSkeletons = computed(() => isLoading.value ? "animate-pulse" : "")

onMounted(() => {
  restaurantStore.loadRestaurantList()
})

</script>

<template>
  <div class="space-y-6">
    <p class="font-inter tracking-widest font-bold text-3xl">Рестораны</p>
    <div class="grid grid-cols-5 gap-y-16 gap-x-6">
      <template v-for="restaurant in restaurantList" :key="restaurant.id">
        <RestaurantCard :restaurant="restaurant" />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
