import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import userService from '@/services/userService'

export const useUserStore = defineStore('userStore', () => {
    const state = reactive({
        users: [],
        currentUser: null,
        selectedUser: null,
        totalUsers: null,
    })

    const loading = ref(false)
    const error = ref(null)

    const fetchUsers = async (query) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.getAllUsers(query)
            state.users.length = 0
            state.users.push(...res.data.data.users)
            state.totalUsers = res.data.totalUsers
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchUser = async (userId) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.getUser(userId)
            state.selectedUser = res.data.data.user
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchCurrentUser = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.getCurrentUser()
            state.currentUser = res.data.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const updateUser = async (data) => {
        loading.value = true
        error.value = null
        try {
            await userService.updateUser(data)
            await fetchCurrentUser()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const deleteUser = async (userId) => {
        loading.value = true
        error.value = null
        try {
            await userService.deleteUser(userId)
            await fetchUsers()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const updateAvatar = async (file) => {
        loading.value = true
        error.value = null
        try {
            await userService.updateAvatar(file)
            await fetchCurrentUser()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    return {
        ...toRefs(state),
        loading,
        error,
        fetchUsers,
        fetchUser,
        fetchCurrentUser,
        updateUser,
        deleteUser,
        updateAvatar,
    }
})
