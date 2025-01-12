import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, refreshAccessToken } from '@/core/api/authApi.ts'
import { clearTokens, getAccessToken, getRefreshToken, getRole, getUserId, saveTokens } from '@/core/utils/tokenUtil.ts'
import type { User } from '@/types/User.ts'


export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(getAccessToken())
  const refreshToken = ref<string | null>(getRefreshToken())
  const userId = ref<string | null>(getUserId())
  const role = ref<string | null>(getRole())
  const user = ref<User | null>()

  const isAuthenticated = ref(!!accessToken.value)

  const setRole = (userRole: string) => {
    role.value = userRole
  }

  const loginUser = async (email: string, password: string) => {
    console.log(1)
    const tokens = await login(email, password)
    saveTokens(tokens.accessToken, tokens.refreshToken, tokens.user)
    accessToken.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken
    user.value = tokens.user
    isAuthenticated.value = true
  }

  const refreshTokenIfNeeded = async () => {
    if (!refreshToken.value) return
    const tokens = await refreshAccessToken(refreshToken.value)
    saveTokens(tokens.accessToken, refreshToken.value, tokens.user)
    accessToken.value = tokens.accessToken
  }

  const logoutUser = () => {
    clearTokens()
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    isAuthenticated.value = false
  }

  return { userId, role, setRole, accessToken, isAuthenticated, loginUser, refreshTokenIfNeeded, logoutUser }
})

