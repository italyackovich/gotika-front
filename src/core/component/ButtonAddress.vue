<script setup lang="ts">

import { type Ref, ref } from 'vue'

const isOpened: Ref<boolean> = ref(false)

</script>

<template>
  <div class="flex relative items-center bg-black border-white border-2 rounded-md">
    <button @click="isOpened = !isOpened" class="flex pr-8 bg-black text-white tracking-widest text-sm p-2 rounded-md text-nowrap">
      <img class="bg-black w-6 h-6 mr-2" src="@/assets/icons/marker.svg" alt="marker">
      Куда доставить?
    </button>
    <div class="absolute px-0 top-20 bg-white p-4 rounded-md shadow-subtle w-64" v-show="isOpened">
      <div class="flex p-2 group hover:bg-lightGray transition duration-200">
        <button class="flex w-full text-black text-nowrap">
          Добавить адрес
        </button>
        <img class="transition duration-200" src="@/assets/icons/angle-right.svg" alt="angle">
      </div>
      <button v-for="n in 3" :key="n" class="w-full p-2 hover:bg-lightGray transition duration-200 flex text-black text-nowrap">
        Адрес {{ n }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
