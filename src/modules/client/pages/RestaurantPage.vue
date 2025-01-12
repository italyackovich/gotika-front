<script setup lang="ts">

import DishCardList from '@/modules/client/dish/component/DishCardList.vue'
import { useRestaurantStore } from '@/core/stores/useRestaurantStore.ts'
import { useRoute } from 'vue-router'
import CartOrder from '@/modules/client/order/component/CartOrder.vue'
import { computed, onMounted } from 'vue'

const restaurantStore = useRestaurantStore()
const route = useRoute()
const restaurant = computed(() =>
  restaurantStore.getRestaurant
)

onMounted(() => {
  restaurantStore.loadRestaurantById(Number(route.params.id))
})

</script>

<template>
  <div class="flex font-inter p-4 tracking-widest h-[820px] overflow-hidden">
    <div class="w-1/6 m-4 h-[600px] rounded-md p-4 overflow-y-auto">
      <p class="text-lg font-bold mb-4"></p>
<!--      <ul class="space-y-2">-->
<!--        <li v-for="n in 10" :key="n">-->
<!--          <button class="text-left w-full hover:bg-lightGray px-2 py-1 rounded">-->
<!--            Category-->
<!--          </button>-->
<!--        </li>-->
<!--      </ul>-->
    </div>

    <DishCardList v-if="restaurant" :restaurant="restaurant" />

    <CartOrder/>

  </div>
</template>

<style scoped>

</style>
