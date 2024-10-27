<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import LanguageFilterComponent from '@/components/search/LanguageFilterComponent.vue'
import { ref } from 'vue'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { storeToRefs } from 'pinia'
import BoilerPreviewComponent from '@/components/BoilerPreviewComponent.vue'

const boilerplateStore = useBoilerplateStore()
const { searchedBoilerplates } = storeToRefs(boilerplateStore)

const inputSearch = ref('')

const searchBoilerplates = async () => {
  const result = await boilerplateStore.searchBoilerplates(inputSearch.value)
  console.log(result)
}
</script>

<template>
  <div class="bg-background flex flex-col items-center justify-center p-4">
    <h2
      class="mb-2 text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
    >
      Find your <span class="text-indigo-600">ideal</span> Boilerplate
    </h2>
    <p class="mx-auto mb-5 max-w-xl text-pretty text-lg/8 text-gray-600">
      Discover all the boilerplates created by the community!
    </p>
    <div class="w-full max-w-2xl min-w-[200px]">
      <div class="relative flex items-center">
        <MagnifyingGlassIcon
          class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
        />

        <input
          v-model="inputSearch"
          class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="UI Kits, Dashboards..."
        />

        <button
          @click="searchBoilerplates()"
          class="rounded-md bg-indigo-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-500 focus:shadow-none active:bg-indigo-500 hover:bg-indigo-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
    <div class="flex justify-start mt-4">
      <LanguageFilterComponent />
    </div>
  </div>
  <ul
    role="list"
    class="mx-5 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
  >
    <li v-for="boilerplate in searchedBoilerplates" :key="boilerplate.id" class="overflow-hidden rounded-xl border border-gray-200">
      <BoilerPreviewComponent :boilerplate="boilerplate" />
    </li>
  </ul>
</template>

<style scoped></style>
