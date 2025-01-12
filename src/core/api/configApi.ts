import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
})

apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      try {
        await authStore.refreshTokenIfNeeded()
        error.config.headers.Authorization = `Bearer ${authStore.accessToken}`
        return apiClient.request(error.config)
      } catch {
        authStore.logoutUser()
        window.location.href = '/sign-in'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
