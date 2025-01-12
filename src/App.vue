<script setup lang="ts">

import MyHeader from '@/core/component/ui/MyHeader.vue'
import { onMounted } from 'vue'
import { useRestaurantStore } from '@/core/stores/useRestaurantStore.ts'

const restaurantStore = useRestaurantStore()

onMounted(() => {
  restaurantStore.loadRestaurantList()
})

</script>

<template>
  <MyHeader v-if="!['/sign-in', '/sign-up', '/employee/dashboard', '/admin/dashboard'].includes($route.path)"/>
  <RouterView/>
</template>

