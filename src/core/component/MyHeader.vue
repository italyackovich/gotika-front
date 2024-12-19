<script setup lang="ts">

import '../styles/header.css'
import InputSearch from '@/core/component/InputSearch.vue'

</script>

<template>
  <header class="flex font-inter space-x-96 bg-black text-white h-90 items-center justify-center">
    <span class="bg-black text-4xl font-bold tracking-headline">
      GOTIKA
    </span>
    <div class="flex space-x-4 bg-black">
      <InputSearch/>
      <div class="flex items-center bg-black border-white border-2 rounded-md">
        <input
          class="input-header"
          placeholder="Куда доставить?"
        />
        <div class="bg-black w-6 h-6">
          <img class="bg-black" src="@/assets/icons/marker.svg" alt="marker">
        </div>
      </div>
      <div class="flex items-center bg-black">
        <div class="bg-black">
          <img class="bg-black" src="@/assets/icons/bell.svg" alt="bell"/>
        </div>
        <div class="flex border rounded-full">
          <img class="w-20 h-full rounded-full" src="@/assets/image/test_ava.jpg" alt="ava"/>
        </div>
      </div>
    </div>
  </header>
</template>
