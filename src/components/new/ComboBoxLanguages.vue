<script setup lang="ts">

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/vue'
import { computed, ref, watch } from 'vue'
import { availableLanguages } from '@/_helpers/languages'


const props = defineProps<{
  modelValue: string[]
}>();

const emit = defineEmits(['update:modelValue']);

const distinctLanguages = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const allAvailableLanguages = availableLanguages;
const selectedLanguage = ref<string>()
const queryLanguage = ref('')

watch(() => selectedLanguage.value, (newValue) => {
  if (newValue) {
    if (!distinctLanguages.value.includes(newValue.toLowerCase())) {
      distinctLanguages.value.push(newValue.toLowerCase())
    }
  }
  selectedLanguage.value = ''
  queryLanguage.value = ''
})

const filtredLanguages = computed(() => {
  if (queryLanguage.value === '') {
    return allAvailableLanguages
  }
  return allAvailableLanguages.filter((lang) => {
    return lang.toLowerCase().includes(queryLanguage.value.toLowerCase())
  })
})
</script>

<template>
  <Combobox class="col-span-full mb-3"  as="div" v-model="selectedLanguage" @update:modelValue="queryLanguage = ''">
    <ComboboxLabel class="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">Languages of the boilerplate</ComboboxLabel>
    <div class="relative mt-2 mb-1">
      <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @change="queryLanguage = $event.target.value" @blur="queryLanguage = ''"/>
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filtredLanguages.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200">
        <ComboboxOption v-for="(language, index) in filtredLanguages" :key="index" :value="language" as="template" v-slot="{ active, selected }">
          <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600  text-white outline-none' : 'text-gray-900 dark:text-gray-200']">
                    <span :class="['block truncate', selected && 'font-semibold']">
                      {{ language }}
                    </span>
            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
    <ul class="flex gap-1">
      <li v-for="lang in distinctLanguages" :key="lang" class="text-sm/6 text-gray-600 dark:text-gray-400 cursor-pointer">
        <span @click="distinctLanguages = distinctLanguages.filter(l => l !== lang)" class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">{{ lang }}</span>
      </li>
    </ul>
  </Combobox>
</template>

<style scoped>

</style>
