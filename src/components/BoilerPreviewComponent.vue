<script setup lang="ts">
import router from '@/router'
import type { Boilerplate } from '@/models/boilerplate.model'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { ArrowTrendingUpIcon as ArrowSolid } from '@heroicons/vue/24/solid'
import LikeComponent from '@/components/ui/LikeComponent.vue'

defineProps<{
  boilerplate: Boilerplate
}>()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const boilerplateStore = useBoilerplateStore()
const { topBoilerplates } = storeToRefs(boilerplateStore)

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
  <div
    class="flex flex-col justify-center-center gap-y-4 border-b border-gray-900/5 bg-gray-50 p-6 cursor-pointer"
    @click="router.push(`/boilerplate/${boilerplate.name}`)"
  >
    <img
      :src="boilerplate.logo"
      :alt="boilerplate.name"
      class="h-52 w-full flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
    />
    <div class="text-xl font-medium leading-6 text-gray-900">
      <p>{{ boilerplate.name }}</p>
    </div>
    <div class="flex gap-1.5">
      <img
        v-for="(language, index) in boilerplate.languages"
        width="30"
        height="30"
        :key="index"
        :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language}/${language}-original.svg`"
        :alt="`${language} logo`"
      />
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
          <LikeComponent :boilerplate="boilerplate" />
        </div>
        <div class="text-gray-700 flex items-center gap-1">
          <p>{{ boilerplate.usesCounter }}</p>
          <ArrowSolid class="h-4 w-4" aria-hidden="true" />
        </div>
      </dd>
    </div>
  </dl>
</template>

<style scoped></style>
