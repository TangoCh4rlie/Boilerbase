<script setup lang="ts">
import { ClockIcon, UsersIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'

const primaryFeatures = [
  {
    name: 'Community',
    description:
      'Quickly find boilerplates published by the community with the search bar by pressing ctrl + k. Don\'t hesitate to share your best boilerplates with the community.',
    icon: UsersIcon,
  },
  {
    name: 'Customize',
    description:
      'Start your project with the best practices of the language you chose. Use the standard configuration or customize it to your liking.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Save time',
    description:
      'Get started on your projects faster and more efficiently with Boilerbase. No need to waste time setting up your project.',
    icon: ClockIcon,
  },
]
</script>

<template>
  <div class="mx-auto bg-transparent max-w-7xl px-6 mt-20 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <p class="mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl lg:text-balance">Everything you need to start a project</p>
      <p class="mt-8 text-lg/8 text-gray-600 dark:text-gray-400">Don't waste any more time and find the boilerplate that suits you best !</p>
    </div>
    <div class="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <div v-for="feature in primaryFeatures" :key="feature.name" class="flex flex-col">
          <dt class="text-base/7 font-semibold text-gray-600 dark:text-gray-400">
            <div class="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
              <component :is="feature.icon" class="size-6 text-white" aria-hidden="true" />
            </div>
            {{ feature.name }}
          </dt>
          <dd class="mt-1 flex flex-auto flex-col text-base/7 text-gray-500 dark:text-gray-500">
            <p class="flex-auto">{{ feature.description }}</p>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>

</style>
