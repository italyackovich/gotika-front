<script setup lang="ts">

import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
  className?: string
  contentClassName?: string
}>()

const emit = defineEmits<{
  (e: 'update:ModelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()

</script>

<template>
  <VueFinalModal
    :class="className"
    :content-class="contentClassName"
    @update:model-value="val => emit('update:ModelValue', val)"
  >
    <div class="font-bold text-2xl">
      {{ title }}
    </div>

    <slot/>

  </VueFinalModal>
</template>

<style scoped>

</style>
