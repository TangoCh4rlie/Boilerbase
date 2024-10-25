import { defineStore } from 'pinia'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'
import { useAlertStore } from '@/stores/alert.store'
import type { User } from '@/models/user.model'
import router from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    jwtToken: localStorage.getItem('jwtToken') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    returnUrl: null as string | null,
  }),
  actions: {
    async login(code: string) {
      try {
        const { accessToken, user } = await fetchWrapper.get(
          'http://localhost:3001/auth/github/callback?code=' + code,
          null,
        )

        this.user = user
        this.jwtToken = accessToken

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('jwtToken', JSON.stringify(accessToken))

        window.location.href = this.returnUrl || '/'
        //TODO: comprendre pourquoi ça ne marche pas

        // router.push(this.returnUrl || '/')
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error as string)
      }
    },
    async delete() {
      if (!this.user) return
      await fetchWrapper.delete(
        import.meta.env.API_URL + 'user/' + this.user.id,
        null,
      )
      this.logout()
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/')
    },
  },
})
