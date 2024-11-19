import { useAuthStore } from '@/stores/auth.store'

const API_URL = import.meta.env.VITE_NEST_API_URL || "https://api.super-sympa.fr/"

const request = (method: string) => {
  return async (url: string, body: FormData | string | null, auth: boolean) => {
    const { jwtToken } = useAuthStore()
    const requestOptions: RequestInit = {
      method,
      headers: {
        Accept: 'application/json',
        ...((auth && jwtToken !== null) && { Authorization: `Bearer ${jwtToken}` }),
        ...(!(body instanceof FormData) && { 'Content-Type': 'application/json' }),
      },
      ...(body && { body: body }),
    }
    return fetch(API_URL + url, requestOptions).then(
      handleResponse,
    )
  }
}
const handleResponse = async (response: Response) => {
  const isJson = response.headers?.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : null

  if (!response.ok) {
      const { user, logout } = useAuthStore()
      if ([401, 403].includes(response.status) && user) {
          logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
  }

  return data
}

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}
