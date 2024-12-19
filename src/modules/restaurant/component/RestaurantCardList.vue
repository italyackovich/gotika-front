<script setup lang="ts">

import RestaurantCard from '@/modules/restaurant/component/RestaurantCard.vue'

</script>

<template>
  <div class="space-y-6">
    <p class="font-inter tracking-widest font-bold text-3xl">Рестораны</p>
    <div class="grid grid-cols-5 gap-y-12 gap-x-6">
      <RestaurantCard v-for="n in 10" :key="n"/>
    </div>
  </div>
</template>

<style scoped>

</style>
