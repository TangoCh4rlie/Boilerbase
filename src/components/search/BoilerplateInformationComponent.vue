<script setup lang="ts">
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
    class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex"
  >
    <div class="flex-none p-6 text-center">
      <img
        :src="activeOption.logo"
        alt=""
        class="mx-auto h-16 w-16 rounded-full"
      />
      <h2 class="mt-3 text-lg font-semibold text-gray-900">
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
        <dt class="col-end-1 font-semibold text-gray-900">
          Languages
        </dt>
        <dd>
                        <span
                          v-for="(language, index) in activeOption.languages"
                          :key="index"
                          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-0.5 mb-0.5"
                        >{{ language }}</span
                        >
        </dd>
        <dt class="col-end-1 font-semibold text-gray-900">
          Features
        </dt>
        <dd>
                        <span
                          v-for="(feature, index) in activeOption.features"
                          :key="index"
                          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-0.5 mb-0.5"
                        >{{ feature }}</span
                        >
        </dd>
        <dt class="col-end-1 font-semibold text-gray-900">
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
