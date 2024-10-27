<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import LanguageFilterComponent from '@/components/search/LanguageFilterComponent.vue'
import { ref } from 'vue'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { storeToRefs } from 'pinia'
import BoilerPreviewComponent from '@/components/BoilerPreviewComponent.vue'
import { useSearchStore } from '@/stores/search.store'

const boilerplateStore = useBoilerplateStore()
const { searchedBoilerplates } = storeToRefs(boilerplateStore)

const searchStore = useSearchStore()
const { name, languages, features } = storeToRefs(searchStore)

const inputSearch = ref('')

const searchBoilerplates = async () => {
  console.log(name.value, languages.value, features.value)
  await boilerplateStore.searchBoilerplates(
    name.value,
    languages.value,
    features.value,
  )
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
          v-model="name"
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
      <div class="mt-4 items-start">
        <span
          v-for="(language, index) in languages"
          :key="index"
          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          >{{ language }}</span
        >
        <span
          v-for="(feat, index) in features"
          :key="index"
          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
          >{{ feat }}</span
        >
        <LanguageFilterComponent />
      </div>
    </div>
  </div>
  <ul
    role="list"
    class="mx-5 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
  >
    <li
      v-for="boilerplate in searchedBoilerplates"
      :key="boilerplate.id"
      class="overflow-hidden rounded-xl border border-gray-200"
    >
      <BoilerPreviewComponent :boilerplate="boilerplate" />
    </li>
  </ul>
</template>

<style scoped></style>
