import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, refreshAccessToken } from '@/core/api/authApi.ts'
import { clearUser, getIsAuth, getRole, getUserId, saveUser } from '@/core/utils/userUtil.ts'
import type { User } from '@/types/User.ts'

export const useAuthStore = defineStore("auth", () => {
  const userId = ref<string | null>(getUserId())
  const role = ref<string | null>(getRole())
  const user = ref<User | null>()
  const isRefreshing = ref<boolean>()

  const isAuthenticated = ref<boolean>(Boolean(getIsAuth()))

  const setRole = (userRole: string) => {
    role.value = userRole
  }

  const loginUser = async (email: string, password: string) => {
    const response = await login(email, password)
    console.log(response)
    saveUser(response)
    user.value = response
    isAuthenticated.value = true
    localStorage.setItem("isAuth", String(isAuthenticated.value))
  }

  const refreshTokenIfNeeded = async () => {

    isRefreshing.value = true
    try {
      const response = await refreshAccessToken()
      saveUser(response)
      isRefreshing.value = false
    } catch (err) {
      console.log('Token refresh failed', err)
    }
  }

  const logoutUser = () => {
    clearUser()
    user.value = null
    isAuthenticated.value = false
    localStorage.setItem("isAuth", String(isAuthenticated.value))
    window.location.href = '/'
  }


  return { isRefreshing, user, userId, role, setRole, isAuthenticated, loginUser, refreshTokenIfNeeded, logoutUser }
})

