import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    name: '' as string,
    languages: [] as string[],
    features: [] as string[],
  })
})
