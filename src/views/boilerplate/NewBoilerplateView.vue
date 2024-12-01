<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'
import type { GitRepos } from '@/models/gitRepos.model'
import type { CreateBoilerplate } from '@/models/boilerplate.model'
import { useAuthStore } from '@/stores/auth.store'
import { useBoilerplateStore } from '@/stores/boilerplate.store'
import EditableMarkdown from '@/components/new/EditableMarkdown.vue'
import FeatureQueryComponent from '@/components/new/FeatureQueryComponent.vue'
import ComboBoxLanguages from '@/components/new/ComboBoxLanguages.vue'
import ComboBoxGithubRepoComponent from '@/components/new/ComboBoxGithubRepoComponent.vue'
import HeaderNewComponent from '@/components/new/HeaderNewComponent.vue'

const authStore = useAuthStore()
const boilerplateStore = useBoilerplateStore()

const repo = ref<GitRepos>({ name: '', description: '', html_url: '', distinctLanguages: [], default_branch: '', featureList: [] })

watch(() => repo.value, async (newValue) => {
  if (newValue.name) {
    const values = await Promise.all([
      fetchWrapper.get(`github-api/repository-languages/${newValue.name}`, null, true),
      fetchWrapper.get(`github-api/repository-readme/${newValue.name}`, null, true),
    ]);
    repo.value.distinctLanguages = Object.keys(values[0]).map(lang => lang.toLowerCase());

    if (values[1]?.download_url) {
      repo.value.description = await fetch(values[1].download_url).then((response) => response.text());
    } else {
      repo.value.description = '';
      //   TODO: mettre un message d'erreur
    }
  }
})

const onFormSubmit = async () => {
  if (authStore.user) {
    const newBoilerplate: CreateBoilerplate = {
      name: repo.value.name,
      githubName: repo.value.name,
      description: repo.value.description,
      gitUrl: repo.value.html_url,
      languages: repo.value.distinctLanguages,
      features: repo.value.featureList,
      authorId: authStore.user.id as string,
      defaultBranch: repo.value.default_branch,
    }
    await boilerplateStore.newBoilerplate(newBoilerplate);
  }
}
</script>

<template>
  <div class="space-y-10 mx-20 divide-y divide-gray-900/10 dark:divide-slate-500">
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <HeaderNewComponent />
      <div
        class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 dark:border dark:border-slate-500 dark:bg-slate-900"
      >
        <div class="px-4 py-6 sm:p-8">
          <ComboBoxGithubRepoComponent v-model="repo" />
          <ComboBoxLanguages v-model="repo.distinctLanguages" />
          <FeatureQueryComponent v-model="repo.featureList" />
          <EditableMarkdown v-model="repo.description" />
        </div>
        <div
          class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-slate-500 px-4 py-4 sm:px-8"
        >
          <RouterLink to="/">
            <button
              type="button"
              class="text-sm/6 font-semibold text-gray-900 dark:text-gray-200"
            >
              Cancel
            </button>
          </RouterLink>
          <button
            @click="onFormSubmit()"
            class="rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
