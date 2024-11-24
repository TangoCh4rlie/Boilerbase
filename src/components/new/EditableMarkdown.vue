<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import { computed, ref, watch } from 'vue'
import { useDark } from '@vueuse/core'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  modelValue: string
}>();

const emit = defineEmits(['update:modelValue']);

const description = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

// FIXME
const isDark = useDark() // Je suppose que vous utilisez VueUse

// Fonction pour charger le style highlight.js
const loadHighlightStyle = (isDark: boolean) => {
  const styleId = 'hljs-theme'
  let styleLink = document.getElementById(styleId) as HTMLLinkElement

  if (!styleLink) {
    styleLink = document.createElement('link')
    styleLink.id = styleId
    styleLink.rel = 'stylesheet'
    document.head.appendChild(styleLink)
  }

  // Choisissez les thèmes que vous préférez parmi ceux disponibles
  styleLink.href = isDark
    ? '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css'
    // Autres options pour le thème sombre :
    // - 'dracula.min.css'
    // - 'nord.min.css'
    // - 'monokai.min.css'
    : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css'
  // Autres options pour le thème clair :
  // - 'github.min.css'
  // - 'androidstudio.min.css'
  // - 'atom-one-light.min.css'
}

// Observer les changements de thème
watch(
  () => isDark.value,
  (newValue) => {
    loadHighlightStyle(newValue)
  },
  { immediate: true } // Charger le style initial
)

// Configuration de markdown-it
const md: MarkdownIt = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${
          hljs.highlight(str, { language: lang }).value
        }</code></pre>`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
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
        <label for="about" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">README.md</label>
        <p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-300">Complete the readme of your project</p>
      </div>
      <div class="flex justify-end mt-4">
        <button
          type="button"
          @click="editMode = !editMode"
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PencilSquareIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Edit
        </button>
      </div>
    </div>
    <div class="mt-2 px-6 py-6 min-h-[200px] max-h-[600px] overflow-y-auto block w-full rounded-md border-0 text-gray-900 dark:bg-gray-800 dark:ring-gray-500 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
      <article
        v-if="!editMode"
        class="markdown"
        v-html="md.render(description || '')"
      ></article>
      <textarea
        v-else
        v-model="description"
        class="w-full h-96 resize-none border-0 bg-transparent text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>

</style>
