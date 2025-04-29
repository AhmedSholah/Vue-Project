import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import authService from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('authStore', () => {
    const token = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const login = async (credentials) => {
        loading.value = true
        error.value = null
        try {
            const res = await authService.login(credentials)
            console.log(res.data)
            token.value = res.data.data.token

            localStorage.setItem('token', token.value)
            // router.push('/')
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const register = async (payload) => {
        loading.value = true
        error.value = null
        try {
            const res = await authService.register(payload)
            token.value = res.data.data.token
            localStorage.setItem('token', token.value)
            // router.push('/')
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        token.value = null
        localStorage.removeItem('token')
        // router.push('/login')
    }

    const loginWithGoogle = () => {
        authService.loginWithGoogle()
    }

    return {
        token,
        loading,
        error,
        login,
        register,
        logout,
        loginWithGoogle,
    }
})
