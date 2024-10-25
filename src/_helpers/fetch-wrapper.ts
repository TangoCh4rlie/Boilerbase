import { useAuthStore } from '@/stores/auth.store'

const request = (method: string) => {
    return (url: string, body: any) => {
        const requestOptions: RequestInit = {
            method,
            headers: {
                ...authHeader(url),
                ...(body && { 'Content-Type': 'application/json' })
            },
            ...(body && { body: JSON.stringify(body) })
        }
        return fetch(url, requestOptions).then(handleResponse)
    }
}

const authHeader = (url: string) => {
    const { jwtToken } = useAuthStore()
    const isLoggedIn = jwtToken !== null
    const isApiUrl = url.startsWith(import.meta.env.API_URL)
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${jwtToken}` };
    } else {
        return {};
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

    return data;
}

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}
