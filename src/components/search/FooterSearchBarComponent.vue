<script setup lang="ts">
defineProps<{
  rawQuery: string
}>()
</script>

<template>
  <div
    class="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700 dark:bg-slate-900 dark:text-gray-300"
  >
    Type
    <kbd
      :class="[
        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-800 font-semibold sm:mx-2',
        rawQuery.includes('#')
          ? 'border-indigo-600 text-indigo-600'
          : 'border-gray-400 text-gray-900 dark:text-gray-200',
      ]"
      >#</kbd
    >
    <span class="hidden sm:inline">to filter languages,</span>
    <kbd
      :class="[
        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-800 font-semibold sm:mx-2',
        rawQuery.includes('>')
          ? 'border-indigo-600 text-indigo-600'
          : 'border-gray-400 text-gray-900 dark:text-gray-200',
      ]"
      >&gt;</kbd
    >
    for features, and
    <kbd
      :class="[
        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-800 font-semibold sm:mx-2',
        rawQuery === '?'
          ? 'border-indigo-600 text-indigo-600'
          : 'border-gray-400 text-gray-900 dark:text-gray-200',
      ]"
      >?</kbd
    >
    for query examples.
  </div>
</template>
