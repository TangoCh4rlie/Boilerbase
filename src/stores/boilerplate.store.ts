import { defineStore } from 'pinia'
import type { Boilerplate } from '@/models/boilerplate.model'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'

export const useBoilerplateStore = defineStore({
  id: 'boilerplateStore',
  state: () => ({
    topBoilerplates: null as Boilerplate[] | null,
    searchedBoilerplates: null as Boilerplate[] | null,
  }),
  actions: {
    async getTopBoilerplate() {
      this.topBoilerplates = await fetchWrapper.get('boilerplate/top?number=3', null, true);
    },
    likeBoilerplate(id: number) {
      fetchWrapper.put(`like/${id}`, null, true);
    },
    async searchBoilerplates(name: string) {
      this.searchedBoilerplates = null;
      this.searchedBoilerplates = await fetchWrapper.get(`boilerplate/search?name=${name}`, null, false);
    }
  }
})
