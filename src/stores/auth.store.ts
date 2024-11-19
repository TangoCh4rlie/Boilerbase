import { defineStore } from 'pinia'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'
import { useAlertStore } from '@/stores/alert.store'
import type { User } from '@/models/user.model'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    jwtToken: JSON.parse(localStorage.getItem('jwtToken')|| 'null') as string || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    returnUrl: null as string | null,
  }),
  actions: {
    async login(code: string) {
      try {
        const { accessToken, user } = await fetchWrapper.get(
          'auth/github/callback?code=' + code,
          null,
          false
        )

        this.user = user
        this.jwtToken = accessToken

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('jwtToken', JSON.stringify(accessToken))

        const toReturnUrl = this.returnUrl
        this.returnUrl = null

        window.location.href = toReturnUrl || '/'
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error as string)
      }
    },
    async delete() {
      if (!this.user) return
      await fetchWrapper.delete(
        'user/' + this.user.id,
        null,
        false
      )
      this.logout()
    },
    logout() {
      this.user = null
      this.jwtToken = null
      this.returnUrl = null
      localStorage.removeItem('user')
      localStorage.removeItem('jwtToken')
      window.location.href = '/'
    },
    setReturnUrl(url: string) {
      this.returnUrl = url
    },
    viewBoilerplate(id: number) {
      fetchWrapper.put(`user/view/${id}`, null, true)
    },
  },
})
