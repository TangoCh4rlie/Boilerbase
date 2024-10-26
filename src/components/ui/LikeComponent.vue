<script setup lang="ts">
import { HeartIcon as HeartSolid } from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutilne } from '@heroicons/vue/24/outline'
import router from '@/router'
import type { Boilerplate } from '@/models/boilerplate.model'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'

defineProps<{
  boilerplate: Boilerplate
}>()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const boilerplateStore = useBoilerplateStore()

const likeBoilerplate = (boilerplate: Boilerplate) => {
  if (user.value !== null) {
    if (boilerplate) {
      if (boilerplate.liked) {
        boilerplate.liked = false
        boilerplate.likesCounter--
      } else {
        boilerplate.liked = true
        boilerplate.likesCounter++
      }
      boilerplateStore.likeBoilerplate(boilerplate.id)
    }
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div
    @click="likeBoilerplate(boilerplate)"
    class="flex items-center gap-1 cursor-pointer"
  >
    <HeartSolid
      v-if="boilerplate.liked"
      class="h-4 w-4 text-indigo-600"
      aria-hidden="true"
    />
    <HeartOutilne v-else class="h-4 w-4" aria-hidden="true" />
  </div>
</template>

<style scoped></style>
