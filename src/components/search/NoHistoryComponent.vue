<script setup lang="ts">
import {
  ArchiveBoxXMarkIcon,
} from '@heroicons/vue/24/outline'
</script>

<template>
  <div
    class="px-6 py-14 text-center text-sm sm:px-14 dark:bg-slate-900"
  >
    <ArchiveBoxXMarkIcon
      class="mx-auto h-6 w-6 text-gray-400"
      aria-hidden="true"
    />
    <p class="mt-4 font-semibold text-gray-900 dark:text-gray-200">
      You don't have a history yet
    </p>
    <p class="mt-2 text-gray-500">Try to search something</p>
  </div>
</template>
