<script setup lang="ts">
const testimonials = [
  {
    body: 'Now I don\'t have to spend days configuring my project, so I can concentrate on the essentials.',
    author: {
      name: 'Astrid',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'I can quickly find the project template I need among all the boilerplates thanks to the search bar and its filters.',
    author: {
      name: 'Corentin',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'Templates designed by the community allow me to launch my projects by applying good code practices.',
    author: {
      name: 'Aimé',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

</script>

<template>
  <div class="bg-transparent pt-24 sm:pt-32 mb-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="font-semibold text-xl text-indigo-600">Testimonials</h2>
        <p class="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">They have rethought the way to start their projects</p>
      </div>
      <div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
        <div class="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
          <div v-for="testimonial in testimonials" :key="testimonial.author.name" class="pt-8 sm:inline-block sm:w-full sm:px-4">
            <figure class="rounded-2xl bg-gray-50 p-8 text-sm/6 border dark:border-slate-500 dark:bg-slate-900">
              <blockquote class="text-gray-900 dark:text-gray-200">
                <p>{{ `“${testimonial.body}”` }}</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <img class="size-10 rounded-full bg-gray-50" :src="testimonial.author.imageUrl" alt="" />
                <div>
                  <div class="font-semibold text-gray-900 dark:text-gray-200">{{ testimonial.author.name }}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
