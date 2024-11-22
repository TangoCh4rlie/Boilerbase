<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string
}>();

const emit = defineEmits(['update:modelValue']);

const description = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    }
    return ''
  },
  html: true,
  linkify: true,
  typographer: true,
})

const editMode = ref(false)
</script>

<template>
  <div class="col-span-full mb-4 w-full">
    <div class="flex justify-between items-center">
      <div>
        <label for="about" class="block text-sm/6 font-medium text-gray-900">README.md</label>
        <p class="mt-1 text-sm/6 text-gray-600">Complete the readme of your project</p>
      </div>
      <div class="flex justify-end mt-4">
        <button
          type="button"
          @click="editMode = !editMode"
          class="inline-flex items-center rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PencilSquareIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Edit
        </button>
      </div>
    </div>
    <div class="mt-2 px-6 py-6 min-h-[200px] max-h-[600px] overflow-y-auto block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
      <article
        v-if="!editMode"
        class="markdown"
        v-html="md.render(description || '')"
      ></article>
      <!-- display input area to edit the repo.description -->
      <textarea
        v-else
        v-model="description"
        class="w-full h-96 resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>

</style>
