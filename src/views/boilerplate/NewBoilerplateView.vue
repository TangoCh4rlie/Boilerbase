<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import router from '@/router'
import { computed, onMounted, ref, watch } from 'vue'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'
import type { GitRepos } from '@/models/gitRepos.model'
import { availableLanguages } from '@/_helpers/languages'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import type { CreateBoilerplate } from '@/models/boilerplate.model'
import { useAuthStore } from '@/stores/auth.store'
import { useBoilerplateStore } from '@/stores/boilerplate.store'

const authStore = useAuthStore()
const boilerplateStore = useBoilerplateStore()

const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    }
    return ''
  },
  html: true,
  linkify: true,
  typographer: true,
})

const allAvailableLanguages = availableLanguages;
const githubRepos = ref<GitRepos[]>([])

const repo = ref<GitRepos>({ name: '', description: '', html_url: '', distinctLanguages: [], default_branch: '' })
const queryNameProject = ref('')
const queryLanguage = ref('')
const featureQuery = ref('')
const featureList = ref<string[]>([])
const selectedLanguage = ref<string>()
const editMode = ref(false)


watch(() => repo.value, async (newValue) => {
  if (newValue.name) {
    const values = await Promise.all([
      fetchWrapper.get(`github-api/repository-languages/${newValue.name}`, null, true),
      fetchWrapper.get(`github-api/repository-readme/${newValue.name}`, null, true),
    ]);
    repo.value.distinctLanguages = Object.keys(values[0]).map(lang => lang.toLowerCase());

    if (values[1]?.download_url) {
      repo.value.description = await fetch(values[1].download_url).then((response) => response.text());
    } else {
      repo.value.description = '';
      //   TODO: mettre un message d'erreur
    }
  }
})

watch(() => selectedLanguage.value, (newValue) => {
  if (newValue) {
    if (!repo.value.distinctLanguages?.includes(newValue.toLowerCase())) {
      repo.value.distinctLanguages?.push(newValue.toLowerCase())
    }
  }
  selectedLanguage.value = ''
  queryLanguage.value = ''
})

const filtredGithubRepos = computed(() => {
  if (queryNameProject.value === '') {
    return githubRepos.value
  }
  return githubRepos.value.filter((repo) => {
    return repo.name.toLowerCase().includes(queryNameProject.value.toLowerCase())
  })
})

const filtredLanguages = computed(() => {
  if (queryLanguage.value === '') {
    return allAvailableLanguages
  }
  return allAvailableLanguages.filter((lang) => {
    return lang.toLowerCase().includes(queryLanguage.value.toLowerCase())
  })
})

const addFeature = (): void => {
  if (featureQuery.value) {
    featureList.value?.push(featureQuery.value)
    featureQuery.value = ''
  }
}

// const imageFile = ref<File | null>(null)
//
// const onImageChange = async (event: Event): Promise<void> => {
//   const target = event.target as HTMLInputElement
//   const file = target.files ? target.files[0] : null
//
//   if (file && file.type.startsWith('image/')) {
//     imageFile.value = file
//     await uploadImage(file)
//   }
// }
//
// const uploadImage = async (file: File): Promise<void> => {
//   const formData = new FormData()
//   formData.append('image', file)
//
//   try {
//     const response = await fetchWrapper.post('boilerplate/banner', formData, true)
//     console.log('Upload successful:', response)
//   } catch (error) {
//     // TODO: faire mieux que ca
//     console.error('Error uploading image:', error)
//   }
// }

const onFormSubmit = async () => {
  if (authStore.user) {
    const newBoilerplate: CreateBoilerplate = {
      name: repo.value.name,
      githubName: repo.value.name,
      description: repo.value.description,
      gitUrl: repo.value.html_url,
      languages: repo.value.distinctLanguages,
      features: featureList.value,
      authorId: authStore.user.id as string,
      defaultBranch: repo.value.default_branch,
    }
    await boilerplateStore.newBoilerplate(newBoilerplate);
  }
}

onMounted(async () => {
  githubRepos.value = await fetchWrapper.get(
    'github-api/user-repositories',
    null,
    true,
  )
  featureList.value = []
})
</script>

<template>
  <div class="space-y-10 mx-20 divide-y divide-gray-900/10">
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div class="px-4 sm:px-0">
        <h3
          class="mt-10 text-pretty text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          Share your own boilerplate with the
          <span class="text-indigo-600">community</span>
        </h3>
        <p class="mt-6">
          Import your boilerplate from
          <span class="text-indigo-600">Github</span> in few minutes
        </p>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div class="px-4 py-6 sm:p-8">
          <Combobox class="col-span-full mb-3" as="div" v-model="repo" @update:modelValue="queryNameProject = repo.name">
            <ComboboxLabel class="block text-sm/6 font-medium text-gray-900">Select your github repository</ComboboxLabel>
            <div class="relative mt-2">
              <ComboboxInput
                class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                @change="queryNameProject = $event.target.value"
                :display-value="item => (item as GitRepos).name"
              />
              <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>

