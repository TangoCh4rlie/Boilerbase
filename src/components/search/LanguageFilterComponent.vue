<script setup lang="ts">
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { availableLanguages } from '@/_helpers/languages'
import { computed, ref } from 'vue'
import { useSearchStore } from '@/stores/search.store'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { languages } = storeToRefs(searchStore)

const availableLanguagesString: string[] = availableLanguages

const query = ref('')

const filteredLanguages = computed(() =>
  query.value === ''
    ? availableLanguagesString
    : availableLanguagesString.filter(language => {
        return language.toLowerCase().includes(query.value.toLowerCase())
      }),
)

function addLanguage() {
  if (!languages.value.includes(query.value)) {
    languages.value.push(query.value)
  }
  query.value = ''
}
</script>

<template>
  <Combobox
    as="div"
    v-model="languages"
    @change="query = ''"
    multiple
  >
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900"
      >Languages
    </ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput
        class="w-36 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow   sm:text-sm sm:leading-6"
        @change="query = $event.target.value"
        @blur="query = ''"
        :display-value="() => query"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredLanguages.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="(language, index) in filteredLanguages"
          :key="index"
          :value="language"
          as="template"
          v-slot="{ active, selected }"
          @click="addLanguage(); query = ''"
          @keyup.enter="addLanguage(); query = ''"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ language }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
