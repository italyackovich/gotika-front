<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useRestaurantStore } from '@/core/stores/useRestaurantStore.ts'

const searchText: Ref<string> = ref("")

const restaurantStore = useRestaurantStore()

const isFocused = ref<boolean>(false)

const restaurants = computed(() =>
  restaurantStore.getRestaurantList
)

const filteredRestaurants = computed(() => {
  const query = searchText.value.toLowerCase()
  if (!query) {
    return []
  }
  return restaurants.value.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(query)
  )
})

const handleBlur = () => {
  setTimeout(() => (isFocused.value = false), 200)
}

</script>

<template>
  <div class="w-full relative max-w-lg bg-black rounded-md border-white border-2 flex items-center justify-between">
    <div class="pl-2 bg-black">
      <img class="bg-black" src="../../../assets/icons/search.svg" alt="search_icon">
    </div>
    <input
      class="p-2 flex-1 truncate tracking-widest text-sm focus:outline-none bg-black text-white rounded-md"
      v-model="searchText"
      type="text"
      placeholder="Найти ресторан"
      @focus="isFocused = true"
      @blur="handleBlur"
    />
    <button class="text-sm font-bold tracking-widest px-4 text-black bg-white h-full">Найти</button>
  </div>
  <div v-show="isFocused" class="absolute font-inter tracking-widest text-black h-[200px] w-[400px] overflow-x-auto top-20 rounded-2xl shadow-subtle">
    <ul class="h-full w-full" v-if="filteredRestaurants.length">
      <li class="shadow-subtle my-2" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
        <router-link :to="`/restaurants/${restaurant.id}`">
          <h2>{{restaurant.name}}</h2>
          <p>{{restaurant.address}}</p>
        </router-link>
      </li>
    </ul>
    <p class="flex justify-center items-center h-full" v-if="filteredRestaurants.length === 0"> Ничего не найдено. </p>
  </div>
</template>

<style scoped>

</style>
