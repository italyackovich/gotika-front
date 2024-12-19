<script setup lang="ts">

import '../styles/header.css'
import InputSearch from '@/core/component/InputSearch.vue'
import ButtonAddress from '@/core/component/ButtonAddress.vue'

</script>

<template>
  <header class="flex font-inter space-x-96 bg-black text-white h-90 items-center justify-around">
    <span class="bg-black text-4xl font-bold tracking-headline">
      GOTIKA
    </span>
    <div class="flex space-x-4 bg-black">
      <InputSearch/>
      <ButtonAddress/>
    </div>
    <div class="flex bg-black space-x-6 items-center">
      <img class="w-7 h-full bg-black" src="@/assets/icons/bell.svg" alt="bell"/>
      <img class="w-14 h-full rounded-full" src="@/assets/image/test_ava.jpg" alt="ava"/>
    </div>
  </header>
</template>
