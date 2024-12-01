<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {
  ChevronRightIcon,
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
import NoHistoryComponent from '@/components/search/NoHistoryComponent.vue'
import FooterSearchBarComponent from '@/components/search/FooterSearchBarComponent.vue'
import NotFoundComponent from '@/components/search/NotFoundComponent.vue'
import LoadingSearchComponent from '@/components/search/LoadingSearchComponent.vue'
import HelpComponent from '@/components/search/HelpComponent.vue'
import BoilerplateInformationComponent from '@/components/search/BoilerplateInformationComponent.vue'

const boilerplateStore = useBoilerplateStore()
const { searchedBoilerplates, boilerplateHistory } = storeToRefs(boilerplateStore)

const searchStore = useSearchStore()
const { name, languages, features, displaySearchBar } = storeToRefs(searchStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

onMounted(() => {
  window.addEventListener('keydown', handleKeydownSpace)
  window.addEventListener('keydown', handleKeydownK)
  searchedBoilerplates.value = []
  if (user.value !== null) {
    boilerplateStore.getBoilerplateHistory()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydownSpace)
  window.removeEventListener('keydown', handleKeydownK)
})

const handleKeydownK = (event: KeyboardEvent) => {
  if (event.metaKey && event.key === 'k') {
    event.preventDefault()
    displaySearchBar.value = true
  }
}

const handleKeydownSpace = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    displaySearchBar.value = false
  }
}

const rawQuery = ref('')
const isSearching = ref(false)

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

// const pressEnterKey = (boilerplate: Boilerplate) => {
//   if (rawQuery.value === '' && boilerplateHistory.value.length > 0) {
//     selectBoilerplate(boilerplateHistory.value[boilerplate.id])
//   } else if (filteredBoilerplates.value.length > 0) {
//     selectBoilerplate(filteredBoilerplates.value[boilerplate.id])
//   }
// }

let nameTimeout: ReturnType<typeof setTimeout> | null = null

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
            class="mx-auto max-w-3xl transform divide-y divide-gray-100 dark:divide-slate-700 dark:ring-gray-500 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <Combobox v-slot="{ activeOption }">
              <div class="relative">
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-200 dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder-gray-300 focus:ring-0 sm:text-sm outline-none"
                  placeholder="Search..."
                  @change="rawQuery = $event.target.value"
                />
              </div>

              <ComboboxOptions
                v-if="
                  rawQuery === '' ||
                  (filteredBoilerplates && filteredBoilerplates.length > 0)
                "
                class="flex transform-gpu divide-x divide-gray-100 dark:divide-slate-800 dark:text-gray-200 dark:bg-gray-900"
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
                  <div class="-mx-2 text-sm text-gray-700 dark:text-gray-500">
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
                          active && 'bg-gray-100 text-gray-900 dark:text-gray-200 dark:bg-gray-800',
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

                <BoilerplateInformationComponent
                  :activeOption="activeOption"
                  v-if="activeOption"
                />
              </ComboboxOptions>

              <HelpComponent :raw-query="rawQuery" />
              <LoadingSearchComponent
                v-if="rawQuery !== '' && isSearching"
                :isSearching
              />
              <NoHistoryComponent
                v-if="
                  boilerplateStore.boilerplateHistory?.length === 0 &&
                  rawQuery === ''
                "
              />
              <NotFoundComponent
                v-if="
                  rawQuery !== '' &&
                  rawQuery !== '?' &&
                  !isSearching &&
                  filteredBoilerplates &&
                  filteredBoilerplates.length === 0
                "
              />
              <FooterSearchBarComponent
                :rawQuery="rawQuery"
              />
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
