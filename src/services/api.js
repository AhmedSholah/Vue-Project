import axios from 'axios'
import router from '@/router'
const api = axios.create({
    baseURL: 'https://vue-dashboard-backend.vercel.app/api',
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error)

        const status = error.response?.status

        if (status === 401) {
            router.push('/signin')
        } else if (status >= 500 || !status) {
            router.push('/error')
        }

        return Promise.reject(error)
    },
)

export default api
