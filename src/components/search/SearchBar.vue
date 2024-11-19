<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {
  ChevronRightIcon,
  CpuChipIcon,
  LifebuoyIcon,
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/vue/24/outline'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search.store'
import type { Boilerplate } from '@/models/boilerplate.model'
import { useAuthStore } from '@/stores/auth.store'

const boilerplateStore = useBoilerplateStore()
const { searchedBoilerplates, boilerplateHistory } = storeToRefs(boilerplateStore)

const searchStore = useSearchStore()
const { name, languages, features, displaySearchBar } = storeToRefs(searchStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    displaySearchBar.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  searchedBoilerplates.value = []
  if (user.value !== null) {
    boilerplateStore.getBoilerplateHistory()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const rawQuery = ref('')
const isSearching = ref(false)
let nameTimeout: ReturnType<typeof setTimeout> | null = null

const filteredBoilerplates = computed(() =>
  rawQuery.value === '' || rawQuery.value === '?'
    ? []
    : searchedBoilerplates.value?.filter(boilerplate => {
      const tokens = rawQuery.value
        .toLowerCase()
        .split(' ')
        .filter(token => !token.startsWith('#') && !token.startsWith('>'))
      if (tokens.length === 0 && searchedBoilerplates.value) {
        return searchedBoilerplates.value
      }
      return tokens.some(token =>
        boilerplate.name.toLowerCase().includes(token),
      )
    }),
)

const selectBoilerplate = async (boilerplate: Boilerplate) => {
  if (boilerplate) {
    window.location.href = '/boilerplate/' + boilerplate.name
  }
}

const pressEnterKey = () => {
  if (rawQuery.value === '' && boilerplateHistory.value.length > 0) {
    selectBoilerplate(boilerplateHistory.value[0])
  } else if (filteredBoilerplates.value.length > 0) {
    selectBoilerplate(filteredBoilerplates.value[0])
  }
}

watch(rawQuery, newQuery => {
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
  isSearching.value = true
  const tokens = rawQuery.value.split(' ')
  languages.value = tokens
    .filter(token => token.startsWith('#'))
    .map(token => token.slice(1))
  features.value = tokens
    .filter(token => token.startsWith('>'))
    .map(token => token.slice(1))
  name.value = tokens.filter(
    token => !token.startsWith('#') && !token.startsWith('>'),
  )

  await boilerplateStore.searchBoilerplates(
    name.value,
    languages.value,
    features.value,
  )
  isSearching.value = false
}
</script>

<template>
  <TransitionRoot :show="displaySearchBar" as="template" appear>
    <Dialog class="relative z-10" @close="displaySearchBar = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
        />
      </TransitionChild>

      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <Combobox v-slot="{ activeOption }">
              <div class="relative">
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  @change="rawQuery = $event.target.value"
                  @keyup.enter="pressEnterKey()"
                />
              </div>

              <ComboboxOptions
                v-if="
                  rawQuery === '' ||
                  (filteredBoilerplates && filteredBoilerplates.length > 0)
                "
                class="flex transform-gpu divide-x divide-gray-100"
                as="div"
                static
                hold
              >
                <div
                  v-if="rawQuery !== '' || boilerplateHistory?.length > 0"
                  :class="[
                    'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                    activeOption && 'sm:h-96',
                  ]"
                >
                  <div class="-mx-2 text-sm text-gray-700">
                    <ComboboxOption
                      v-for="boilerplate in rawQuery === ''
                        ? boilerplateHistory
                        : filteredBoilerplates"
                      :key="boilerplate.id"
                      :value="boilerplate"
                      as="template"
                      v-slot="{ active }"
                      @click="selectBoilerplate(boilerplate)"
                    >
                      <div
                        :class="[
                          'group flex cursor-default select-none items-center rounded-md p-2',
                          active && 'bg-gray-100 text-gray-900',
                        ]"
                      >
                        <img
                          :src="boilerplate.logo"
                          alt=""
                          class="h-6 w-6 flex-none rounded-full"
                        />
                        <span class="ml-3 flex-auto truncate">{{
                          boilerplate.name
                        }}</span>
                        <ChevronRightIcon
                          v-if="active"
                          class="ml-3 h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </ComboboxOption>
                  </div>
                </div>

                <div
                  v-if="activeOption"
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
              </ComboboxOptions>

              <div
                v-if="rawQuery === '?'"
                class="px-6 py-14 text-center text-sm sm:px-14"
              >
                <LifebuoyIcon
                  class="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p class="mt-4 font-semibold text-gray-900">
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

              <div
                v-if="isSearching === true"
                class="px-6 py-14 text-center text-sm sm:px-14"
              >
                <ArrowPathIcon
                  class="mx-auto animate-spin h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p class="mt-4 font-semibold text-gray-900">
                  Searching boilerplates for you...
                </p>
              </div>

              <div
                v-if="
                  boilerplateStore.boilerplateHistory?.length === 0
                "
                class="px-6 py-14 text-center text-sm sm:px-14"
              >
                <ArchiveBoxXMarkIcon
                  class="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p class="mt-4 font-semibold text-gray-900">
                  You don't have a history yet
                </p>
                <p class="mt-2 text-gray-500">Try to search something</p>
              </div>

              <div
                v-if="
                  rawQuery !== '' &&
                  rawQuery !== '?' &&
                  isSearching === false &&
                  filteredBoilerplates &&
                  filteredBoilerplates.length === 0
                "
                class="px-6 py-14 text-center text-sm sm:px-14"
              >
                <CpuChipIcon
                  class="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p class="mt-4 font-semibold text-gray-900">
                  No boilerplate found
                </p>
                <p class="mt-2 text-gray-500">
                  We couldn’t find anything with theses terms. Please try again.
                </p>
              </div>

              <div
                class="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700"
              >
                Type
                <kbd
                  :class="[
                    'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                    rawQuery.includes('#')
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-gray-400 text-gray-900',
                  ]"
                  >#</kbd
                >
                <span class="hidden sm:inline">to filter languages,</span>
                <kbd
                  :class="[
                    'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                    rawQuery.includes('>')
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-gray-400 text-gray-900',
                  ]"
                  >&gt;</kbd
                >
                for features, and
                <kbd
                  :class="[
                    'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                    rawQuery === '?'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-gray-400 text-gray-900',
                  ]"
                  >?</kbd
                >
                for query examples.
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
