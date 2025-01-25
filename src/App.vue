<script setup lang="ts">

import MyHeader from '@/core/component/ui/MyHeader.vue'
import { onMounted } from 'vue'
import { useRestaurantStore } from '@/core/stores/useRestaurantStore.ts'
import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import { getUser } from '@/core/api/userApi.ts'

const restaurantStore = useRestaurantStore()
const authStore = useAuthStore()

const fetchUser = async () => {
  if (authStore.userId) {
    authStore.user = await getUser(Number(authStore.userId))
  }
}

onMounted(() => {
  restaurantStore.loadRestaurantList()
  fetchUser()
})

</script>

<template>
  <MyHeader v-if="!['/sign-in', '/sign-up', '/employee/dashboard', '/admin/dashboard'].includes($route.path)"/>
  <RouterView/>
</template>

