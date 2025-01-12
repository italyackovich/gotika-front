<script setup lang="ts">

import InputSearch from '@/core/component/ui/InputSearch.vue'
import ButtonAddress from '@/core/component/base/ButtonAddress.vue'
import { type Ref, ref } from 'vue'
import ModalConfirm from '@/core/component/ui/ModalConfirm.vue'
import ProfileDropdown from '@/core/component/ui/ProfileDropdown.vue'
import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import { useRouter } from 'vue-router'

const isMenuProfileOpened: Ref<boolean> = ref(false)

const isModalOpen: Ref<boolean> = ref(false)

const confirm = () => {
  isModalOpen.value = false
}

const router = useRouter()


const authStore = useAuthStore()

const isAuth = authStore.isAuthenticated

</script>

<template>
  <header class="flex z-50 fixed w-full font-inter shadow-extra-strong space-x-96 bg-black text-white h-90 items-center justify-around">
    <button @click="router.push('/')">
      <span class="bg-black text-4xl font-bold tracking-headline">
        GOTIKA
      </span>
    </button>
    <div class="flex space-x-4 bg-black">
      <InputSearch/>
      <ButtonAddress/>
    </div>
    <div class="flex relative bg-black gap-x-6 items-center">

      <button @click="isModalOpen = true">
        <img class="w-7 h-full bg-black" src="../../../assets/icons/bell.svg" alt="bell"/>
      </button>

      <ModalConfirm
        v-model="isModalOpen"
        title="Уведомления"
        @confirm="() => confirm"
        class-name="flex z-50 justify-end items-start bg-white pt-20 pr-20 bg-opacity-0 font-inter text-black"
        content-class-name="flex flex-col w-[600px] overflow-y-auto h-96 mx-4 p-4 bg-white rounded-lg space-y-2"
      >
        <div class="space-y-4">
          <div
            v-for="n in 10"
            :key="n"
            class="p-4 rounded-md shadow-subtle hover:shadow-strong"
          >
            <p class="font-medium"> Уведомление {{ n }}</p>
            <p class="text-sm"> Уведомление {{ n }}</p>
            <button
              class="text-sm text-red-500 hover:underline mt-2"
            >
              Удалить
            </button>
          </div>
        </div>
      </ModalConfirm>

      <div class="bg-black" v-if="isAuth">
        <button @click="isMenuProfileOpened = !isMenuProfileOpened">
          <img class="w-14 h-full rounded-full" src="../../../assets/image/default_ava.jpg" alt="ava"/>
        </button>
      </div>
      <router-link v-else to="/sign-in">
        <div class="bg-black">
          Войти
        </div>
      </router-link>

      <ProfileDropdown v-show="isMenuProfileOpened" />

    </div>
  </header>
  <div class="pt-90"></div>
</template>
