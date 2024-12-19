<script setup lang="ts">
import { ref, type Ref } from 'vue'

import '../styles/header.css'

const searchText: Ref<string> = ref("")

</script>

<template>
  <div class="w-full max-w-lg bg-black rounded-md border-white border-2 flex items-center justify-between">
    <div class="pl-2 bg-black">
      <img class="bg-black" src="@/assets/icons/search.svg" alt="search_icon">
    </div>
    <input
      class="input-header"
      v-model="searchText"
      type="text"
      placeholder="Найти ресторан, блюдо..."
    />
    <button class="text-sm tracking-widest px-4 text-black bg-white h-full">Найти</button>
  </div>
</template>

<style scoped>

</style>
