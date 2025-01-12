import HomePage from '@/modules/client/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RestaurantPage from '@/modules/client/pages/RestaurantPage.vue'
import SignInPage from '@/modules/auth/pages/SignInPage.vue'
import SignUpPage from '@/modules/auth/pages/SignUpPage.vue'
import OrderListPage from '@/modules/client/pages/OrderListPage.vue'
import EmployeeDashboard from '@/modules/employee/pages/EmployeeDashboard.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/restaurants/:id', component: RestaurantPage },
  { path: '/sign-in', component: SignInPage },
  { path: '/sign-up', component: SignUpPage },
  { path: '/order-list', component: OrderListPage },
  { path: '/employee/dashboard', component: EmployeeDashboard }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
