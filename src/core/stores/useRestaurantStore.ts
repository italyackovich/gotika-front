import { defineStore } from 'pinia'
import type { Restaurant } from '@/types/Restaurant.ts'
import { computed, ref } from 'vue'
import { getAllRestaurants, getRestaurantById } from '@/core/api/restaurantApi.ts'

export const useRestaurantStore = defineStore("restaurant", () => {
  const restaurantList = ref<Restaurant[]>([]);
  const restaurant = ref<Restaurant>()
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const loadRestaurantList = async () => {
    isLoading.value = true
    error.value = null
    try {
      restaurantList.value = await getAllRestaurants()
    } catch (err) {
      error.value = "Ошибка загрузки данных"
      console.error("Error loading restaurant", err)
    } finally {
      isLoading.value = false
    }
  }

  const loadRestaurantById = async (id: number)=> {
    isLoading.value = true
    error.value = null
    try {
      restaurant.value = await getRestaurantById(id)
    } catch (err) {
      error.value = "Ошибка загрузки данных"
      console.error("Error loading restaurantById", err)
    } finally {
      isLoading.value = false
    }
  }

  const findRestaurantById = (id: number) => {
    return restaurantList.value.find((restaurant) => restaurant.id === id) || null
  }

  const getRestaurant = computed(() => restaurant.value)
  const getRestaurantList = computed(() => restaurantList.value)
  const getIsLoading = computed(() => isLoading.value)
  const getError = computed(() => error.value)

  return { getRestaurant, loadRestaurantById, findRestaurantById, getRestaurantList, getIsLoading, getError, loadRestaurantList }

})
