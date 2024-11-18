<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import type { Boilerplate } from '@/models/boilerplate.model'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import SummayComponent from '@/components/boilerplate/SummayComponent.vue'

const route = useRoute()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // use external default escaping
  },
  html: true,
  linkify: true,
  typographer: true,
})

const boilerplate = ref<Boilerplate | null>(null as Boilerplate | null)

onMounted(async () => {
  boilerplate.value = await fetchWrapper.get(
    `boilerplate/${route.params.name}`,
    null,
    false,
  )
})

// download a zip folder
// :href="`${boilerplate?.gitUrl}/archive/refs/heads/${boilerplate?.defaultBranch}.zip`"
// @click.prevent="downloadItem(`${boilerplate?.gitUrl}/archive/refs/heads/${boilerplate?.defaultBranch}.zip`)"
// const downloadItem = (url: string) => {
//   console.log("test")
//   fetch("https://cors-anywhere.herokuapp.com/" + url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = `${boilerplate.value?.name}.zip`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//     })
// }
</script>

<template>
  <main>
    <div
      v-if="boilerplate"
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-gray-900/5"
    >
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div
          class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none"
        >
          <div class="flex items-center gap-x-6">
            <h3 class="my-6 text-4xl font-bold leading-6 text-gray-900">
              {{ boilerplate?.name }}
            </h3>
          </div>
          <div class="flex items-center gap-x-4 sm:gap-x-6">
            <a
              v-if="boilerplate?.authorId === user?.id"
              href="#"
              class="hidden text-sm font-semibold leading-6 text-gray-900 sm:block"
              >Edit</a
            >
            <a
              href="#"
              class="flex gap-1.5 items-center-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <p>Share</p>
              <ArrowUpOnSquareIcon class="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <SummayComponent :boilerplate="boilerplate" />
        <div
          class="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16"
        >
          <!--          <img-->
          <!--            :src="boilerplate?.logo"-->
          <!--            alt=""-->
          <!--            class="w-full h-52 mb-8 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"-->
          <!--          />-->
          <div>
            <article
              v-html="md.render(boilerplate?.description || '')"
              class="markdown"
            ></article>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      loading
    </div>
  </main>
</template>
