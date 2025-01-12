<script setup lang="ts">

import ButtonDropdown from '@/core/component/base/ButtonDropdown.vue'
import { useAuthStore } from '@/core/stores/useAuthStore.ts'

const authStore = useAuthStore()
const handleLogout = () => {
  try {
    authStore.logoutUser()
    window.location.reload()
  } catch (err) {
    console.log("Ошибка при выходе: ", err)
  }
}

</script>

<template>

  <div class="absolute text-black px-0 top-20 right-1 bg-white p-4 rounded-2xl shadow-subtle w-64">
    <div class="p-2 flex-col">
      <p class="text-lg font-bold">Имя</p>
      <button class="text-gray">
        В профиль
      </button>
    </div>

    <ButtonDropdown text="Заказы" />
    <ButtonDropdown @click="handleLogout" text="Выйти" />

  </div>

</template>

<style scoped>

</style>
