<script setup lang="ts">
import { LifebuoyIcon } from '@heroicons/vue/24/outline'

defineProps<{
  rawQuery: string
}>();
</script>

<template>
  <div
    v-if="rawQuery === '?'"
    class="px-6 py-14 text-center text-sm sm:px-14 dark:bg-slate-900"
  >
    <LifebuoyIcon
      class="mx-auto h-6 w-6 text-gray-400"
      aria-hidden="true"
    />
    <p class="mt-4 font-semibold text-gray-900 dark:text-gray-200">
      Help with searching
    </p>
    <!--                TODO: faire des exemple de commandes custom-->
    <p class="mt-2 text-gray-500">
      Use this tool to quickly search for users and projects across
      our entire platform. You can also use the search modifiers
      found in the footer below to limit the results to just users
      or projects.
    </p>
  </div>
</template>

<style scoped>

</style>
