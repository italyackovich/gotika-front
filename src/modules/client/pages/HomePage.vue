<script setup lang="ts">

import RestaurantCardList from '@/modules/client/restaurant/component/RestaurantCardList.vue'

</script>

<template>
  <div class="w-full h-full py-20 px-158">
    <div>
      <p class="font-inter font-bold text-3xl tracking-widest">Вы заказывали</p>
      <div class="font-inter tracking-widest text-center m-10">
        Вы пока еще ничего не заказывали...
      </div>
    </div>
    <RestaurantCardList/>
  </div>
</template>
