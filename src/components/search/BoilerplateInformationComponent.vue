<script setup lang="ts">
import LanguagesAndFeaturesComponent from '@/components/ui/LanguagesAndFeaturesComponent.vue'

defineProps<{
  activeOption: {
    name: string
    logo: string
    gitUrl: string
    languages: string[]
    features: string[]
  }
}>()
</script>

<template>
  <div
    class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 dark:divide-slate-800 overflow-y-auto sm:flex"
  >
    <div class="flex-none p-6 text-center">
      <img
        :src="activeOption.logo"
        alt=""
        class="mx-auto h-16 w-16 rounded-full"
      />
      <h2 class="mt-3 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {{ activeOption.name }}
      </h2>
      <p class="text-sm/6 text-gray-500">
        By {{ activeOption.gitUrl.split('/')[3] }}
      </p>
    </div>
    <div class="flex flex-auto flex-col justify-between p-6">
      <dl
        class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700"
      >
        <LanguagesAndFeaturesComponent :languages="activeOption.languages" :features="activeOption.features" />
        <dt class="col-end-1 font-semibold text-gray-900 dark:text-gray-200">
          GitHub
        </dt>
        <dd class="truncate">
          <a
            :href="`${activeOption.gitUrl}`"
            class="text-indigo-600 cursor-pointer"
          >
            {{ activeOption.gitUrl }}
          </a>
        </dd>
      </dl>
    </div>
  </div>
</template>

<style scoped>

</style>
