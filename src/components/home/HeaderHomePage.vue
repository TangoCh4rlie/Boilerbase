<script setup lang="ts">
import { useSearchStore } from '@/stores/search.store'
const searchStore = useSearchStore()
</script>

<template>
  <div class="dark:bg-[#141723]">
    <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="text-balance text-6xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl"
        >
          Welcome to <span class="text-indigo-600">Boilerbase</span>.<br />Start
          using boilerplates today.
        </h1>
        <p class="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600 dark:text-gray-400">
          Discover, share and use the best boilerplates for your projects. Save
          time and start <span class="text-indigo-600">coding faster!</span>
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            @click="searchStore.displaySearchBar = true"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Explore</button
          >
          <a href="#trending" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
          >View trending <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>
