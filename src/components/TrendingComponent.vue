<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'

import {
  ArrowTrendingUpIcon as ArrowSolid,
  HeartIcon as HeartSolid,
} from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutilne } from '@heroicons/vue/24/outline'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { onMounted } from 'vue'
import router from '@/router'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const boilerplateStore = useBoilerplateStore()
const { topBoilerplates } = storeToRefs(boilerplateStore)

onMounted(async () => {
  await boilerplateStore.getTopBoilerplate()
  console.log(topBoilerplates.value)
})

const likeBoilerplate = (boilerplateId: number) => {
  if (user.value !== null && topBoilerplates.value !== null) {
    const boilerplate = topBoilerplates.value.find(
      boilerplate => boilerplate.id === boilerplateId,
    )
    if (boilerplate) {
      if (boilerplate.liked) {
        boilerplate.liked = false
        boilerplate.likesCounter--
      } else {
        boilerplate.liked = true
        boilerplate.likesCounter++
      }
      boilerplateStore.likeBoilerplate(boilerplateId)
    }
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div id="trending" class="mx-5">
    <div class="mx-auto max-w-2xl lg:text-center mb-10">
      <h3 class="text-xl font-semibold leading-7 text-indigo-400">Explore</h3>
      <p class="text-pretty text-3xl font-semibold">
        Best Boilerplates of the month
      </p>
    </div>
    <ul
      role="list"
      class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      <li
        v-for="boilerplate in topBoilerplates"
        :key="boilerplate.id"
        class="overflow-hidden rounded-xl border border-gray-200"
      >
        <div
          class="flex flex-col justify-center-center gap-y-4 border-b border-gray-900/5 bg-gray-50 p-6 cursor-pointer"
          @click="router.push(`/boilerplates/${boilerplate.name}`)"
        >
          <img
            :src="boilerplate.logo"
            :alt="boilerplate.name"
            class="h-52 w-full flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          <div class="text-xl font-medium leading-6 text-gray-900">
            <p>{{ boilerplate.name }}</p>
          </div>
          <div class="flex gap-1">
            <img
              v-for="(language, index) in boilerplate.languages"
              width="30"
              height="30"
              :key="index"
              :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language}/${language}-original.svg`"
              :alt="`${language} logo`"/>
          </div>
        </div>
        <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">Posted</dt>
            <dd class="text-gray-700">
              <time :datetime="boilerplate.createdAt.toString()"
                >{{ new Date(boilerplate.createdAt).toLocaleDateString() }}
              </time>
            </dd>
          </div>
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">Stats</dt>
            <dd class="flex items-start gap-x-2">
              <div class="text-gray-700 flex items-center gap-1">
                <p>{{ boilerplate.likesCounter }}</p>
                <div
                  @click="likeBoilerplate(boilerplate.id)"
                  class="flex items-center gap-1 cursor-pointer"
                >
                  <HeartSolid
                    v-if="
                      boilerplate.liked
                    "
                    class="h-4 w-4 text-indigo-600"
                    aria-hidden="true"
                  />
                  <HeartOutilne v-else class="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div class="text-gray-700 flex items-center gap-1">
                <p>{{ boilerplate.usesCounter }}</p>
                <ArrowSolid class="h-4 w-4" aria-hidden="true" />
              </div>
            </dd>
          </div>
        </dl>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
