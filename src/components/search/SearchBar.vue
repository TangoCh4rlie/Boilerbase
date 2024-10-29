<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ChevronRightIcon, UsersIcon } from '@heroicons/vue/24/outline'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search.store'
import type { Boilerplate } from '@/models/boilerplate.model'

const boilerplateStore = useBoilerplateStore()
const { searchedBoilerplates, boilerplateHistory } = storeToRefs(boilerplateStore)

const searchStore = useSearchStore()
const { name, languages, features, displaySearchBar } = storeToRefs(searchStore)

onMounted(() => {
  searchedBoilerplates.value = []
  boilerplateStore.getBoilerplateHistory()
})
const open = computed(() => displaySearchBar.value)
let nameTimeout: ReturnType<typeof setTimeout> | null = null

const filteredBoilerplates = computed(() =>
  name.value === ''
    ? []
    : searchedBoilerplates.value?.filter((boilerplate) => {
      return boilerplate.name.toLowerCase().includes(name.value.toLowerCase())
    }),
)

function selectBoilerplate(boilerplate: Boilerplate) {
  if (boilerplate) {
    window.location.href = "/boilerplate/" + boilerplate.name
  }
}
watch(name, (newQuery) => {
  if (nameTimeout) {
    clearTimeout(nameTimeout)
  }
  if (newQuery) {
    nameTimeout = setTimeout(() => {
      search()
    }, 200)
  }
})

async function search() {
  await boilerplateStore.searchBoilerplates(
    name.value,
    languages.value,
    features.value,
  )
}
</script>

<template>
  <TransitionRoot :show="open" as="template" @after-leave="name = ''" appear>
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <DialogPanel class="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <Combobox v-slot="{ activeOption }">
              <div class="relative">
                <MagnifyingGlassIcon class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." @change="name = $event.target.value" @blur="name = ''" />
              </div>

              <ComboboxOptions v-if="name === '' || (filteredBoilerplates && filteredBoilerplates.length > 0)" class="flex transform-gpu divide-x divide-gray-100" as="div" static hold>
                <div :class="['max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4', activeOption && 'sm:h-96']">
                  <h2 v-if="name === ''" class="mb-4 mt-2 text-xs font-semibold text-gray-500">Recent searches</h2>
                  <div hold class="-mx-2 text-sm text-gray-700">
                    <ComboboxOption
                      v-for="boilerplate in name === '' ? boilerplateHistory : filteredBoilerplates"
                      :key="boilerplate.id"
                      :value="boilerplate"
                      as="template"
                      v-slot="{ active }"
                      @click="selectBoilerplate(boilerplate)"
                    >
                      <div :class="['group flex cursor-default select-none items-center rounded-md p-2', active && 'bg-gray-100 text-gray-900']">
                        <img :src="boilerplate.logo" alt="" class="h-6 w-6 flex-none rounded-full" />
                        <span class="ml-3 flex-auto truncate">{{ boilerplate.name }}</span>
                        <ChevronRightIcon v-if="active" class="ml-3 h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      </div>
                    </ComboboxOption>
                  </div>
                </div>

                <div v-if="activeOption" class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                  <div class="flex-none p-6 text-center">
                    <img :src="activeOption.logo" alt="" class="mx-auto h-16 w-16 rounded-full" />
                    <h2 class="mt-3 text-lg font-semibold text-gray-900">
                      {{ activeOption.name }}
                    </h2>
                    <p class="text-sm/6 text-gray-500">By {{ activeOption.gitUrl.split('/')[3] }}</p>
                  </div>
                  <div class="flex flex-auto flex-col justify-between p-6">
                    <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                      <dt class="col-end-1 font-semibold text-gray-900">Languages</dt>
                      <dd>
                        <span v-for="(language, index) in activeOption.languages" :key="index" class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-0.5 mb-0.5">{{ language }}</span>
                      </dd>
                      <dt class="col-end-1 font-semibold text-gray-900">Features</dt>
                      <dd>
                        <span v-for="(feature, index) in activeOption.features" :key="index" class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-0.5 mb-0.5">{{ feature }}</span>
                      </dd>
                      <dt class="col-end-1 font-semibold text-gray-900">GitHub</dt>
                      <dd class="truncate">
                        <a :href="`${activeOption.gitUrl}`" class="text-indigo-600 cursor-pointer">
                          {{ activeOption.gitUrl }}
                        </a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </ComboboxOptions>

              <div v-if="name !== '' && (filteredBoilerplates && filteredBoilerplates.length === 0)" class="px-6 py-14 text-center text-sm sm:px-14">
                <UsersIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p class="mt-4 font-semibold text-gray-900">No boilerplate found</p>
                <p class="mt-2 text-gray-500">We couldn’t find anything with theses terms. Please try again.</p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
