<script setup lang="ts">

import { ref } from 'vue'
import ModalConfirm from '@/core/component/ui/ModalConfirm.vue'
import MapAddress from '@/core/component/ui/MapAddress.vue'

// const isOpened = ref<boolean>(false)

const isModalOpened = ref<boolean>(false)

const confirm = () => {
  isModalOpened.value = false
}

</script>

<template>
  <div class="flex relative items-center bg-black border-white border-2 rounded-md">
    <button @click="isModalOpened = true" class="flex pr-8 bg-black text-white tracking-widest text-sm p-2 rounded-md text-nowrap">
      <img class="bg-black w-6 h-6 mr-2" src="../../../assets/icons/marker.svg" alt="marker">
      Куда доставить?
    </button>

    <ModalConfirm
      v-model="isModalOpened"
      title="Укажите адрес"
      @confirm="() => confirm"
      class-name="flex z-50 justify-center items-start bg-white pt-20 pr-20 bg-opacity-0 font-inter text-black"
      content-class-name="flex flex-col w-[1000px] h-[700px] overflow-y-auto h-96 mx-4 p-4 bg-white rounded-lg space-y-2"
    >
      <MapAddress/>
    </ModalConfirm>

  </div>
</template>
