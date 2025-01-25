import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {

      const authStore = useAuthStore()

      if (authStore.isRefreshing) {
        return Promise.reject(error)
      }

      try {
        await authStore.refreshTokenIfNeeded()
        return apiClient.request(error.config)
      } catch (err) {
        authStore.logoutUser()
        window.location.href = '/sign-in'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
