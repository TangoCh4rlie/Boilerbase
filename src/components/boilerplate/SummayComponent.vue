<script setup lang="ts">

import LikeComponent from '@/components/ui/LikeComponent.vue'
import { ArrowDownOnSquareIcon, BeakerIcon } from '@heroicons/vue/24/outline'
import { ArrowTrendingUpIcon } from '@heroicons/vue/20/solid'
import type { Boilerplate } from '@/models/boilerplate.model'

defineProps<{
  boilerplate: Boilerplate
}>()
</script>

<template>
  <div class="lg:col-start-3 lg:row-end-1">
    <h2 class="sr-only">Summary</h2>
    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
      <dl class="flex flex-wrap">
        <div class="flex-auto pl-6 pt-6">
          <dt class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Uses
          </dt>
          <dd
            class="flex items-center gap-1.5 mt-1 text-base font-semibold leading-6 text-gray-900 dark:text-gray-200"
          >
            <p>{{ boilerplate?.usesCounter }}</p>
            <ArrowTrendingUpIcon class="h-4 w-4" aria-hidden="true" />
          </dd>
        </div>
        <div class="flex-auto pl-6 pt-6">
          <dt class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Likes
          </dt>
          <dd
            class="flex gap-1.5 items-center mt-1 text-base font-semibold leading-6 text-gray-900 dark:text-gray-200"
          >
            <p>{{ boilerplate?.likesCounter }}</p>
            <LikeComponent
              v-if="boilerplate"
              :boilerplate="boilerplate"
            />
          </dd>
        </div>
        <div
          class="mt-6 items-center flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6"
        >
          <dt class="text-sm font-medium text-gray-900 dark:text-gray-200">
            <a
              :href="`${boilerplate?.gitUrl}/fork`"
              class="flex gap-1.5 items-center-center rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Fork on GitHub
              <BeakerIcon class="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="text-sm leading-6 text-gray-800">
            <a
              :href="`${boilerplate?.gitUrl}/archive/refs/heads/${boilerplate?.defaultBranch}.zip`"
              class="flex gap-1.5 items-center-center rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Download zip
              <ArrowDownOnSquareIcon class="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
        </div>
      </dl>
      <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
        <a
          :href="boilerplate?.gitUrl"
          target="_blank"
          class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
        >Go on GitHub page <span aria-hidden="true">&rarr;</span></a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
