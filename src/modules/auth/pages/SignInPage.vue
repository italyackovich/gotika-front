<script setup lang="ts">

import { ref } from 'vue'
import type { LoginRequest } from '@/modules/auth/types/LoginRequest.ts'
import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import { useRouter } from 'vue-router'
import { loginSchema } from '@/modules/auth/validation/loginSchema.ts'
import { z } from 'zod'

const authStore = useAuthStore()
const router = useRouter()

// Данные формы
const loginAttrs = ref<LoginRequest>(
  {
    email: "",
    password: ""
  }
)

// Ошибки валидации
const validationErrors = ref<{
  email?: string
  password?: string
}>()

// Сообщение об ошибке сервера
const errorMessage = ref<string>("")

const validateForm = () => {
  try {
    // Проверяем данные на соответствие схеме
    loginSchema.parse(loginAttrs.value)
    validationErrors.value = {}
    return true
  } catch (err) {
    // Если есть ошибки, формируем объект ошибок
    if (err instanceof z.ZodError) {
      const errors = err.flatten().fieldErrors
      validationErrors.value = {
        email: errors.email?.[0],
        password: errors.password?.[0]
      }
    }
    return false
  }
}

// Обработчик логина
const handleLogin = async () => {
  errorMessage.value = ""

  // Проверяем валидность формы
  if(!validateForm()) return

  try {
    // Логиним пользователя
    await authStore.loginUser(loginAttrs.value.email, loginAttrs.value.password)

    // Перенаправляем в зависимости от роли
    if (authStore.role == "ROLE_EMPLOYEE"){
      await router.push("/employee/dashboard")
    } else if (authStore.role == "ROLE_ADMIN"){
      await router.push("/admin/dashboard")
    } else {
      await router.push("/")
    }
  } catch (error) {
    // Обработка ошибок от сервера
    if (error.response && error.response.status === 401) {
      errorMessage.value = "Неверный email или пароль"
    } else {
      errorMessage.value = "Произошла ошибка: " + error.message
    }
  }
}

</script>

<template>
  <div class="relative w-full flex tracking-widest text-black items-center justify-center h-screen">
    <router-link to="/">
      <button class="absolute top-4 left-4 flex items-center px-4 py-2 text-black">
        <img class="w-6 h-6" src="../../../assets/icons/angle-left.svg" alt="arrow" />
        На главную
      </button>
    </router-link>

    <div class="w-96 p-6 bg-white rounded-md shadow-subtle">
      <p class="font-inter text-center font-bold text-2xl mb-6">
        GOTIKA
      </p>

      <p v-if="errorMessage" class="text-red font-inter text-center text-sm">
        {{ errorMessage }}
      </p>

      <!-- Форма -->
      <form @submit.prevent="handleLogin" class="flex flex-col space-y-4" novalidate>
        <!-- Поле для почты -->
        <div>
          <label for="email" class="block font-medium mb-1">Введите почту</label>
          <input
            v-model="loginAttrs.email"
            type="email"
            id="email"
            placeholder="example@mail.com"
            :class="validationErrors?.email ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
          />
          <p v-if="validationErrors?.email" class="text-red text-sm"> {{ validationErrors?.email }} </p>
        </div>

        <!-- Поле для пароля -->
        <div>
          <label for="password" class="block font-medium mb-1">Введите пароль</label>
          <input
            v-model="loginAttrs.password"
            type="password"
            id="password"
            placeholder="Ваш пароль"
            :class="validationErrors?.password ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
          />
          <p v-if="validationErrors?.password" class="text-red text-sm" > {{ validationErrors?.password }} </p>
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray transition duration-200"
        >
          Войти
        </button>

        <router-link to="/sign-up">
          <button class="w-full ">
            Зарегистрироваться
          </button>
        </router-link>

      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
