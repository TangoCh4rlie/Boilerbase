<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useBoilerplateStore } from '@/stores/boilerplate.store'
import { onMounted } from 'vue'
import BoilerPreviewComponent from '@/components/BoilerPreviewComponent.vue'
import { useAuthStore } from '@/stores/auth.store'

const boilerplateStore = useBoilerplateStore()
const { topBoilerplates } = storeToRefs(boilerplateStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

onMounted(async () => {
  await boilerplateStore.getTopBoilerplate()
  if (user.value !== null) {
    boilerplateStore.getBoilerplateHistory()
  }
})
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
        <BoilerPreviewComponent :boilerplate="boilerplate" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
