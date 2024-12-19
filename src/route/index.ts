import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RestaurantPage from '@/pages/RestaurantPage.vue'
import SignInPage from '@/pages/SignInPage.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/restaurant', component: RestaurantPage },
  { path: '/sign-in', component: SignInPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
