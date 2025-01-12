<script setup lang="ts">

const { text } = defineProps<{
  text: string
}>()

const emit = defineEmits(['click'])

</script>

<template>
  <div class="flex p-2 group hover:bg-lightGray transition duration-200">
    <button @click="emit('click')">
      {{ text }}
    </button>
  </div>
</template>

<style scoped>

</style>
