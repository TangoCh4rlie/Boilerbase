<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

const { user } = useAuthStore()

const navigation = [
  { name: 'Boilerplates', href: '/boilerplates' },
]

const mobileMenuOpen = ref(false)

</script>

<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5 flex gap-3.5">
          <img
            class="h-10 rounded w-auto"
            src="https://avatars.githubusercontent.com/u/50408224?v=4"
            alt="Logo"
          />
          <h1 class="text-balance text-4xl font-semibold tracking-tight text-gray-900">Boilerbase</h1>
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <div class="relative mt-2 flex items-center">
<!--          <div v-if="router.currentRoute.value.path !== '/search'">-->
<!--            <input-->
<!--              @keyup.enter="router.push('/search')"-->
<!--              ref="searchInput"-->
<!--              type="text"-->
<!--              name="search"-->
<!--              id="search"-->
<!--              placeholder="Search..."-->
<!--              class="block w-full rounded-md border-0 py-1.5 pl-2 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow sm:text-sm sm:leading-6"-->
<!--            />-->
<!--            <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">-->
<!--              <kbd-->
<!--                class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"-->
<!--                >⌘K</kbd-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
      <div class="flex flex-1 items-center justify-end gap-x-6">
        <button
          v-if="router.currentRoute.value.path !== '/new'"
          type="button"
          @click="router.push('/new')"
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Publish
        </button>
        <span
          v-if="user !== null"
          class="relative inline-block"
          @click="router.push('/profile')"
        >
          <img
            class="h-12 w-12 rounded-full"
            :src="user.avatar"
            :alt="`${user.username} avatar`"
          />
          <!--          Pour voir un petit badge pour les notif par exemple-->
          <!--          <span-->
          <!--            class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white"-->
          <!--          />-->
        </span>
        <a
          v-else
          href="/login"
          class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >Log in</a
        >
      </div>
<!--      <div class="flex lg:hidden">-->
<!--        <button-->
<!--          type="button"-->
<!--          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"-->
<!--          @click="mobileMenuOpen = true"-->
<!--        >-->
<!--          <span class="sr-only">Open main menu</span>-->
<!--          <Bars3Icon class="h-6 w-6" aria-hidden="true" />-->
<!--        </button>-->
<!--      </div>-->
    </nav>
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center gap-x-6">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <a
            href="#"
            class="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Sign up</a
          >
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</a
              >
            </div>
            <div class="py-6">
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Log in</a
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
