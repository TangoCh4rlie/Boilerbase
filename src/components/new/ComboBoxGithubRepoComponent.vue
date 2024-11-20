<script setup lang="ts">
import type { GitRepos } from '@/models/gitRepos.model'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { computed, onMounted, ref } from 'vue'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'

const queryNameProject = ref('')
const githubRepos = ref<GitRepos[]>([])

const props = defineProps<{
  modelValue: GitRepos
}>()

const emit = defineEmits(['update:modelValue'])

const repo = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

onMounted(async () => {
  githubRepos.value = await fetchWrapper.get(
    'github-api/user-repositories',
    null,
    true,
  )
})

const filtredGithubRepos = computed(() => {
  if (queryNameProject.value === '') {
    return githubRepos.value
  }
  return githubRepos.value.filter(repo => {
    return repo.name
      .toLowerCase()
      .includes(queryNameProject.value.toLowerCase())
  })
})
</script>

<template>
  <Combobox
    class="col-span-full mb-3"
    as="div"
    v-model="repo"
    @update:modelValue="queryNameProject = repo.name"
  >
    <ComboboxLabel class="block text-sm/6 font-medium text-gray-900"
      >Select your github repository</ComboboxLabel
    >
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        @change="queryNameProject = $event.target.value"
        :display-value="item => (item as GitRepos).name"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <!--              FIXME: ishover does not working-->
      <ComboboxOptions
        v-if="filtredGithubRepos.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="repo in filtredGithubRepos"
          :key="repo.id"
          :value="repo"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active
                ? 'bg-indigo-600 text-white outline-none'
                : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ repo.name }}
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

<style scoped></style>