<!--              FIXME: ishover does not working-->
              <ComboboxOptions v-if="filtredGithubRepos.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="repo in filtredGithubRepos" :key="repo.id" :value="repo" as="template" v-slot="{ active, selected }">
                  <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white outline-none' : 'text-gray-900']">
                    <span :class="['block truncate', selected && 'font-semibold']">
                      {{ repo.name }}
                    </span>
                    <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </div>
          </Combobox>

          <Combobox class="col-span-full mb-3"  as="div" v-model="selectedLanguage" @update:modelValue="queryLanguage = ''">
            <ComboboxLabel class="block text-sm/6 font-medium text-gray-900">Languages of the boilerplate</ComboboxLabel>
            <div class="relative mt-2 mb-1">
              <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @change="queryLanguage = $event.target.value" @blur="queryLanguage = ''"/>
              <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>

              <ComboboxOptions v-if="filtredLanguages.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="(language, index) in filtredLanguages" :key="index" :value="language" as="template" v-slot="{ active, selected }">
                  <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white outline-none' : 'text-gray-900']">
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
              <li v-for="lang in repo.distinctLanguages" :key="lang" class="text-sm/6 text-gray-600 cursor-pointer">
                <span @click="repo.distinctLanguages = repo.distinctLanguages.filter(l => l !== lang)" class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">{{ lang }}</span>
              </li>
            </ul>
          </Combobox>

          <div class="mb-5">
            <label for="features" class="block text-sm/6 font-medium text-gray-900">Features that describe your project</label>
            <div class="mt-2 mb-1">
              <input
                v-model="featureQuery"
                type="text"
                name="features"
                id="features"
                class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                placeholder="Type and press Enter"
                @keyup.enter="addFeature()"
              />
            </div>
            <ul class="flex gap-1">
              <li v-for="feat in featureList" :key="feat" class="text-sm/6 text-gray-600 cursor-pointer">
                <span @click="featureList = featureList.filter(l => l !== feat)" class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">{{ feat }}</span>
              </li>
            </ul>
          </div>

          <div class="col-span-full mb-4 w-full">
            <div class="flex justify-between items-center">
              <div>
                <label for="about" class="block text-sm/6 font-medium text-gray-900">README.md</label>
                <p class="mt-1 text-sm/6 text-gray-600">Complete the readme of your project</p>
              </div>
              <div class="flex justify-end mt-4">
                <button
                  type="button"
                  @click="editMode = !editMode"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <PencilSquareIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Edit
                </button>
              </div>
            </div>
            <div class="mt-2 px-6 py-6 min-h-[200px] max-h-[600px] overflow-y-auto block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
              <article
                v-if="!editMode"
                class="markdown"
                v-html="md.render(repo?.description || '')"
              ></article>
              <!-- display input area to edit the repo.description -->
              <textarea
                v-else
                v-model="repo.description"
                class="w-full h-96 resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              ></textarea>
            </div>
          </div>

<!--          <div class="col-span-full">-->
<!--            <label-->
<!--              for="cover-photo"-->
<!--              class="block text-sm/6 font-medium text-gray-900"-->
<!--              >Banner</label-->
<!--            >-->
<!--            <div-->
<!--              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"-->
<!--            >-->
<!--              <div class="text-center">-->
<!--                <PhotoIcon-->
<!--                  class="mx-auto h-12 w-12 text-gray-300"-->
<!--                  aria-hidden="true"-->
<!--                />-->
<!--                <div class="mt-4 flex text-sm/6 text-gray-600">-->
<!--                  <label-->
<!--                    for="file-upload"-->
<!--                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"-->
<!--                  >-->
<!--                    <span>Upload a file</span>-->
<!--                    <input-->
<!--                      id="file-upload"-->
<!--                      name="file-upload"-->
<!--                      type="file"-->
<!--                      class="sr-only"-->
<!--                      @change="onImageChange"-->
<!--                      accept="image/*"-->
<!--                    />-->
<!--                  </label>-->
<!--                  <p class="pl-1">or drag and drop</p>-->
<!--                </div>-->
<!--                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div
          class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
        >
          <button
            @click="router.push('/')"
            type="button"
            class="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            @click="onFormSubmit()"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
