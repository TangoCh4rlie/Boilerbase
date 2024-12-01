<script setup lang="ts">
import { CpuChipIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="px-6 py-14 text-center text-sm sm:px-14 dark:bg-slate-900">
    <CpuChipIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
    <p class="mt-4 font-semibold text-gray-900 dark:text-gray-200">No boilerplate found</p>
    <p class="mt-2 text-gray-500">
      We couldn’t find anything with theses terms. Please try again.
    </p>
  </div>
</template>
