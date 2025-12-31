<script setup lang="ts">
interface Props {
  for?: string
  required?: boolean
}

defineProps<Props>()
</script>

<template>
  <label
    :for="for"
    class="text-sm font-medium text-gray-700 block mb-1"
  >
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>
