<script setup lang="ts">

import { ref } from 'vue'
import type { RegisterRequest } from '@/modules/auth/types/RegisterRequest.ts'
import { register } from '@/core/api/authApi.ts'
import { useRouter } from 'vue-router'
import { registerSchema } from '@/modules/auth/validation/registerSchema.ts'
import { z } from 'zod'

const registerAttrs = ref<RegisterRequest>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
})

const validationErrors = ref<{
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string
}>()

const router = useRouter()

const validateForm = () => {
  try {
    registerSchema.parse(registerAttrs.value)
    validationErrors.value = {}
    return true
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = err.flatten().fieldErrors
      validationErrors.value = {
        firstName: errors.firstName?.[0],
        lastName: errors.lastName?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
        confirmPassword: errors.confirmPassword?.[0],
      }
    }
    return false
  }
}

const handleRegister = async () => {
  if(!validateForm()) return

  try{
    await register(
      registerAttrs.value.firstName,
      registerAttrs.value.lastName,
      registerAttrs.value.email,
      registerAttrs.value.password,
    )
    await router.push("/sign-in")
  } catch (err) {
    console.error('Register failed: ', err)
  }
}

</script>

<template>
  <div class="relative w-full flex tracking-widest text-black items-center justify-center h-screen">
    <router-link to="/">
      <button
        class="absolute top-4 left-4 flex items-center px-4 py-2 text-black"
      >
        <img class="w-6 h-6" src="../../../assets/icons/angle-left.svg" alt="arrow" />
        На главную
      </button>
    </router-link>

    <div class="w-96 p-6 bg-white rounded-md shadow-subtle">

      <p class="font-inter text-center font-bold text-2xl mb-6">
        GOTIKA
      </p>

      <form @submit.prevent="handleRegister" class="flex flex-col space-y-4" novalidate>

        <div>
          <label for="firstName" class="block font-medium mb-1">Введите имя</label>
          <input
            v-model="registerAttrs.firstName"
            type="text"
            id="firstName"
            placeholder="Ваше имя"
            :class="validationErrors?.firstName ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
          <p v-if="validationErrors?.firstName" class="text-red text-sm">
            {{ validationErrors.firstName }}
          </p>
        </div>

        <div>
          <label for="lastName" class="block font-medium mb-1">Введите фамилию</label>
          <input
            v-model="registerAttrs.lastName"
            type="text"
            id="lastName"
            placeholder="Ваша фамилия"
            :class="validationErrors?.lastName ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
          />
          <p v-if="validationErrors?.lastName" class="text-red text-sm">
            {{ validationErrors.lastName }}
          </p>
        </div>

        <div>
          <label for="email" class="block font-medium mb-1">Введите почту</label>
          <input
            v-model="registerAttrs.email"
            type="email"
            id="email"
            placeholder="example@mail.com"
            :class="validationErrors?.email ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
          <p v-if="validationErrors?.email" class="text-red text-sm">
            {{ validationErrors.email }}
          </p>
        </div>

        <div>
          <label for="password" class="block font-medium mb-1">Введите пароль</label>
          <input
            v-model="registerAttrs.password"
            type="password"
            id="password"
            placeholder="Ваш пароль"
            :class="validationErrors?.password ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
          <p v-if="validationErrors?.password" class="text-red text-sm">
            {{ validationErrors.password }}
          </p>
        </div>

        <div>
          <label for="confirmPassword" class="block font-medium mb-1"
          >Подтвердите пароль</label
          >
          <input
            v-model="registerAttrs.confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Повторите пароль"
            :class="validationErrors?.confirmPassword ? 'border-red' : ''"
            class="w-full p-3 border-2 rounded-md focus:outline-none"
          />
          <p v-if="validationErrors?.confirmPassword" class="text-red text-sm">
            {{ validationErrors.confirmPassword }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray transition duration-200"
        >
          Зарегистрироваться
        </button>

        <router-link to="/sign-in">
          <button class="w-full ">
            Войти
          </button>
        </router-link>

      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
