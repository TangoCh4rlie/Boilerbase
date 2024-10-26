<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
console.log(user.value)
</script>

<template>
  <div class="bg-white">
    <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Welcome to <span class="text-indigo-600">Boilerbase</span>.<br>Start using boilerplates today.</h2>
      <p class="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">Discover, share and use the best boilerplates for your projects. Save time and start <span class="text-indigo-600">coding faster!</span></p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="/search" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Explore</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">View vtrending <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
  <div>
    <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      <li v-for="boilerplate in topBoilerplates" :key="boilerplate.id" class="overflow-hidden rounded-xl border border-gray-200">
        <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <img :src="boilerplate.logo" :alt="boilerplate.name" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
          <div class="text-sm font-medium leading-6 text-gray-900">{{ boilerplate.name }}</div>
          <Menu as="div" class="relative ml-auto">
            <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open options</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                  >View<span class="sr-only">, {{ boilerplate.name }}</span></a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                  >Edit<span class="sr-only">, {{ boilerplate.name }}</span></a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">Last invoice</dt>
            <dd class="text-gray-700">
              <time :datetime="boilerplate.lastInvoice.dateTime">{{ boilerplate.lastInvoice.date }}</time>
            </dd>
          </div>
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">Amount</dt>
            <dd class="flex items-start gap-x-2">
              <div class="font-medium text-gray-900">{{ boilerplate.lastInvoice.amount }}</div>
              <div :class="[statuses[boilerplate.lastInvoice.status], 'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset']">{{ boilerplate.lastInvoice.status }}</div>
            </dd>
          </div>
        </dl>
      </li>
    </ul>
  </div>
</template>
