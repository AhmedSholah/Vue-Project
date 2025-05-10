import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import userService from '@/services/userService'

export const useUserStore = defineStore('userStore', () => {
    const state = reactive({
        users: [],
        currentUser: null,
        selectedUser: {},
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
            // state.selectedUser = res.data.data.user
            Object.assign(state.selectedUser, res.data.data.user)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const createUser = async (newUser) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.createUser(newUser)
            await fetchUsers()
            return res.data
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

    const updateUser = async (userId, data) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.updateUser(userId, data)
            await fetchUser(userId)
            // Object.assign(state.selectedUser, res.data.data)
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

    const updateCurrentUserAvatar = async (file) => {
        loading.value = true
        error.value = null
        try {
            await userService.updateCurrentUserAvatar(file)
            // await fetchCurrentUser()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const updateUserAvatar = async (userId, file) => {
        loading.value = true
        error.value = null
        try {
            await userService.updateUserAvatar(userId, file)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const deleteUserAvatar = async (userId) => {
        loading.value = true
        error.value = null
        try {
            await userService.deleteUserAvatar(userId)
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
        updateCurrentUserAvatar,
        updateUserAvatar,
        deleteUserAvatar,
        createUser,
    }
})
