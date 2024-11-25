<script setup lang="ts">
import { BoltIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/vue/24/outline'

const primaryFeatures = [
  {
    name: 'Server monitoring',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
    href: '#',
    icon: BoltIcon,
  },
  {
    name: 'Collaborate',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Task scheduling',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
    href: '#',
    icon: CalendarDaysIcon,
  },
]
</script>

<template>
  <div class="mx-auto bg-transparent max-w-7xl px-6 mt-20 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
      <p class="mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl lg:text-balance">Everything you need to deploy your app</p>
      <p class="mt-8 text-lg/8 text-gray-600 dark:text-gray-400">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
    </div>
    <div class="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <div v-for="feature in primaryFeatures" :key="feature.name" class="flex flex-col">
          <dt class="text-base/7 font-semibold text-gray-600 dark:text-gray-400">
            <div class="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
              <component :is="feature.icon" class="size-6 text-white" aria-hidden="true" />
            </div>
            {{ feature.name }}
          </dt>
          <dd class="mt-1 flex flex-auto flex-col text-base/7 text-gray-500 dark:text-gray-500">
            <p class="flex-auto">{{ feature.description }}</p>
            <p class="mt-6">
              <a :href="feature.href" class="text-sm/6 font-semibold text-indigo-500">Learn more <span aria-hidden="true">→</span></a>
            </p>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>

</style>
