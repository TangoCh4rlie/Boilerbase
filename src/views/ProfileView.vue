<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { ArrowTrendingUpIcon as ArrowSolid } from '@heroicons/vue/24/solid'
import LikeComponent from '@/components/ui/LikeComponent.vue'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.me()
})
</script>

<template>
  <div v-if="authStore.user" class="sm:px-60">
    <div class="px-4 flex gap-8">
      <img
        class="h-14 rounded-full w-auto"
        :src="authStore.user?.avatar"
        alt="Avatar"
      />
      <div>
        <h3 class="text-base/7 font-semibold text-gray-900 dark:text-gray-200">Your Profile</h3>
        <p class="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
          Personal details and boilerplates.
        </p>
      </div>
    </div>
    <div class="mt-6 border-t border-gray-100 dark:border-gray-500">
      <dl class="divide-y divide-gray-100 dark:divide-slate-500">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900 dark:text-gray-200">Username</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-300">
            {{ authStore.user?.username }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900 dark:text-gray-200">Boilerplates</dt>
          <dd class="mt-2 text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">
            <ul
              v-if="authStore.user.boilerplates && authStore.user.boilerplates?.length > 0"
              role="list"
              class="divide-y divide-gray-100 dark:divide-slate-500 rounded-md border border-gray-200 dark:border-gray-500"
            >
              <li
                v-for="boilerplate in authStore.user.boilerplates"
                :key="boilerplate.id"
                class="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6"
              >
                <div class="flex w-0 flex-1 items-center">
                  <img
                    class="h-6 rounded-full w-6"
                    :src="boilerplate.logo"
                    alt="Logo"
                  />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-medium">
                      {{ boilerplate.name }}
                    </span>
                    <div class="text-gray-700 dark:text-gray-400 flex items-center gap-1">
                      <p>{{ boilerplate.likesCounter }}</p>
                      <LikeComponent :boilerplate="boilerplate" />
                    </div>
                    <div class="text-gray-700 dark:text-gray-400 flex items-center gap-1">
                      <p>{{ boilerplate.usesCounter }}</p>
                      <ArrowSolid class="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div class="ml-4 shrink-0">
                  <a
                    :href="`/boilerplate/${boilerplate.name}`"
                    class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500"
                    >View or Modify</a
                  >
                </div>
              </li>
            </ul>
            <p v-else>
              No boilerplates yet. Crate your first
              <router-link to="/new"
                ><span class="text-indigo-600">here</span></router-link
              >
            </p>
          </dd>
        </div>
      </dl>
    </div>
    <div
      class="mt-6 border-t border-gray-100 dark:border-gray-500"
    >
      <button
        type="button"
        @click="authStore.logout"
        class="mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div>
  </div>
  <div v-else>
    loading
  </div>
</template>

<style scoped></style>
