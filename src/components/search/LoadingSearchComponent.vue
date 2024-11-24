<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

defineProps<{
  isSearching: boolean
}>()
</script>

<template>
  <div
    v-if="isSearching"
    class="px-6 py-14 text-center text-sm sm:px-14 dark:bg-slate-900"
  >
    <ArrowPathIcon
      class="mx-auto animate-spin h-6 w-6 text-gray-400"
      aria-hidden="true"
    />
    <p class="mt-4 font-semibold text-gray-900 dark:text-gray-200">
      Searching boilerplates for you...
    </p>
  </div>
</template>

<style scoped>

</style>
