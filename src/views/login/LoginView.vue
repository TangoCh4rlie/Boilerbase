<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

const WEB_URL = import.meta.env.VITE_URL
const GITHUB_OAUTH_CLIENT_ID = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID

const authStore = useAuthStore()
if (authStore.user) {
  router.push('/profile')
}

async function login() {
  const clientId = GITHUB_OAUTH_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    WEB_URL + 'github/callback',
  )
  const scope = 'public_profile'
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
}
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-10 w-auto rounded"
        src="https://avatars.githubusercontent.com/u/50408224?v=4"
        alt="Logo"
      />
      <h2
        class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 pt-6 p-10 shadow sm:rounded-lg sm:px-12 dark:bg-slate-900 dark:border dark:border-gray-500">
        <div>
          <div class="gap-4">
            <h4 class="mb-5 text-center text-sm/6 text-gray-500 dark:text-gray-300">
              Sign in with
              <span class="text-indigo-600">GitHub</span>
            </h4>
            <button
              @click="login()"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:bg-slate-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg
                class="h-5 w-5 fill-[#24292F] dark:fill-gray-100"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm/6 font-semibold">GitHub</span>
            </button>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Start a 14 day free trial</a
        >
      </p>
    </div>
  </div>
</template>
