<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import {
  ArrowTrendingUpIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/vue/20/solid'
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  BeakerIcon,
} from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import type { Boilerplate } from '@/models/boilerplate.model'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import LikeComponent from '@/components/ui/LikeComponent.vue'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'

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
  typographer: true
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

const activity = [
  {
    id: 1,
    type: 'created',
    person: { name: 'Chelsea Hagon' },
    date: '7d ago',
    dateTime: '2023-01-23T10:32',
  },
  {
    id: 2,
    type: 'edited',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:03',
  },
  {
    id: 3,
    type: 'sent',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:24',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 5,
    type: 'viewed',
    person: { name: 'Alex Curren' },
    date: '2d ago',
    dateTime: '2023-01-24T09:12',
  },
  {
    id: 6,
    type: 'paid',
    person: { name: 'Alex Curren' },
    date: '1d ago',
    dateTime: '2023-01-24T09:20',
  },
]
const mobileMenuOpen = ref(false)
</script>

<template>
  <main>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-gray-900/5">
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
        <!-- Invoice summary -->
        <div class="lg:col-start-3 lg:row-end-1">
          <h2 class="sr-only">Summary</h2>
          <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
            <dl class="flex flex-wrap">
              <div class="flex-auto pl-6 pt-6">
                <dt class="text-sm font-semibold leading-6 text-gray-900">
                  Uses
                </dt>
                <dd
                  class="flex items-center gap-1.5 mt-1 text-base font-semibold leading-6 text-gray-900"
                >
                  <p>{{ boilerplate?.usesCounter }}</p>
                  <ArrowTrendingUpIcon class="h-4 w-4" aria-hidden="true" />
                </dd>
              </div>
              <div class="flex-auto pl-6 pt-6">
                <dt class="text-sm font-semibold leading-6 text-gray-900">
                  Likes
                </dt>
                <dd
                  class="flex gap-1.5 items-center mt-1 text-base font-semibold leading-6 text-gray-900"
                >
                  <p>{{ boilerplate?.likesCounter }}</p>
                  <LikeComponent
                    v-if="boilerplate"
                    :boilerplate="boilerplate"
                  />
                </dd>
              </div>
              <div
                class="mt-6 items-center flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6"
              >
                <dt class="text-sm font-medium text-gray-900">
                  <a
                    :href="`${boilerplate?.gitUrl}/fork`"
                    class="flex gap-1.5 items-center-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Fork on GitHub
                    <BeakerIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
              </div>
              <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                <dt class="text-sm leading-6 text-gray-800">
                  <button
                    class="flex gap-1.5 items-center-center rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Download zip
                    <ArrowDownOnSquareIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </dt>
              </div>
            </dl>
            <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
              <a
                :href="boilerplate?.gitUrl"
                target="_blank"
                class="text-sm font-semibold leading-6 text-gray-900"
                >Go on GitHub page <span aria-hidden="true">&rarr;</span></a
              >
            </div>
          </div>
        </div>

        <!-- Invoice -->
        <div
          class="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16"
        >
          <img
            :src="boilerplate?.logo"
            alt=""
            class="w-full h-52 mb-8 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          <div>
            <article v-html="md.render(boilerplate?.description || '')" class="markdown"></article>
          </div>
        </div>

        <div class="lg:col-start-3">
          <!-- Activity feed -->
          <h2 class="text-sm font-semibold leading-6 text-gray-900">
            Activity
          </h2>
          <ul role="list" class="mt-6 space-y-6">
            <li
              v-for="(activityItem, activityItemIdx) in activity"
              :key="activityItem.id"
              class="relative flex gap-x-4"
            >
              <div
                :class="[
                  activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                  'absolute left-0 top-0 flex w-6 justify-center',
                ]"
              >
                <div class="w-px bg-gray-200" />
              </div>
              <template v-if="activityItem.type === 'commented'">
                <img
                  :src="activityItem.person.imageUrl"
                  alt=""
                  class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <div
                  class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200"
                >
                  <div class="flex justify-between gap-x-4">
                    <div class="py-0.5 text-xs leading-5 text-gray-500">
                      <span class="font-medium text-gray-900">{{
                        activityItem.person.name
                      }}</span>
                      commented
                    </div>
                    <time
                      :datetime="activityItem.dateTime"
                      class="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >{{ activityItem.date }}
                    </time>
                  </div>
                  <p class="text-sm leading-6 text-gray-500">
                    {{ activityItem.comment }}
                  </p>
                </div>
              </template>
              <template v-else>
                <div
                  class="relative flex h-6 w-6 flex-none items-center justify-center bg-white"
                >
                  <CheckCircleIcon
                    v-if="activityItem.type === 'paid'"
                    class="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <div
                    v-else
                    class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
                  />
                </div>
                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                  <span class="font-medium text-gray-900">{{
                    activityItem.person.name
                  }}</span>
                  {{ activityItem.type }} the invoice.
                </p>
                <time
                  :datetime="activityItem.dateTime"
                  class="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >{{ activityItem.date }}
                </time>
              </template>
            </li>
          </ul>

          <!-- New comment form -->
          <div class="mt-6 flex gap-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              class="h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <form action="#" class="relative flex-auto">
              <div
                class="overflow-hidden rounded-lg p-2 pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
              >
                <label for="comment" class="sr-only">Add your comment</label>
                <textarea
                  rows="2"
                  name="comment"
                  id="comment"
                  class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
                  placeholder="Add your comment..."
                />
              </div>

              <div
                class="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2"
              >
                <button
                  type="submit"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
