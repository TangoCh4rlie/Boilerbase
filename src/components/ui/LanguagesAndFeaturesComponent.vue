<script setup lang="ts">
defineProps<{
  languages: string[]
  features: string[]
}>()
</script>

<template>
  <dt class="col-end-1 font-semibold text-gray-900 dark:text-gray-200">
    Languages
  </dt>
  <dd>
                        <span
                          v-for="(language, index) in languages"
                          :key="index"
                          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-700 dark:bg-gray-800 mr-0.5 mb-0.5"
                        >{{ language }}</span
                        >
  </dd>
  <dt class="col-end-1 font-semibold text-gray-900 dark:text-gray-200">
    Features
  </dt>
  <dd>
                        <span
                          v-for="(feature, index) in features"
                          :key="index"
                          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:ring-gray-700 dark:bg-gray-800 mr-0.5 mb-0.5"
                        >{{ feature }}</span
                        >
  </dd>
</template>

<style scoped>

</style>
