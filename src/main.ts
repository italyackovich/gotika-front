import '@/core/styles/main.css'
import '@/core/styles/tailwind.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import { router } from '@/route'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const pinia = createPinia()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false
    }
  }
})

createApp(App)
  .use(VueQueryPlugin, { queryClient })
  .use(createVfm)
  .use(pinia)
  .use(router)
  .mount('#app')
