import { defineStore } from 'pinia'
import type { Boilerplate } from '@/models/boilerplate.model'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'

export const useBoilerplateStore = defineStore({
  id: 'boilerplateStore',
  state: () => ({
    topBoilerplates: null as Boilerplate[] | null,
    searchedBoilerplates: null as Boilerplate[] | null,
    boilerplateHistory: null as Boilerplate[] | null,
  }),
  actions: {
    async getTopBoilerplate() {
      this.topBoilerplates = await fetchWrapper.get(
        'boilerplate/top?number=3',
        null,
        true,
      )
    },
    likeBoilerplate(id: number) {
      fetchWrapper.put(`like/${id}`, null, true)
    },
    async searchBoilerplates(
      names: string[],
      languages: string[],
      features: string[],
    ) {
      const languagesParams = new URLSearchParams()
      if (languages.length !== 0) {
        languages.forEach(language =>
          languagesParams.append('languages', language),
        )
      }

      const featuresParams = new URLSearchParams()
      if (features.length !== 0) {
        features.forEach(feature => featuresParams.append('features', feature))
      }

      const nameParams = new URLSearchParams()
      if (names.length !== 0) {
        names = names.filter(name => name !== '')
        names.forEach(name => {
          if (name !== '') {
            nameParams.append('names', name)
          }
        })
      }

      this.searchedBoilerplates = await fetchWrapper.get(
        `boilerplate/search?${nameParams}${languagesParams.toString() ? '&' + languagesParams : ''}${featuresParams.toString() ? '&' + featuresParams : ''}`,
        null,
        false,
      )
    },
    async getBoilerplateHistory() {
      this.boilerplateHistory = await fetchWrapper.get(
        'boilerplate/me/history',
        null,
        true,
      )
    },
  },
})
